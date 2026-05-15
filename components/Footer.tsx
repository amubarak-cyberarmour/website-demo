export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[var(--line)] bg-[var(--paper)] px-6 py-14 text-[var(--muted)] md:px-20"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-[var(--ink)]">
            CyberArmour
          </h2>
          <p className="text-sm leading-relaxed">
            xyz,<br />
            xyz Islamabad
          </p>
          <a
            href="mailto:info@cyberarmour.pk"
            className="mt-4 inline-block text-sm text-[var(--blue)] transition-colors hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
            aria-label="Email CyberArmour at info@cyberarmour.pk"
          >
            info@cyberarmour.pk
          </a>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[var(--ink)]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer transition-colors hover:text-[var(--ink)]">Home</li>
            <li className="cursor-pointer transition-colors hover:text-[var(--ink)]">About</li>
            <li className="cursor-pointer transition-colors hover:text-[var(--ink)]">Services</li>
            <li className="cursor-pointer transition-colors hover:text-[var(--ink)]">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[var(--ink)]">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Consulting &amp; Design</li>
            <li>System Integration</li>
            <li>Operation &amp; Maintenance</li>
            <li>Data Governance</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[var(--ink)]">Newsletter</h3>
          <p className="mb-4 text-sm">Subscribe for updates and insights</p>

          <div className="flex items-center overflow-hidden rounded-lg border border-[var(--line)] bg-white/60">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
            />
            <button className="bg-[#0e1229] px-4 py-2 text-[#f7f4ed] transition-colors hover:bg-[#0e1229]">→</button>
          </div>
        </div>
      </div>

      <div className="my-10 border-t border-[var(--line)]" />

      <div className="grid grid-cols-1 gap-10 text-start md:grid-cols-4">
        <div>
          <p className="font-semibold text-[var(--ink)]">Pakistan</p>
          <p className="text-sm">Islamabad</p>
        </div>

        <div>
          <p className="font-semibold text-[var(--ink)]">United Kingdom</p>
          <p className="text-sm">London</p>
        </div>

        <div>
          <p className="font-semibold text-[var(--ink)]">Hong Kong</p>
          <p className="text-sm">S.A.R China</p>
        </div>

        <div>
          <p className="font-semibold text-[var(--ink)]">United Arab Emirates</p>
          <p className="text-sm">Ajman</p>
        </div>
      </div>

      <div className="my-8 border-t border-[var(--line)]" />

      <div className="text-sm text-[var(--muted)]">
        © 2026 CyberArmour Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
