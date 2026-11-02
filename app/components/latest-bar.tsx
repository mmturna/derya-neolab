// Thin announcement strip at the top of interior pages pointing at the newest paper.
import Link from "next/link";

export function LatestBar() {
  return (
    <Link href="/research" className="latest-bar">
      <span className="mono">Latest</span>
      <span>When Must an Agent Remember? Bounded action-time memory in a synthetic RFQ workflow</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
