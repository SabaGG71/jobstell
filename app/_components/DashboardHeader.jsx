import Link from "next/link";

export default function DashboardHeader() {
  return (
    <section>
      <nav className="bg-primary-500 py-5 text-white text-center">
        <ul className="flex items-center gap-4 justify-center">
          <Link href="/">Home</Link>
          <Link href="/">Features</Link>
          <Link href="/">Questions</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Download</Link>
        </ul>
      </nav>
    </section>
  );
}
