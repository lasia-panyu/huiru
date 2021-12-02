import uniImageMenu from './uni-image-menu.js';
export default async (param,callback) => {
	var menus = []
	plus.share.getServices(services => { //只显示有服务的项目
		services = services.filter(item=>item.nativeClient)
		// console.log("servicesList",services);
		let servicesList = services.map(e => e.id)
		param.menus.forEach(item => {
			if (servicesList.includes(item.share.provider) || typeof(item.share) == 'string') {
				menus.push(item)
			}
		})
		console.log(menus);
		uniImageMenu.show({list:menus,cancelText:param.cancelText}, e => {
			console.log(e);
			if (typeof(menus[e]['share']) == 'string') {
				eval(menus[e]['share']+'()')
			} else {
				console.log(9527,{
					...param.content,
					...menus[e].share,
				});
				uni.share({
					...param.content,
					...menus[e].share,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
						uni.showModal({
							content: JSON.stringify(err),
							showCancel: false,
							confirmText:"知道了"
						});
					},
					complete(e) {
						uniImageMenu.hide()
						callback(e)
					}
				})
			}
		})
		
	}, err => {
		uni.showModal({
			title: '获取服务供应商失败：' + JSON.stringify(err),
			showCancel: false,
			confirmText: '知道了'
		});
		console.error('获取服务供应商失败：' + JSON.stringify(err));
	})

	function copyurl() {
		uni.setClipboardData({
			data: param.content.href,
			success: function () {
				console.log('success');
				uni.hideToast()//关闭自带的toast
				uni.showToast({
					title: '复制成功',
					icon: 'none'
				});
			},
			fail: (err) => {
				uni.showModal({
					content: JSON.stringify(err),
					showCancel: false
				});
			}
		});
	}
	// 使用系统分享发送分享消息 
	function shareSystem() {
		plus.share.sendWithSystem({
			type: 'text',
			content: param.content.title + param.content.summary || '',
			href: param.content.href,
		}, function(e) {
			console.log('分享成功');
			callback(e)
		}, function(e) {
			console.log('分享失败：' + JSON.stringify(e));
			callback(e)
		});
	}
}