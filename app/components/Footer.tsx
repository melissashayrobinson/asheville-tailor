export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-linen">
    <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
        <div>
            <h3 className="font-serif text-4xl">
            Asheville Tailor
            </h3>

            <p className="mt-6 max-w-md text-ink/70">
            Modern tailoring, bridal alterations, and custom garment
            work throughout Asheville and Western North Carolina.
            </p>

            <p className="mt-6 text-sm text-ink/50">
            By appointment only.
            </p>
        </div>

        <div className="grid grid-cols-2 gap-10">
            <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-ink/50">
                Explore
            </p>

            <ul className="space-y-3">
                <li>
                <a href="/#alterations" className="hover:opacity-60">
                    Services
                </a>
                </li>

                <li>
                <a href="/#pricing" className="hover:opacity-60">
                    Pricing
                </a>
                </li>

                <li>
                <a href="/#booking" className="hover:opacity-60">
                    Start a Booking
                </a>
                </li>
            </ul>
            </div>

            <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-ink/50">
                Elsewhere
            </p>

            <ul className="space-y-3">
                

                <li>
                <a
                    href="https://instagram.com/ashevilletailor"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-60"
                >
                    Instagram
                </a>
                </li>
            </ul>
            </div>
        </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink/10 pt-8 text-sm text-ink/50 md:flex-row md:items-center md:justify-between">
        <p>
            © {new Date().getFullYear()} The Asheville Tailor
        </p>

        <p>
            Tailoring, redesigned.
        </p>
        </div>
    </div>
    </footer>
  );
}