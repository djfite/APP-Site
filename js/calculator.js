/* APP Merchant Services — Savings Calculator */

const CURRENT = { swipe: { p: 0.0276, f: 0.10 }, keyed: { p: 0.0350, f: 0.30 }, online: { p: 0.0290, f: 0.30 } };
const BLUU    = { swipe: { p: 0.0179, f: 0.08 }, keyed: { p: 0.0249, f: 0.20 }, online: { p: 0.0219, f: 0.20 } };
const MONTHLY_FEE = 29;

const fmt  = v => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
const fmt2 = v => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
const $    = id => document.getElementById(id);

function calc() {
  const vol    = parseFloat($('cVol')?.value) || 0;
  const ticket = parseFloat($('cTick')?.value) || 0;
  const swipeP = parseFloat($('cSwipe')?.value) || 70;
  const keyedP = parseFloat($('cKeyed')?.value) || 10;
  if (!vol || !ticket) return;
  const txns = Math.round(vol / ticket);
  const swipeVol = vol * (swipeP / 100);
  const keyedVol = vol * (keyedP / 100);
  const onlineVol = Math.max(0, vol - swipeVol - keyedVol);
  const swipeTx = Math.round(txns * (swipeP / 100));
  const keyedTx = Math.round(txns * (keyedP / 100));
  const onlineTx = Math.max(0, txns - swipeTx - keyedTx);
  const curFees = (swipeVol*CURRENT.swipe.p + swipeTx*CURRENT.swipe.f) + (keyedVol*CURRENT.keyed.p + keyedTx*CURRENT.keyed.f) + (onlineVol*CURRENT.online.p + onlineTx*CURRENT.online.f);
  const bluuFees = MONTHLY_FEE + (swipeVol*BLUU.swipe.p + swipeTx*BLUU.swipe.f) + (keyedVol*BLUU.keyed.p + keyedTx*BLUU.keyed.f) + (onlineVol*BLUU.online.p + onlineTx*BLUU.online.f);
  const savings = Math.max(0, curFees - bluuFees);
  const annual = savings * 12;
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('rCur', fmt2(curFees)); set('rBluu', fmt2(bluuFees));
  set('rSave', fmt(savings)); set('rAnnual', fmt(annual));
  const bar = $('cBar');
  if (bar) { const pct = curFees > 0 ? Math.min(100, (savings/curFees)*100) : 0; bar.style.width = pct.toFixed(0)+'%'; }
  const nudge = $('cNudge');
  if (nudge) { nudge.style.display = savings > 50 ? 'block' : 'none'; const na = $('cNudgeAmt'); if (na) na.textContent = fmt(annual); }
}

document.addEventListener('DOMContentLoaded', () => {
  ['cVol','cTick','cSwipe','cKeyed'].forEach(id => { const el = $(id); if (el) el.addEventListener('input', calc); });
  const swipe = $('cSwipe'), swipeLbl = $('cSwipeLbl');
  if (swipe && swipeLbl) swipe.addEventListener('input', () => { swipeLbl.textContent = swipe.value+'%'; });
  const keyed = $('cKeyed'), keyedLbl = $('cKeyedLbl');
  if (keyed && keyedLbl) keyed.addEventListener('input', () => { keyedLbl.textContent = keyed.value+'%'; });
  const v = $('cVol'); if (v && !v.value) v.value = '20000';
  const t = $('cTick'); if (t && !t.value) t.value = '35';
  calc();
});
