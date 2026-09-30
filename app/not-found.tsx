import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg py-10">
      <h1 className="text-[40px] font-semibold tracking-tight text-ink">This page is not on the desk</h1>
      <p className="mt-3 text-[15px] text-secondary">Halcyon keeps People and Overview. Nothing else is filed here.</p>
      <Link
        href="/people"
        className="mt-6 inline-flex h-10 items-center rounded-xl bg-coral px-4 text-[14px] font-semibold text-ink"
      >
        Back to People
      </Link>
    </div>
  );
}
