/* Timeless website — wiring shared by every page. Settings live in config.js. */
(function () {
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const D = CONFIG.deal || {};
  const today = new Date().toLocaleDateString("en-CA");          // YYYY-MM-DD in the visitor's time zone
  const live = D.on && today >= D.from && today <= D.to;
  const teaser = D.on && today < D.from;

  // Links
  $$("[data-link=download]").forEach((a) => (a.href = CONFIG.download));
  $$("[data-link=support]").forEach((a) => (a.href = CONFIG.support));
  $$("[data-link=lostkey]").forEach((a) => { a.href = CONFIG.lostKey; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-version]").forEach((e) => (e.textContent = CONFIG.version));

  // Prices + Buy buttons (the code is added to Individual and Team checkouts during the sale)
  $$("[data-price]").forEach((e) => { const k = e.dataset.price; e.textContent = (live && D.prices[k]) || CONFIG.prices[k]; });
  // Crossed-out regular price: shown whenever the price shown is lower than the regular price (launch price or sale).
  const num = (p) => parseFloat(String(p || "").replace(/[^0-9.]/g, "")) || 0;
  $$("[data-was]").forEach((e) => { const k = e.dataset.was, reg = (CONFIG.regular || {})[k], now = (live && D.prices[k]) || CONFIG.prices[k];
    e.textContent = reg || ""; e.hidden = !(reg && num(now) < num(reg)); });
  $$("[data-launch]").forEach((e) => { const k = e.dataset.launch, reg = (CONFIG.regular || {})[k];
    e.hidden = !(reg && num(CONFIG.prices[k]) < num(reg)) || (live && !!D.prices[k]); });
  // Until real links are filled in config.js, nothing points at a broken page.
  const unset = (u) => !u || /PRODUCT_ID|PLAN_ID|SUPPORT_EMAIL|OWNER\/REPO/.test(u);
  if (unset(CONFIG.support)) $$("[data-link=support]").forEach((a) => { a.removeAttribute("href"); a.style.pointerEvents = "none"; a.title = "Coming soon"; });
  $$("[data-buy]").forEach((a) => {
    const k = a.dataset.buy; let url = CONFIG.checkout[k];
    if (unset(url)) { a.removeAttribute("href"); a.textContent = "Coming soon"; a.style.opacity = ".55"; a.style.pointerEvents = "none"; a.setAttribute("aria-disabled", "true"); return; }
    if (live && D.prices[k]) url += (url.includes("?") ? "&" : "?") + "coupon=" + encodeURIComponent(D.code);
    a.href = url; a.target = "_blank"; a.rel = "noopener";
  });

  // Black Friday bar
  const bar = document.getElementById("deal");
  if (bar && (live || teaser)) {
    const nice = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    const deals = (D.percent ? D.percent + "% off · " : "") + "Individual " + D.prices.individual + " · Team " + D.prices.team;
    document.getElementById("deal-text").textContent = live ? "Black Friday: " + deals + " with code" : "Black Friday deal from " + nice(D.from) + ": " + deals + " with code";
    document.getElementById("deal-when").textContent = live ? "· until " + nice(D.to) : "";
    const btn = document.getElementById("deal-code"); btn.textContent = D.code;
    btn.addEventListener("click", () => {
      const done = () => { btn.textContent = "Copied"; setTimeout(() => (btn.textContent = D.code), 1500); };
      try { navigator.clipboard.writeText(D.code).then(done, () => window.getSelection().selectAllChildren(btn)); }
      catch (e) { window.getSelection().selectAllChildren(btn); }
    });
    bar.hidden = false;
  }

  // Open a help answer when linked directly, e.g. index.html#lost-key
  const open = () => { const t = location.hash && document.getElementById(location.hash.slice(1)); if (t && t.tagName === "DETAILS") t.open = true; };
  window.addEventListener("hashchange", open); open();
})();
