// Bottom bar shared by every page: copyright and the product sign-in link.
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© 2026 Derya</span>
      <span className="site-footer-links">
        <Link href="/contact">Contact</Link>
        <a href="https://app.derya.ai">Sign in</a>
      </span>
    </footer>
  );
}
