import { cn } from "@/lib/utils";
import { LoaderCircle, LucideProps } from "lucide-react";

type LoaderProps = {
  variant: "sm" | "lg";
  color: "white" | "primary";
} & LucideProps;

export default function Loader({ variant, color, className }: LoaderProps) {
  let baseClassName = "animate-spin";
  if (variant === "sm") baseClassName += " size-5";
  if (variant === "lg") baseClassName += " size-20";
  if (color === "white") baseClassName += " text-foreground";
  if (color === "primary") baseClassName += " text-primary";

  return <LoaderCircle className={cn(baseClassName, className)} />;
}
