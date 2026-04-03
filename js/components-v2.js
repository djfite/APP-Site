/* APP Merchant Services — Shared Components */

const LOGO_IMG = `<img src="/assets/app_logo.png" alt="APP Merchant Services logo" style="height:44px;width:auto;border-radius:6px;display:block;"/>`;

function injectNav(activePage) {
  const pages = [
    { href: '/index.html',        label: 'Home' },
    { href: '/restaurant.html',   label: 'Restaurants' },
    { href: '/salon.html',        label: 'Salons' },
    { href: '/dry-cleaner.html',  label: 'Dry Cleaners' },
    { href: '/services.html',     label: 'More Services' },
    { href: '/faq.html',          label: 'FAQ' },
    { href: '/contact.html',      label: 'Get a Free Quote', cta: true },
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
            <p>Local payment processing and POS solutions for restaurants, salons, and dry cleaners in the Palm Coast area. Powered by bluu™.</p>
          </div>
          <div class="footerCol">
            <h5>POS Solutions</h5>
            <ul>
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
              <li><a href="https://www.ebluu.com" target="_blank" rel="noopener">About bluu™</a></li>
            </ul>
          </div>
          <div class="footerCol">
            <h5>Contact</h5>
            <ul>
              <li><a href="tel:8402028325">📞 840-202-8325</a></li>
              <li><a href="mailto:derek@adproproductions.com">✉️ derek@adproproductions.com</a></li>
              <li style="color:var(--text3);font-size:13px;">Palm Coast, FL</li>
              <li style="color:var(--text3);font-size:13px;">Mon–Fri 9am–5pm ET</li>
            </ul>
          </div>
        </div>
        <div class="footerBottom">
          <p class="footerLegal">© ${year} APP Merchant Services. Payment processing provided by <a href="https://www.ebluu.com" target="_blank" rel="noopener">bluu™</a>, a registered ISO/MSP of Merrick Bank, South Jordan, UT.</p>
          <p style="font-size:12px;color:var(--text3);">Powered by <a href="https://www.ebluu.com" target="_blank" rel="noopener" style="color:var(--blueL);">bluu™</a></p>
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

document.addEventListener('DOMContentLoaded', initFadeIn);
