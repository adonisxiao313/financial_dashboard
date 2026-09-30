"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-lg py-10">
      <h1 className="text-[40px] font-semibold tracking-tight text-ink">The desk did not load</h1>
      <p className="mt-3 text-[15px] text-secondary">
        Halcyon could not show this page. Seats on the book are unchanged.
      </p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
