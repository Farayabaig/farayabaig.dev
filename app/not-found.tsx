import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] flex-col items-start justify-center py-16">
      <p className="font-mono text-sm text-muted">
        <span className="text-accent-strong">$</span> cat ./this-page
      </p>
      <p className="mt-1 font-mono text-sm text-amber">error 404: no such file or directory</p>
      <h1 className="mt-6 text-3xl md:text-4xl">This page does not exist.</h1>
      <Link href="/" className="mt-6 text-accent-strong hover:underline">
        Back to home →
      </Link>
    </div>
  );
}
