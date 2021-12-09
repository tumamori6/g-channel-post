require('dotenv').config();
const https = require('https');
const rp = require('request-promise-native');
const tw = require('./tw_module.js');

updateContent = (content_id) => {

	var option = {
		method: 'POST',
		uri: process.env['CONTENTS_URL'],
		form: {
			posted: 1,
			content_id: content_id,
		}
	};

	return rp(option)
		.then(function () {
			return 'update Success';
		})
		.catch(err => {
			console.log(err);
		});

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
		// 要件として不要
		// post_text += '#' + content.category   + ' ' + process.env['DEFAULT_TAG'];
		updateContent(content.id);
		tw.updatePost(post_text);
		console.log(post_text);
	});
})

req.end();

// exports.updatePost = () => {
// 	req.end();
// }

