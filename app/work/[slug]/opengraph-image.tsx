import { ogContentType, ogSize, renderOgCard } from "@/lib/og";
import { getProject, projects, statusLabels } from "@/lib/projects";
import { site } from "@/lib/site";

export const alt = `${site.name} case study`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgCard({
    eyebrow: "Case study",
    title: project?.name ?? site.name,
    meta: project ? `${project.industry} · ${statusLabels[project.status]}` : undefined,
  });
}
