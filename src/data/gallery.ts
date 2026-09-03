const modules = import.meta.glob("../assets/gallery/*/*.{jpg,jpeg,png,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const LOGO_SUFFIX = "-logo.";

const galleryImages: Record<string, string[]> = {};
const galleryLogos: Record<string, string> = {};

Object.keys(modules)
  .sort()
  .forEach((path) => {
    const segments = path.split("/");
    const id = segments[segments.length - 2];
    const filename = segments[segments.length - 1];

    if (filename.includes(LOGO_SUFFIX)) {
      galleryLogos[id] = modules[path];
      return;
    }

    if (!galleryImages[id]) galleryImages[id] = [];
    galleryImages[id].push(modules[path]);
  });

export { galleryImages };

/** Real photos only, excludes the entry's logo (see getLogoImage). */
export function getGalleryImages(id: string): string[] {
  return galleryImages[id] ?? [];
}

export function getHeroImage(id: string): string | undefined {
  return galleryImages[id]?.[0];
}

/** The small brand mark for an entry, named `<id>-logo.<ext>` in its gallery folder. Not a photo. */
export function getLogoImage(id: string): string | undefined {
  return galleryLogos[id];
}
