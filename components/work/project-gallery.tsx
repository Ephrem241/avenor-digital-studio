import Image from "next/image";
import { cn } from "@/lib/cn";
import { revealIndex } from "@/lib/motion";
import type { ProjectImage } from "@/lib/projects";

/**
 * Screenshots of the real project. Desktop captures sit two to a row from tablet up;
 * phone captures follow as a centred pair in 9:16 frames.
 */
export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const desktop = images.filter((image) => !image.mobile);
  const mobile = images.filter((image) => image.mobile);

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {desktop.length > 0 && (
        <ul className="grid gap-6 md:grid-cols-2">
          {desktop.map((image, index) => (
            <GalleryItem key={image.src.src} image={image} index={index} sizes="(min-width: 768px) 45vw, 100vw" />
          ))}
        </ul>
      )}
      {mobile.length > 0 && (
        <ul className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-4 md:gap-8">
          {mobile.map((image, index) => (
            <GalleryItem key={image.src.src} image={image} index={index} sizes="(min-width: 768px) 320px, 50vw" />
          ))}
        </ul>
      )}
    </div>
  );
}

function GalleryItem({ image, index, sizes }: { image: ProjectImage; index: number; sizes: string }) {
  return (
    <li>
      <figure className="flex flex-col gap-3">
        <div
          data-reveal="mask"
          style={revealIndex(index)}
          className={cn(
            "relative overflow-hidden border border-ivory-200 bg-charcoal-900",
            image.mobile ? "aspect-[9/16] rounded-media" : "aspect-[19/12] rounded-card",
          )}
        >
          <div data-reveal-media="" className="absolute inset-0">
            <div data-reveal-zoom="" className="absolute inset-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                placeholder="blur"
                sizes={sizes}
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
        {image.caption && <figcaption className="text-small text-stone-500">{image.caption}</figcaption>}
      </figure>
    </li>
  );
}
