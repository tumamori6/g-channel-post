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

	//authページではなく直ログインに変更
	await page.waitForSelector('[name="login_id"]');
	await page.click('[name="login_id"]');
	await page.keyboard.type(process.env.USER_ID);
	await page.waitForSelector('[name="login_pass"]');
	await page.click('[name="login_pass"]');
	await page.keyboard.type(process.env.USER_PASS);
	await page.keyboard.press("Tab");
	await page.keyboard.press('Enter');
	await page.waitForTimeout(5000);

	//authページパターン
	// await page.waitForSelector('.twitter_login_button_w');
	// await page.click('.twitter_login_button_w');
	// await page.waitForTimeout(2000);
	// await page.waitForSelector('[name="session[username_or_email]"]');
	// await page.click('[name="session[username_or_email]"]');
	// await page.keyboard.type(process.env.USER_ID);
	// await page.waitForSelector('[name="session[password]"]');
	// await page.click('[name="session[password]"]');
	// await page.keyboard.type(process.env.USER_PASS);
	// await page.click('.submit.button.selected');
	// await page.waitForTimeout(5000);

	//heroku ipでメール認証 初回のみ
	// await page.waitForSelector('[name="challenge_response"]');
	// await page.click('[name="challenge_response"]');
	// await page.keyboard.type(process.env.TW_AUTH_MAIL_ADDRESS);
	// await page.keyboard.press("Tab");
	// await page.keyboard.press('Enter');
	// await page.waitForTimeout(5000);


	// const html = await page.$eval('body', item => {
	// 	return item.innerHTML;
	// });
	// console.log(html);
	
	await page.goto('https://metabirds.net/admin/bot_random.php');
	await page.waitForSelector('#message_1');
	await page.focus('#message_1');
	await page.keyboard.down('Control');
	await page.keyboard.press('A');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.click('#message_1');

	await page.keyboard.type(post_text);
	await page.keyboard.press("Tab");
	await page.keyboard.press('Enter');
	await page.waitForTimeout(3000);
	await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
	
	//local only
	// await page.screenshot({
	// 	path: 'screenshot.png',
	// 	fullPage: true,
	// });

	await browser.close();
	
}


