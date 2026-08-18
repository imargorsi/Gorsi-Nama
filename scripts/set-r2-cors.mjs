import { config } from "dotenv";
import {
  GetBucketCorsCommand,
  PutBucketCorsCommand,
  S3Client,
} from "@aws-sdk/client-s3";

config({ path: ".env.local" });

const accountId = process.env.R2_ACCOUNT_ID?.trim();
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
const bucket = process.env.R2_BUCKET_NAME?.trim();

if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
  console.error("Missing R2 env vars in .env.local.");
  process.exit(1);
}

const corsRules = [
  {
    AllowedOrigins: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://community.argorsi.com",
    ],
    AllowedMethods: ["GET", "HEAD", "PUT"],
    AllowedHeaders: ["Content-Type"],
    ExposeHeaders: ["ETag"],
    MaxAgeSeconds: 3600,
  },
];

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

try {
  const current = await client
    .send(new GetBucketCorsCommand({ Bucket: bucket }))
    .catch((error) => {
      if (error?.name === "NoSuchCORSConfiguration") return { CORSRules: [] };
      throw error;
    });

  console.log("Current CORS rules:", current.CORSRules?.length ?? 0);

  await client.send(
    new PutBucketCorsCommand({
      Bucket: bucket,
      CORSConfiguration: { CORSRules: corsRules },
    })
  );

  const updated = await client.send(new GetBucketCorsCommand({ Bucket: bucket }));
  console.log(
    "Updated CORS origins:",
    updated.CORSRules?.[0]?.AllowedOrigins?.join(", ")
  );
  console.log("R2 CORS is set for local and production uploads.");
} catch (error) {
  const code =
    error && typeof error === "object" && "Code" in error
      ? String(error.Code)
      : "";
  if (code === "AccessDenied") {
    console.error(
      "This R2 token cannot change bucket CORS (Object Read & Write is not enough)."
    );
    console.error(
      "Paste the CORS JSON from doc/storage.md in Cloudflare: R2 → your bucket → Settings → CORS Policy."
    );
    process.exit(1);
  }
  throw error;
}
