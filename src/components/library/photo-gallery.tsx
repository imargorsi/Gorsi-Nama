import Image from "next/image";

const GALLERY_IMAGES = [
  "/images__gallery/1.jpg",
  "/images__gallery/2.jpg",
  "/images__gallery/3.jpg",
  "/images__gallery/4.jpg",
  "/images__gallery/5.webp",
  "/images__gallery/6.jpg",
  "/images__gallery/7.jpg",
  "/images__gallery/8.jpg",
  "/images__gallery/9.png",
];

export function PhotoGallery() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {GALLERY_IMAGES.map((src) => (
        <div
          key={src}
          className="relative aspect-square overflow-hidden rounded-xl"
        >
          <Image src={src} alt="" fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
