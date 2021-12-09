require('dotenv').config();
const puppeteer = require("puppeteer");

exports.updatePost = async(post_text) => {

	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		headless: true,
		// headless: false,
		slowMo: 50,
	});

	const page = await browser.newPage();

	await page.goto(process.env['METABIRDS_URL']);
	await page.waitForSelector('.twitter_login_button_w');
	await page.click('.twitter_login_button_w');
	await page.waitForTimeout(2000);

	//heroku ipでメール認証 初回のみ
	const html = await page.$eval('body', item => {
		return item.innerHTML;
	});
	console.log(html);

	// await page.waitForSelector('[name="session[username_or_email]"]');
	// await page.click('[name="session[username_or_email]"]');
	// await page.keyboard.type(process.env.USER_ID);
	// await page.waitForSelector('[name="session[password]"]');
	// await page.click('[name="session[password]"]');
	// await page.keyboard.type(process.env.USER_PASS);
	// await Promise.all([
	// 	page.waitForNavigation({ waitUntil: ['load', 'networkidle2'], timeout: 0 }),
	// 	page.click('.submit.button.selected'),
	// ]);
	// await page.waitForTimeout(5000);

	// await page.goto('https://metabirds.net/admin/bot_random.php');
	// await page.waitForSelector('#message_1');
	// await page.focus('#message_1');
	// await page.keyboard.down('Control');
	// await page.keyboard.press('A');
	// await page.keyboard.up('Control');
	// await page.keyboard.press('Backspace');
	// await page.click('#message_1');

	// await page.keyboard.type(post_text);
	// await page.keyboard.press("Tab");
	// await page.keyboard.press('Enter');
	// await page.waitForTimeout(3000);
	// await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
	
	//local only
	// await page.screenshot({
	// 	path: 'screenshot.png',
	// 	fullPage: true,
	// });

	await browser.close();
	
}


