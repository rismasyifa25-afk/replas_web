
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Reusable stat card with sparkline
export type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  href?: string;
  points?: number[]; // 0..100 range for y-values
  className?: string;
};

function Sparkline({ points = [5, 40, 15, 60, 10, 12] }: { points?: number[] }) {
  // Build a smooth-ish path across the width
  const width = 240;
  const height = 72;
  const stepX = width / (points.length - 1);
  const y = (v: number) => height - (v / 100) * height;
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${i * stepX},${y(p)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16">
      <path d={path} className="stroke-[color:var(--tulisan-nonprimary)]" fill="none" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function StatCard({ title, value, subtitle, href, points, className }: StatCardProps) {
  return (
    <Card className={cn("bg-[color:var(--background)] text-[color:var(--text-color)] shadow-sm rounded-2xl", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between text-xs text-[color:var(--tulisan-nonprimary)]">
          <span>{title}</span>
          {href ? (
            <Link to={href} className="text-zinc-300 hover:text-white transition-colors">View More</Link>
          ) : (
            <span className="text-zinc-300">\u200b</span>
          )}
        </div>
        <div className="mt-1 text-4xl font-semibold tracking-tight">{value}</div>
        {subtitle ? <div className="mt-1 text-sm text-zinc-400">{subtitle}</div> : null}
      </CardHeader>
      <CardContent className="pt-1">
        <div className="rounded-xl overflow-hidden">
          <Sparkline points={points} />
        </div>
      </CardContent>
    </Card>
  );
}

// Default preview component using the example from the screenshot
export default function SubscriptionsCard(props:any) {
    const { title, value, subtitle, points, className, link } = props;
  return (
    <div className={className}>
      <StatCard
        title={title}
        value={value}
        subtitle={subtitle}
        href={link}
        points={points}
      />
    </div>
  );
}
