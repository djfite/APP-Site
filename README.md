# APP — Payment Processing Website

Local payment processing and POS solutions for restaurants, salons,
and dry cleaners in Palm Coast, FL. Powered by bluu(tm).

## File Structure

index.html           Home page
restaurant.html      Restaurant POS
salon.html           Salon POS
dry-cleaner.html     Dry Cleaner POS
contact.html         Contact & Quote
css/styles-v2.css       All shared styles
js/components-v8.js     Nav + footer injection
js/calculator.js     Savings calculator
assets/              Images, logo

## Deployment (Hostinger Git)

git init
git add .
git commit -m "Initial APP site build"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

Then: Hostinger -> Git -> connect repo -> set branch to main -> auto-pull on push.

## Before Going Live

- Replace (000) 000-0000 with your real phone in contact.html and components-v8.js
- Replace info@adpro.com with your real email
- Swap the contact form in contact.html with your Jotform embed code
- Update calculator rates in calculator.js when you have actual bluu rates
- Add Google Analytics before </head> on each page

## Calculator Rates (calculator.js)

Typical:  2.9% + $0.30/txn   (Square/Stripe standard)
bluu(tm): 2.2% + $0.15/txn   (competitive ISO estimate)

Update BLUU_PCT and BLUU_FLAT when you have actual confirmed rates.
