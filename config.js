/* ======================= TIMELESS WEBSITE SETTINGS — the only file you need to edit =======================
   Every page reads these. Replace the CAPITALS placeholders before going live. */
const CONFIG = {
  // Windows installer, kept in this website's downloads/ folder. Always replace it with exactly this file name.
  download: "downloads/Timeless-Setup.exe",
  version: "2.3.1",

  // Freemius checkout links (Freemius dashboard → Plans → "Get Checkout").
  checkout: {
    individual: "https://checkout.freemius.com/app/45483/plan/80112/licenses/1/",
    team:       "https://checkout.freemius.com/app/45483/plan/80112/licenses/3/",
    pass:       "https://checkout.freemius.com/app/45483/plan/80537/"
  },
  // Prices people pay now.
  prices: { individual: "$29", team: "$79", pass: "$9" },
  // Regular prices: shown crossed out only when a lower price is showing (e.g. during Black Friday).
  regular: { individual: "$29", team: "$79" },

  lostKey: "https://users.freemius.com/",          // Freemius customer portal: buyers find their keys here
  support: "mailto:SUPPORT_EMAIL_HERE",            // e.g. "mailto:help@yourdomain" — use a support-only address

  // Black Friday. Before "from": a teaser bar. From "from" to "to": sale prices + code added to checkout. After: nothing.
  deal: { on: true, code: "BLACKFRIDAY26", from: "2026-11-19", to: "2026-11-30",
          percent: 30, prices: { individual: "$20.30", team: "$55.30" } }
};
/* ========================================================================================================= */
