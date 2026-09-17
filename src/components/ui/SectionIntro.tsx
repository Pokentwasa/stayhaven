import { cx } from "@/lib/utils";

export function SectionIntro({
  index,
  label,
  heading,
  align = "left",
  tone = "dark",
  className,
}: {
  index: string;
  label: string;
  heading: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <p
        className={cx(
          "text-eyebrow flex items-center gap-3",
          tone === "light" ? "text-ivory/70" : "text-charcoal/55"
        )}
      >
        <span>{index}</span>
        <span className="h-px w-8 bg-current/50" />
        <span>{label}</span>
      </p>
      <h2 className={cx("text-display-lg", tone === "light" ? "text-ivory" : "text-charcoal")}>
        {heading}
      </h2>
    </div>
  );
}
