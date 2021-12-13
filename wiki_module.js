require('dotenv').config();
const https = require('https');

getEncodedDate = () => {

	const date = new Date();
	const m    = date.getMonth() + 1;
	const d    = date.getDate();
	const md   = m + '月' + d + '日';
	return encodeURI(md);
	
}

getAnniversary = (page_body) => {

	var all_anniversary   = page_body.match(/== 記念日・年中行事 ==[\s\S]*== フィクションのできごと ==/);
	var anniversary_list  = all_anniversary[0].match(/\*.+\n/g); 
	let targets = [];
	anniversary_list.forEach((val,key) => {
		if(val.includes('の日') && !val.includes('この日') && val.includes('JPN')){
			targets += val;
		}
	});

	return targets;
	
}

const wiki_url = process.env['WIKI_URL'] + getEncodedDate();

const req = https.request(wiki_url, (res) => {
	res.setEncoding('utf8');
	var body = "";
	res.on('data', function (resData) {
		body += resData;
	});
	res.on('end', function () {
		var content = JSON.parse(body);
		var page_id = Object.keys(content.query.pages)[0]; 
		var page_body = content.query.pages[page_id].revisions[0]['*'];
		var anniversary = getAnniversary(page_body);
		console.log(anniversary);
	});
})


req.end();

//console.log();