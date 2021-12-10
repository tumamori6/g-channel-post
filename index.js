require('dotenv').config();
const https = require('https');
const rq = require('request');
const tw = require('./tw_module.js');

updateContent = (content_id) => {

	var options = {
		url:process.env['CONTENTS_URL'],
		headers:{
			"Content-type": "application/x-www-form-urlencoded",
		},
		form:{
			'posted':1,
			'content_id':content_id,
		}
	}

	rq.post(options, function (error, response, body) { });

}

const req = https.request(process.env['CONTENTS_URL'], (res) => {
	res.setEncoding('utf8');
	var body = "";
	res.on('data', function (resData) {
		body += resData;
	});
	res.on('end', function () {
		var content = JSON.parse(body)[0];
		var content_title = content.title.slice(0,50);
		let post_text = "";
		post_text += content_title + '\n'; 
		post_text += content.url   + '\n'; 
		updateContent(content.id);
		tw.updatePost(post_text);
		console.log(post_text);
	});
})

req.end();
