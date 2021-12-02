'use strict';

const db = uniCloud.database();
const collection = db.collection('opendb-news-favorite');
const news_collection = db.collection('opendb-news-articles');
const news_log_collection = db.collection('read-news-log');
const user_collection=db.collection('uni-id-users');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	if (event.action == "newsDetail") {
		let news=await news_collection.where({'_id':event.param.article_id}).get();
		news=news.data[0];
		console.log("news",news);
		let logs_param={
			"user_id":event.param.user_id,
			"article_id":event.param.article_id,
		};
		console.log("news._id",news);
		await news_collection.doc(news._id).update({
			"view_count":news.view_count+1
		});
		console.log("logs_param",logs_param);
		let tmp_res=await news_log_collection.doc(event.param.user_id+event.param.article_id).set(logs_param);
		console.log("tmp_res",tmp_res);
		let newOP=await collection.where({
			'state':1,
			"user_id":event.param.user_id,
			"article_id":event.param.article_id
		}).get();
		newOP=newOP.data;
		console.log("newOP",newOP);
		console.log(newOP.filter(x=>x.type==1).length);
		console.log(newOP.filter(x=>x.type==2).length);
		// console.log('event : ', event.param.article_id)
		// console.log('event : ', event.param.user_id);
		// let like_count =await collection.where({
		//     "article_id":event.param.article_id,
		// 	"type":1,
		// 	"state":1
		// }).count();
		// let collect_count =await collection.where({
		//     "article_id":event.param.article_id,
		// 	"type":2,
		// 	"state":1
		// }).count();
		// let own_like =await collection.where({
		// 	"user_id":event.param.user_id,
		//     "article_id":event.param.article_id,
		// 	"type":1,
		// 	"state":1
		// }).count();
		// let own_collect =await collection.where({
		// 	"user_id":event.param.user_id,
		//     "article_id":event.param.article_id,
		// 	"type":2,
		// 	"state":1
		// }).count();
		
		console.log(news.like_count);
		console.log(news.comment_count);
		console.log(news.comment_count>0?news.comment_count:0);
		// console.log(own_like);
		// console.log(own_collect);
		return  {
			"like_count":news.like_count>0?news.like_count:0,
			"collect_count":news.comment_count>0?news.comment_count:0,
			"own_like":newOP.filter(x=>x.type==1).length,
			"own_collect":newOP.filter(x=>x.type==2).length
		};
	}
	if (event.action == "opSet") {
	   let news=await news_collection.where({'_id':event.param.article_id}).get();
	   news=news.data[0];
	   let op={
		   "user_id":event.param.user_id,
		   "article_id":event.param.article_id,
		   "type":event.param.type.type=="like"?1:2,
	   }
	   console.log("param:",event.param.type);
	   let opList =await collection.where(op).get();
	   op.state=event.param.type.own==0?1:0;
	   console.log(opList);
	   let key=event.param.type.type=="like"?"like_count":"comment_count";
	   console.log("key"+key);
	   let newparam={};
	   let result;
	   news[key]=news[key]>0?news[key]:0;
	   console.log(key);
	   console.log(news[key]);
	   if(opList.data.length==0){
		   op.state=event.param.type.own==0?1:0;
		   result=await collection.add(op);
		   newparam[key]=news[key]+1;
		   console.log(result);
	   }else{
		   console.log(opList.data[0]);
		   newparam[key]=event.param.type.own==0?news[key]+1:news[key]-1;
		   result=await collection.doc(opList.data[0]._id).update(op);
		   console.log(result);
	   }
	   console.log("newparam",newparam);
	   result = await news_collection.doc(news._id).update(newparam);
	   if(result){
		   return {
			   "code":0,
			   "msg":"调用成功!"
		   }
	   }
	   // if(event.param.type=="like"){
		   
	   // }
	   // if(event.param.type=="collect"){
	   		   
	   // }
	}
	if (event.action == "logs"){
			// let users = await user_collection.skip(1499).limit(500).get();
			// users = users.data;
			// let param={};
			// for (let index in users) {
			//    console.log(index);
	  //          let result1111=await user_collection.doc(users[index]._id).set({"avatar_file": 
			//    { "extname": "png",
			//    "name": "undefined1629269530648",
			//    "url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3b197c47-f4d8-455c-b037-4e5e50a58297/381908c7-cdde-4951-962e-832a902b9680.",
			//    },
			//    });
	  //          console.log(result1111);
			// }
		console.log(event.param.user_id);
		let result=await news_log_collection.where({
			"user_id":event.param.user_id
		}).get();
		console.log(result);
		result=result.data;
		console.log(result);
		console.log(result.map(({article_id})=>article_id))
		return result;
	}
	return event
};
