<template>
	<view id="news_page" :style="styleP">
		<view id="tarbar" style="width: 100%;height: 5%;position:fixed;z-index: 999;">
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>
  
		<view id="news" :style="style">
			<swiper style="height: 100%;" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(itemNews, index) in list" :key="index">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<fuyin-advert style="margin-top: 15px;"></fuyin-advert>
					<!-- 	:where="`category_id=='${itemNews._id}'`" -->
						<unicloud-db :ref="'udb'+index" v-slot:default="{data, pagination, loading, hasMore, error, options}"
							collection="opendb-news-articles" :where="`category_id=='${itemNews._id}' && /${where}/i.test(title)`" page-data="add"
							:page-current=currentPages[index] :page-size=10 getcount="true" orderby="is_sticky desc,publish_date desc">
							<!-- :where="`category_id=='${itemNews._id}'`" -->
							<view v-if="error">{{error.message}}</view>
							<view v-else v-for="(item, index) in data" :key="index" @click="navToDetails(item)"
								style="border-color: #E4E7ED;  border-bottom-style:solid;">
								<view :class="'news-item'+item.mode">
									<text :class="['title', 'title'+item.mode]">{{item.title}}</text>
									<view v-if="item.imgPath.length > 0"
										:class="['img-list', 'img-list'+item.mode, item.imgPath.length === 1 && item.mode===3 ? 'img-list-single': '']">
										<view v-for="(imgItem, imgIndex) in item.imgPath" :key="imgIndex"
											style="border-radius: 10px;"
											:class="['img-wrapper', 'img-wrapper'+item.mode, item.imgPath.length === 1 && item.mode===3 ? 'img-wrapper-single': '']">
											<!-- <image class="img" src="../../static/icon/nav.png"></image> -->

											<u-image class="img" :src="imgItem" mode="aspectFill" style="width: 100%;">

											</u-image>


											<view class="video-tip" v-if="item.imgPath.length === 1 && item.mode===3 ">
												<image style="z-index: 999;" class="video-tip-icon"
													src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEC0lEQVRoQ+2ajVEVMRDHdzuwA6ACpQKxArECtQKxAqECoQKhAqECoQKxAqEDrWCdn7Nx8vJy+bp3T4YhM2+O8S7J/rO7//2IKo9k6CPBIU9Acpo0s10ReSkiPA8mtH0tIncicqOqPDcyZmvEhX8rIu8cQI9gtyJyKSIXc0ENA3EAnxxAj/BT356LyEdV/TWyWDcQM3smIgA4mtjwXkQ4aX4Mngj3QkSYy5PfTmb+laoeLg7EzBDga8aEEB4TOVfVAKAoj2sUc+QXQC0PxMzY8Esi3W8ROVbV05FTDHPMDC1AEBzEcqY1AeLMQQxtXANuZvjMa/cb/i6Oqo9kQKCFI1WtLl7bfOq9mUHd3/w9ND1F5f+WKAJxn/gebQiIg1Y/mAEEUsDX8J0zVZ0iljoQZydAYLuMrYCIwXOQrYc2qREzw4E/RAu/X9KcRrUX5mWBODX+jBY/UdXjuZuNznd5PnscepNjtikgODJpRzCp3VFaHBU+MTEOkSDMIJ0hFKyMNSAZbZA2NMUJn7ujqjebABDWyDDnXpqb5YDEvnGvqsHZi7I5CMgBxiHDxRx5bmSYGZlyyADWmCwHBN8IwjdRH5Im3B+En5UIJuYFBeMnjFtV3Y/frwDJmNV+K/1NAGEvIv+pqp7MUU1GthXzSoHE+VSzWRU0EsuOaUDhw+aWmNdKOEiBxOzQlYkWNJIqAiAI0V0dmhkZNvkXYyUkpEDYhFJ17cOaWXQACUtxaPhgc9JpZvFBr+Rg/xNI8B+0w0lXR0LDzUCIoE0bNPpISdC1uJD7uJQVlzTyEIFQgFGhMpo10pVfDfgIwlAiU9s0af4h+gglARkE8WURZ98G/V65Fhal3zgg3qnqXpVK/IMG0/rhAOYExDh9KgZEcqy4DtlEirKpTgutqLjsnk5RnEaLWeaUhiY0srFOS1KxrqVPtTS+2by8xsdsnkONNN5G0pDCQcVmtcaoLYVVV63e0zDo8L+0OVgvrNy84lIXemRiM022CtjynWsabVCwMdpKXQeSOlZXcGwRsPWbJAgyLZvOPOh2UKZWn6xYS0Dibl/IVF+1VoytJ15wbqyCtmkwKdIZGnZZE+9tmbLI4mC8VRuDAG8xpo00sQFDi2iRJrabU2jGBYVVmbMKxJ0/dzfSXeGVzM3ZiRZt2tGsgmDdJiAFMGiHNPxijk+YGV1NsuHgD82aCB82A4lomdohvf8jrQm3s61XbzgzAMJtVXwWOPZhD7F0AXEwnBrqjzv1sRCACnfp/HvIdsNlTbiDn+pgDuVn3UCCxN4wA1Bods+xrr8R26/yuuuULh8p8D0nSzsTE8ldOZcAhttgKsUhAEM+Ujty1xIm1PJfOK7nCh/LM2xaNVDbfv8EZNsnXtvvDyrmF1FIBKIwAAAAAElFTkSuQmCC">
												</image>

											</view>

										</view>
									</view>
									<!-- 空图片占位 -->
									<!-- <view v-else class="img-empty"></view> -->
									<!-- <view :class="['bot', 'bot'+item.mode]">
								</view> -->
								</view>
								<view style="display: flex;flex-direction: row;width: 750upx;padding: 11px 14px;">
									<view style="width: 50%;text-align: start;display: flex;flex-direction: row;">

										<view class="author" style="flex-direction: row;">
									<block v-if="item.is_sticky">
										<text style="color: #DD524D;">[置顶]</text>
									</block>
									{{item.brief.name}}
										</view>
									</view>

									<view class="time" style="width: 50%;text-align: end;">
										<uni-dateformat :date="item.publish_date" format="yyyy-MM-dd"
											:threshold="[60000, 2592000000]" />
									</view>

								</view>

							</view>
							<uni-load-more v-if="!hasMore" status="noMore"></uni-load-more>
							<uni-load-more v-else-if="hasMore||loading" status="loading" style="background-color: #E4E7ED;"></uni-load-more>
						</unicloud-db>
					</scroll-view>
				</swiper-item>
			</swiper>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				newsList: [],
				style: {},
				styleP: {},
				currentPages: [1, 1, 1, 1],
				where:"."
			};
		},
		onReady() {

		},
		async mounted() {
			this.styleP = {
				"height": uni.getStorageInfoSync().screenHeight + "px",
			};
			uni.createSelectorQuery().in(this).select("#tarbar").boundingClientRect(
				data => {
					this.style = {
						"height": +(uni.getSystemInfoSync().screenHeight - data.height) + "px",
						"margin-top":"8%"
					};
				}).exec();
				
			const db = uniCloud.database();
			const collection = db.collection('opendb-news-categories');
			let result = await collection.get();
			this.list = result.result.data;
			
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				// console.log(this.list[this.swiperCurrent]._id);
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				this.$forceUpdate()
				this.currentPages[this.swiperCurrent] += 1;
			},
			navToDetails(detail) {
				// console.log(this.newList);
				this.$emit("navToDetails", detail);
			},
			search(searchtext){
				console.log(searchtext);
				console.log(this.current)
				this.where=searchtext;
				console.log(this.$refs);
				this.$nextTick(()=>{
					console.log("udb"+this.current);
				    this.$refs["udb"+this.current].loadData({
				      clear:true
				    })  
				})  
			}
		}
	};
</script>
<style lang='scss'>
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 50%;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 35upx;
			font-weight: bold;
			color: #303133;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 50%;
			}
		}
	}

	.swiper-box {
		height: 100%;
	}

	.panel-scroll-box {
		height: 100%;

		.panel-item {
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}

	/**
	 * 新闻列表 直接拿的nvue样式修改，,
	 * 一共需要修改不到10行代码, 另外px需要直接修改为upx，只有单位不一样，计算都是一样的
	 * 吐槽：难道不能在编译的时候把nuve中的upx转为px? 这样就不用修改单位了
	 */
	.video-wrapper {
		width: 100%;
		height: 440upx;

		.video {
			width: 100%;
		}
	}

	view {
		display: flex;
		flex-direction: column;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.news-item3 {
		width: 750upx;
		padding: 24upx 30upx;
		border-bottom-width: 1px;
		border-color: #eee;
		background-color: #fff;

	}

	.news-item2 {
		width: 750upx;
		padding: 24upx 30upx;
		border-bottom-width: 1px;
		border-color: #eee;
		background-color: #fff;
		height: 100px;
		display: flex;
		flex-direction: row;
	}

	.news-item1 {
		width: 750upx;
		padding: 24upx 30upx;
		border-bottom-width: 1px;
		border-color: #eee;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		height: 100px;
		flex-flow: row-reverse !important;
	}

	.news-item0 {
		width: 750upx;
		padding: 24upx 30upx;
		border-bottom-width: 1px;
		border-color: #eee;
		background-color: #fff;
		/* height: 100px; */
	}

	/* 修改结束 */

	/* 新闻列表  emmm 仅供参考 */
	.news-item {
		width: 750upx;
		padding: 24upx 30upx;
		border-bottom-width: 1px;
		border-color: #eee;
		background-color: #fff;
	}

	.title {
		font-size: 32upx;
		color: #303133;
		line-height: 46upx;
	}

	.title0 {
		width: 100%;
	}

	.bot {
		flex-direction: row;
	}

	.author {
		font-size: 26upx;
		color: #aaa;
	}

	.time {
		font-size: 26upx;
		color: #aaa;
		margin-left: 20upx;
	}

	.img-list {
		flex-shrink: 0;
		flex-direction: row;
		background-color: #fff;
		width: 220upx;
		height: 140upx;
	}

	.img-wrapper {
		flex: 1;
		flex-direction: row;
		height: 140upx;
		position: relative;
		overflow: hidden;
	}

	.img {
		flex: 1;
	}

	.img-empty {
		height: 20upx;
	}

	/* 图在左 */
	.img-list1 {
		/* position: absolute; */
		/* 	left: 30upx;
		top: 24upx; */
	}

	.title1 {
		padding-left: 20px;
		width: 70%;
	}

	.title2 {
		padding-right: 0upx;
		width: 70%;
	}

	.bot1 {
		padding-left: 240upx;
		margin-top: 20upx;
	}

	/* 图在右 */
	.img-list2 {
		/* 	position: absolute;
		right: 30upx;
		top: 24upx; */
	}



	.bot2 {
		margin-top: 20upx;
	}

	/* 底部3图 */
	.img-list3 {
		width: 700upx;
		margin: 16upx 0upx;
	}

	.img-wrapper1 {
		margin-left: 0upx;
		justifyContent: flex-end;
		width: 30%;
	}

	.img-wrapper2 {
		margin-right: 0upx;
		justifyContent: flex-end;
		width: 30%;
	}

	.img-wrapper3 {
		margin-right: 4upx;
	}

	/* 底部大图 */
	.img-list-single {
		width: 690upx;
		height: 240upx;
		margin: 16upx 0upx;
	}

	.img-wrapper-single {
		height: 240upx;
		margin-right: 0upx;
	}

	.video-tip {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .3);
	}

	.video-tip-icon {
		width: 60upx;
		height: 60upx;
	}
</style>
