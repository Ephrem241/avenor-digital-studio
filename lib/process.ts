import type { IconName } from "@/components/ui/icon";

export type ProcessStep = {
  name: string;
  summary: string;
  icon: IconName;
};

export const processSteps: ProcessStep[] = [
  { name: "Discover", summary: "We learn how your business works and who your customers are.", icon: "compass" },
  { name: "Strategize", summary: "We agree on what to build first and why.", icon: "lightbulb" },
  { name: "Design", summary: "We design the pages and the journeys through them.", icon: "pen-tool" },
  { name: "Develop", summary: "We build each feature and test it before launch.", icon: "code-xml" },
  { name: "Launch", summary: "We go live and check that everything works.", icon: "rocket" },
  { name: "Optimize", summary: "We watch how people use the site and keep improving it.", icon: "trending-up" },
];
