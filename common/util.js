//const base_url='https://hlm.fuxinbank.com:10061/PanguService/'
// const opinion='http://localhost:8080/'
// const base_url='http://57.8.11.43:10062/'
const base_url = 'https://fuyin.fuxinbank.com:10058/PanguService/'
const opinion = 'http://106.13.123.166:8082/'
const account = {}
const news = {}
const accountno = ''
const examsessions = []
const exam = {}
const examconf = {}
const questiontest = {}
const systeminfo = {};
const videolist = [];
const voteItem = {};
const menu = [];

function toast(refs, title, icon, type) {
	refs.uToast.show({
		title: title,
		// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
		type: type,
		// 如果不需要图标，请设置为false
		icon: icon
	})
}

function newsshuffle(newList) {
	let index = 0;
	newList = newList.map(x => {
		x.imgPath = [];
		//  if(x.cover)
		// x.imgPath=[x.cover];

		if (x.content) {
			let str = x.content;
			let result = str.match(/<img src="(\S*)"\stitle="\S*"\salt="\S*"/gs);
			for (let r in result) {
				x.imgPath.push(result[r].match(/<img src="(\S*)"\stitle="\S*"/)[1]);
			}

		}
		if (x.imgPath.length < 3 && x.imgPath.length > 0) {
			x.imgPath = x.imgPath.slice(0, 1);
			x.type = Math.round(Math.random()) + 1;
		} else if (x.imgPath.length >= 3) {
			x.imgPath = x.imgPath.slice(0, 3);
			x.type = 3
			index = 0
		}
		if (index == 5)
			index = 0;
		index++;
		if (x.videoPath) {
			if (x.cover)
				x.imgPath = [x.cover];
			else
				x.imgPath = x.imgPath[0] ? imgPath[0] : [
					"https://fuyin.fuxinbank.com:10054/gms/UpLoad/NewsImg/20210411/1618135803567012466.jpg"
				]
			x.type = 3;
		}
		return x;
	});
	return newList;

}
async function getUser(page) {
	let url;
	if(page!=undefined&&page.$scope!=undefined)
	      url=page.$scope.route==undefined?"":page.$scope.route;
	let result = await this.cloudFunction("uni-id-cf", 'getCurrentUserInfo', {'curl':url});

	if (page.isLoginPage)
		return result;
	if (result.code == 0) {
		return result.userInfo;
	} else {
		// uni.showToast({
		// 	title: '请重新登录!',
		// 	duration: 3000
		// });
		// page.$u.route({
		// 	url: 'pages/login/login',
		// 	type: 'redirect',
		// });
		return ;
	}
	console.log(result);
}

function cloudFunction(url, action, param) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: url,
			data: {
				action: action,
				param: param,
			},
			success(res) {
				resolve(res.result);
			},
			fail(e) {
				resolve(e);
			}
		});
	})
}

function post(url, param) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: "请求中"
		});
		uni.request({
			url: base_url + url, //仅为示例，并非真实接口地址。
			method: 'POST',
			data: param,
			header: {
				'content-type': 'application/x-www-form-urlencoded', // 默认值
			},
			success: (res) => {
				console.log(res);
				resolve(res.data)
			},
			fail: (res) => {
				uni.hideLoading();
				console.log(res);
				uni.showToast({
					title: '请求失败，请重试!',
					duration: 3000
				})
				reject("err");
			},
			complete: (res) => {
				uni.hideLoading();
			}
		});
	})
}

function upost(url, param) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: "请求中"
		});
		uni.request({
			url: opinion + url, //仅为示例，并非真实接口地址。
			method: 'POST',
			data: param,
			header: {
				'content-type': 'application/x-www-form-urlencoded', // 默认值
			},
			success: (res) => {
				console.log(res);
				resolve(res.data)
			},
			fail: (res) => {
				uni.hideLoading();
				console.log(res);
				uni.showToast({
					title: '请求失败，请重试!',
					duration: 3000
				})
				reject("err");
			},
			complete: (res) => {
				uni.hideLoading();
			}
		});
	})
}

function download(url, param) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: "请求中"
		});
		uni.request({
			url: base_url + url, //仅为示例，并非真实接口地址。
			method: 'POST',
			responseType: "arraybuffer",
			data: param,
			header: {
				'content-type': 'application/x-www-form-urlencoded', // 默认值
			},
			success: (res) => {
				console.log(res);
				resolve(res.data)
			},
			fail: (res) => {
				uni.hideLoading();
				console.log(res);
				uni.showToast({
					title: '请求失败，请重试!',
					duration: 3000
				})
				reject("err");
			},
			complete: (res) => {
				uni.hideLoading();
			}
		});
	})
}

function upCloudImage(res) {
	uniCloud.uploadFile({
		filePath: res.tempFilePaths[0],
		cloudPath: new Date().getTime() + res.tempFiles[0].name,
		onUploadProgress: function(progressEvent) {
			console.log(progressEvent);
			let percentCompleted = Math.round(
				(progressEvent.loaded * 100) / progressEvent.total
			);
		},
		success(res) {
			console.log(res);
			return res.fileID;
		},
		fail(err) {
			console.log(err)
		},
		complete() {
			uni.hideLoading();
		}
	})
}


export default {
	account,
	post,
	toast,
	exam,
	examconf,
	questiontest,
	download,
	upost,
	accountno,
	systeminfo,
	news,
	videolist,
	newsshuffle,
	cloudFunction,
	getUser
}
