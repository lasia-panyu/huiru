'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
 //    const collection = db.collection('opendb-news-articles');
	// const commentsDB = db.collection('opendb-news-comments');
	
	// console.log('event : ', event);
	// const newsshuffle = require('./common.js')
	// let apiUrl = "https://fuyin.fuxinbank.com:10058/PanguService/newsModelsSel";
	// const collection = db.collection('opendb-news-categories');
	// let news_categories = await collection.get();
	// news_categories = news_categories.data;
	// for (let index in news_categories) {
	// 	let param = {
	// 		'newsTypeId': news_categories[index].description
	// 	};
		
	// 	let res = await uniCloud.httpclient.request(apiUrl, {
	// 		method: 'POST',
	// 		data: param,
	// 		header: {
	// 			'content-type': 'application/x-www-form-urlencoded', // 默认值
	// 			'Referer': 'https://fuyin.fuxinbank.com'
	// 		},
	// 		// contentType: 'json', // 指定以application/json发送data内的数据
	// 		dataType: 'json' ,// 指定返回值为json格式，自动进行parse
	// 		success: (res) => {},
	// 		timeout:100000,
	// 		fail: (res) => {
	// 			console.log(res);
	// 			console.log("fail");
	// 			return "执行失败:" + res;
	// 		},
	// 	});
	//     let typeId=news_categories[index]._id;
		
	// 	let newsList = res.data;
	// 	newsList = newsshuffle(newsList);
	// 	let collectionArticles = db.collection('opendb-news-articles');
	// 	let pDate;
	// 	console.log("typeId:"+typeId);
	// 	console.log("newsList:"+newsList.length);
	// 	for (let x in newsList) {
	// 		if (newsList[x].published_At) {
	// 			pDate = new Date(newsList[x].published_At.replace(new RegExp("-", "gm"), "/")).getTime()
	// 		} else {
	// 			pDate = new Date().getTime();
	// 		}
	// 		let typeId=news_categories[index]._id;
	// 		let tmpNews = {
	// 			"user_id": "6077ea5980b8450001feeb63",
	// 			"article_status": 1,
	// 			"publish_date": pDate,
	// 			"last_modify_date": pDate,
	// 			"category_id": typeId,
	// 			"title": newsList[x].title,
	// 			"excerpt": "",
	// 			"brief": {
	// 				"branch": newsList[x].author_Avatar,
	// 				"name": newsList[x].author_Name,
	// 				"video":newsList[x].videoPath,
	// 			},
	// 			"comment_status": 1,
	// 			"content": newsList[x].content == null ? "" : newsList[x].content,
	// 			"publish_ip": "127.0.0.1",
	// 			"last_modify_ip": "127.0.0.1",
	// 			"imgPath": newsList[x].imgPath,
	// 			"mode": newsList[x].type == "newslist" ? 0 : newsList[x].type
	// 		}
	// 		// console.log("tmpNews"+tmpNews);
	// 		let resultDb = await collectionArticles.doc(newsList[x].post_Id).set(tmpNews);
	// 		// console.log("!!!!!!!!!!!!!!!!!!执行结果!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	// 		// console.log(typeId);
	// 		// console.log(tmpNews);
	// 		// console.log(news_categories[index]._id);
	// 		// console.log(newsList[x].post_Id);
	// 		// console.log("++++++++++++++++++++++执行结果+++++++++++++++++++++++++");
	// 	}
	// }	
 //    let news = await collection.limit(500).get();
	// news=news.data;
 //    for(let index in news){
	// 	let newTmp=news[index];
	// 	console.log(newTmp);
	// 	// console.log(newTmp._id);
	// 	let res = await uniCloud.httpclient.request("https://fuyin.fuxinbank.com:10058/PanguService/commentSels", {
	// 				method: 'POST',
	// 				data: {
	// 					"content_Id":newTmp._id,
	// 					"server_Name":'NewsPaper'
	// 				},
	// 				header: {
	// 					'content-type': 'application/x-www-form-urlencoded', // 默认值
	// 					'Referer': 'https://fuyin.fuxinbank.com'
	// 				},
	// 				// contentType: 'json', // 指定以application/json发送data内的数据
	// 				dataType: 'json' ,// 指定返回值为json格式，自动进行parse
	// 				success: (res) => {},
	// 				timeout:100000,
	// 				fail: (res) => {
	// 					console.log(res);
	// 					console.log("fail");
	// 					return "执行失败:" + res;
	// 				},
	// 	});
	// 	let comments = res.data;
	// 	for(let idx in comments){
	// 		console.log(comments[idx]);
	// 		let cDate=comments[idx].timestamp.substring(0,4)+"-"
	// 		+comments[idx].timestamp.substring(4,6)+"-"
 //            +comments[idx].timestamp.substring(6,8)+" "
	// 		+comments[idx].timestamp.substring(9,11)+":"
	// 		+comments[idx].timestamp.substring(12,15)+":00"
	// 		console.log(cDate)
	// 		let comment={
	// 			"comment_content":comments[idx].content,
	// 			"article_id":newTmp._id,
	// 			"comment_date":new Date(cDate).getTime(),
	// 			"brief":{"id":comments[idx].teller_Id,"name":comments[idx].teller_Name},
	// 			"comment_type":0,
	// 			"like_count":0,
	// 		}
	// 		let resultC=await commentsDB.doc(comments[idx].commentId).set(comment);
	// 		console.log(resultC)
	// 	}
	// }
		
		
		
	// const collection = db.collection('uni-id-users');//1589
	// let users = await collection.skip(1500).limit(500).get();
	// users = users.data;
	// let param={};
	// for (let index in users) {
	// 	if(users[index]._id=='000853'){
	
	// 		  console.log(users[index]);
	// 	}
		    
	// if(!users[index].password){
	// 	users[index].password="P2saw9rd";
	// }
 //    param={
	// 	"uid":users[index]._id,
	// 	"password":users[index].password
	// }
	// console.log(index);
	// console.log(param);
	// let res = await uniID.resetPwd(param);
	// console.log(res)
	// }
	return "迁移成功";
};
