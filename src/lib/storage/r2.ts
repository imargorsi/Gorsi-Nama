import "server-only";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import {
  allowedImageMimeTypes,
  type UploadFolder,
} from "@/lib/storage/upload.schemas";

const IMAGE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
} as const satisfies Record<(typeof allowedImageMimeTypes)[number], string>;

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl: string;
};

function envValue(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

function r2PublicBaseUrl() {
  return envValue("R2_PUBLIC_BASE_URL", "NEXT_PUBLIC_R2_PUBLIC_URL")?.replace(
    /\/$/,
    ""
  );
}

function readR2Config(): R2Config | null {
  const accountId = envValue("R2_ACCOUNT_ID");
  const accessKeyId = envValue("R2_ACCESS_KEY_ID");
  const secretAccessKey = envValue("R2_SECRET_ACCESS_KEY");
  const bucket = envValue("R2_BUCKET_NAME");
  const publicUrl = r2PublicBaseUrl();

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    return null;
  }

  return { accountId, accessKeyId, secretAccessKey, bucket, publicUrl };
}

export function missingR2EnvKeys() {
  const keys = [
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_NAME",
    "R2_PUBLIC_BASE_URL",
  ] as const;
  return keys.filter((key) =>
    key === "R2_PUBLIC_BASE_URL" ? !r2PublicBaseUrl() : !envValue(key)
  );
}

export function isR2Configured() {
  return readR2Config() !== null;
}

function getR2Client(config: R2Config) {
  return new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
}

export function objectKeyForUpload({
  folder,
  userId,
  contentType,
}: {
  folder: UploadFolder;
  userId: string;
  contentType: (typeof allowedImageMimeTypes)[number];
}) {
  const extension = IMAGE_EXTENSIONS[contentType];
  const stamp = Date.now();
  const id = randomUUID().slice(0, 8);
  return `${folder}/${userId}/${stamp}-${id}.${extension}`;
}

function publicObjectUrl(publicOrigin: string, key: string) {
  return `${publicOrigin}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

/** Build a public URL from an object key using the current `R2_PUBLIC_BASE_URL`. */
export function objectPublicUrl(key: string) {
  const origin = r2PublicBaseUrl();
  if (!origin) return undefined;
  return publicObjectUrl(origin, key);
}

export async function createImageUploadUrl({
  key,
  contentType,
}: {
  key: string;
  contentType: (typeof allowedImageMimeTypes)[number];
}) {
  const config = readR2Config();
  if (!config) {
    throw new Error("Cloudflare R2 is not configured.");
  }

  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(getR2Client(config), command, {
    expiresIn: 60,
  });

  return {
    key,
    uploadUrl,
    publicUrl: publicObjectUrl(config.publicUrl, key),
  };
}
