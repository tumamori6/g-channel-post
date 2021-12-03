require('dotenv').config();
const https = require('https');
const puppeteer = require("puppeteer");
const req = https.request(process.env['CONTENTS_URL'], (res) => {
	res.setEncoding('utf8');
	var body = "";
	res.on('data', function (resData) {
		body += resData;
	});
	res.on('end', function () {
		var content = JSON.parse(body)[0];
		console.log(content.url);
	});
})
//req.end();
loginAdmin();

async function loginAdmin() {

	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		defaultViewport: { width: 800, height: 200 },
		headless: false,
	});

	const page = await browser.newPage();

	await page.goto(process.env['METABIRDS_URL']);
	await page.waitForTimeout(1000);
	await page.close();
	await browser.close();


}
