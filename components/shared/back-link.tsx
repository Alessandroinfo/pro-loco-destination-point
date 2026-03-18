import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-14 w-fit items-center gap-3 rounded-full border border-navy-950/10 bg-white/80 px-6 text-lg font-semibold text-navy-950 shadow-[0_14px_34px_rgba(16,36,63,0.08)] backdrop-blur"
      aria-label={`Torna a ${label}`}
    >
      <span className="text-2xl leading-none">‹</span>
      {label}
    </Link>
  );
}
