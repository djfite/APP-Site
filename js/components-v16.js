/* APP Merchant Services — Shared Components */

const LOGO_IMG = `<img src="/assets/app-logo-lockup.svg" onerror="this.onerror=null;this.src='/assets/app-logo-lockup-2x.png'" alt="APP Merchant Services — Cleared to process" style="height:36px;width:auto;display:block;"/>`;

function injectNav(activePage) {
  const pages = [
    { href: '/index.html',                              label: 'Home' },
    { href: '/online-pharmacy-payment-processing.html', label: 'Online Pharmacy' },
    { href: '/restaurant.html',                         label: 'Restaurants' },
    { href: '/salon.html',                              label: 'Salons' },
    { href: '/dry-cleaner.html',                        label: 'Dry Cleaners' },
    { href: '/services.html',                           label: 'More Services' },
    { href: '/faq.html',                                label: 'FAQ' },
    { href: '/index.html#qualify',                      label: 'Check Your Eligibility', cta: true },
  ];

  const links = pages.map(p => {
    const active = p.href === activePage ? ' active' : '';
    const cls = p.cta ? ' navCta' : '';
    return `<a href="${p.href}" class="${(active + cls).trim()}">${p.label}</a>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav class="nav" id="mainNav">
      <div class="navIn">
        <a href="/index.html" class="navLogo">${LOGO_IMG}</a>
        <div class="navLinks" id="navLinks">${links}</div>
        <button class="navBurger" id="navBurger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`);

  document.getElementById('navBurger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
  });
}

function injectFooter() {
  const year = new Date().getFullYear();
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="footerIn">
        <div class="footerTop">
          <div class="footerBrand">
            <a href="/index.html" class="navLogo">${LOGO_IMG}</a>
            <p>Bank-sponsored merchant accounts for high-risk healthcare commerce. Cleared to process.</p>
          </div>
          <div class="footerCol">
            <h5>POS Solutions</h5>
            <ul>
              <li><a href="/online-pharmacy-payment-processing.html">Online Pharmacy</a></li>
              <li><a href="/restaurant.html">Restaurant POS</a></li>
              <li><a href="/salon.html">Salon &amp; Spa POS</a></li>
              <li><a href="/dry-cleaner.html">Dry Cleaner POS</a></li>
              <li><a href="/index.html#calculator">Savings Calculator</a></li>
            </ul>
          </div>
          <div class="footerCol">
            <h5>Company</h5>
            <ul>
              <li><a href="/index.html">Home</a></li>
              <li><a href="/services.html">More Services</a></li>
              <li><a href="/faq.html">FAQ</a></li>
              <li><a href="/contact.html">Contact Us</a></li>
              <li><a href="/online-pharmacy-payment-processing.html">Online Pharmacy</a></li>
            </ul>
          </div>
          <div class="footerCol">
            <h5>Contact</h5>
            <ul>
              <li><a href="tel:3862590649">📞 386-259-0649</a></li>
              <li><a href="mailto:derek@appmerchantservices.com">✉️ derek@appmerchantservices.com</a></li>
              <li style="color:var(--text3);font-size:13px;">Palm Coast, FL</li>
              <li style="color:var(--text3);font-size:13px;">Mon–Fri 9am–5pm ET</li>
            </ul>
          </div>
        </div>
        <div class="footerBottom">
          <p class="footerLegal">© ${year} APP Merchant Services. All rights reserved.</p>
          <p style="font-size:12px;color:var(--text3);margin-top:8px"><a href="/privacy.html" style="color:var(--text3)">Privacy Policy</a> &nbsp;·&nbsp; <a href="/terms.html" style="color:var(--text3)">Terms &amp; Conditions</a></p>
        </div>
      </div>
    </footer>`);
}

function initFadeIn() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fi').forEach(el => obs.observe(el));
}
// Ellie AI Agent - Jotform Chatbot
(function() {
  var script = document.createElement('script');
  script.src = 'https://cdn.jotfor.ms/agent/embedjs/019a849dc7117bdb8560faf980b1c548959d/embed.js';
  document.body.appendChild(script);
})();
document.addEventListener('DOMContentLoaded', initFadeIn);
