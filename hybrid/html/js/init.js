let result = {
	confirm: 0,
	suspect: 0,
	dead: 0,
	heal: 0,
	children: []
};

function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}
$.ajax({
	url: 'https://jk.avuejs.com/news?name=辽宁省',
	dataType: 'json',
	success: (data) => {
		let str = '';
		data.forEach(ele => {
			str = str +
				`
							<div style="margin-top:20px;background-color:#fff;padding:10px 30px;border-radius:10px;overflow:hideen;">
								<a href="${ele.sourceUrl}" style="color:#333;text-decoration:none;">
									<span style="font-size:24px;">${dateFormat("YYYY-mm-dd HH:MM",new Date(ele.pubDate))}</span>
									<h3 style="font-size:40px;margin:20px 0 20px 0;">${ele.title}</h3>
									<p style="color: #999;font-size:28px;line-height:40px;">${ele.summary}</p>
									<p style="text-align:right;font-size:24px;">信息来源:${ele.infoSource}</p>
								</a>
							</div>
						`
		})
		$('#dt').html(str);
	}
})
$.ajax({
	url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
	dataType: 'jsonp',
	scriptCharset: 'UTF-8',
	jsonp: 'callback',
	success: (res) => {
		let list = JSON.parse(res.data).areaTree[0].children;
		let number = list.findIndex(ele => ele.name === '辽宁');
		let data = list[number].children;
		let str = '';
		data.forEach(item => {
			const ele = item.total;
			result.confirm = result.confirm + ele.confirm;
			result.suspect = result.suspect + ele.suspect;
			result.dead = result.dead + ele.dead;
			result.heal = result.heal + ele.heal;
			str = str +
				`
						<div class="infoItem">
							<span class="name">${item.name}</span>
							确诊<span class="confirm">${ele.confirm}</span>例<span class="hide">，
							治愈<span>${ele.heal}</span>例</span><span class="hide">，
							死亡<span>${ele.dead}</span>例</span>
						</div>`
			if (item.name === '阜新') {
				$('#count11').html(ele.confirm);
				$('#count21').html(ele.suspect);
				$('#count31').html(ele.heal);
				$('#count41').html(ele.dead);
			}
			result.children.push(ele)

		})
		$('#list').html(str)
	}
})
$('#wechatbox').hide();
$('#wechat').click(() => {
	$('#wechatbox').show();
})
$('#wechatbox').click(() => {
	$('#wechatbox').hide();
})

setTimeout(()=>{
	var swiper = new Swiper('.swiper-container', {
		loop: true,
		slidesOffsetBefore: 64,
		width: 622,
		spaceBetween: 20,
		autoplay: false,
		speed: 100,
		pagination: {
			el: '.swiper-pagination',
			bulletClass: 'my-bullet',
			bulletActiveClass: 'my-bullet-active',
			clickable: true,
		},
	})
},500)
