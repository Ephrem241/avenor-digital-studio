import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** 1440px frame with responsive side padding (20 / 32 / 64px). */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-avenor", className)} {...props} />;
}
