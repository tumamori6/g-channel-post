require('dotenv').config();
const https = require('https');
const tw = require('./tw_module.js');
const op = {
	'update_url':process.env['UPDATE_URL_2'],
	'update_target':process.env['UPDATE_TARGET_2'],
};

getEncodedDate = () => {

	const date = new Date();
	const m    = date.getMonth() + 1;
	const d    = date.getDate();
	const md   = m + '月' + d + '日';
	return encodeURI(md);
	
}

getDayName = (str) => {
	opt_a          = str.substring(str.indexOf(']') + 1);
	opt_b          = opt_a.substring(opt_a.indexOf(']') + 1);
	day_name_last  = opt_b.substring(0,opt_b.indexOf('の日'));
	day_name_first = str.match(/\[(.+)\]/)[1].match(/\[(.+)\]/)[1];
	return '・' + day_name_first + day_name_last + 'の日';
}

getAnniversary = (page_body) => {

	var all_anniversary   = page_body.match(/== 記念日・年中行事 ==[\s\S]*== フィクションのできごと ==/);
	var anniversary_list  = all_anniversary[0].match(/\*.+\n/g); 
	let targets = [];
	anniversary_list.forEach((val,key) => {
		if(val.includes('の日') && !val.includes('この日')){
			targets += getDayName(val);
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
		let post_text = "今日は何の日？" + '\n'; 
		post_text += anniversary;
		tw.updatePost(post_text,op);
		//console.log(anniversary);
	});
})


req.end();

//console.log();