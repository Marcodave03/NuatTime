const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('requestfailed', r => errors.push('404/FAIL: ' + r.url().split('/').slice(-1)[0] + ' -> ' + (r.failure()||{}).errorText));

  await page.goto('http://localhost:4321/main.html', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);

  // Gate closed (top of page)
  await page.screenshot({ path: 'shots/01-gate-closed.png' });

  // Scrub the gate open
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.3));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'shots/02-gate-open.png' });

  // Sections
  for (const [name, sel] of [['03-welcome','#welcome'],['04-treatments','#treatments'],['05-rates','#rates'],['06-offer','#offer'],['07-visit','#visit']]) {
    await page.evaluate(s => document.querySelector(s).scrollIntoView(), sel);
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `shots/${name}.png` });
  }

  // Dusk theme
  await page.click('#theme-toggle');
  await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector('#treatments').scrollIntoView());
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'shots/08-dusk-treatments.png' });

  // Mobile
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await m.goto('http://localhost:4321/main.html', { waitUntil: 'networkidle', timeout: 60000 });
  await m.waitForTimeout(1000);
  await m.screenshot({ path: 'shots/09-mobile-gate.png' });
  await m.evaluate(() => document.querySelector('#treatments').scrollIntoView());
  await m.waitForTimeout(1000);
  await m.screenshot({ path: 'shots/10-mobile-treatments.png' });

  console.log(errors.length ? errors.join('\n') : 'NO ERRORS');
  await browser.close();
})();
