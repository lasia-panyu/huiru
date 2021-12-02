<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<!-- 	<view class="u-demo-title">{{title[current]}}</view> -->
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>

				<u-grid :col="col" @click="click" v-if="!isSwiper" :border="border">
					<!-- 		<u-grid-item v-for="(item,index) in menuList" v-bind:key="item.title" :index="item.page">
						<image src="https://cdn.uviewui.com/uview/grid/hot6.png" style="width: 44rpx;height: 44rpx;top:0;right:0;" class="badge-icon"></image>	
						<u-icon :name="item.cusicon" :size="70"/>
						<view class="grid-text" :value="item.title" >
							{{item.title}}
						</view>
					</u-grid-item> -->

					<!-- 		<u-grid-item name="item1" :index="0" @click="itemClick">
						<u-badge count="9" :offset="[col == 3 ? 20 : 14, col == 3 ? 30 : 20]"></u-badge>
						<u-icon name="photo" :size="46"></u-icon>
						<view class="grid-text">图片</view>
					</u-grid-item>
					<u-grid-item :index="2">
						<image src="https://cdn.uviewui.com/uview/grid/hot5.png" :style="{
							top: col == 3 ? '14rpx' : '8rpx',
							right: col == 3 ? '40rpx' : '28rpx'
						}" style="width: 34rpx;height: 34rpx;" class="badge-icon" mode="widthFix"></image>
						<u-icon name="hourglass" :size="46"></u-icon>
						<view class="grid-text">沙漏</view>
					</u-grid-item> -->
				</u-grid>
				<swiper class="swiper" v-else @change="change">
					<swiper-item>
						<unicloud-db ref="menudb" v-slot:default="{data, loading, error, options}"
							collection="opendb-app-menus" where="enable==true && parent_id=='menu'" orderby="sort asc">
							
							<u-grid :border="border" :col="col"  hover-class="hover-class"  >
								<block v-for="(item,index) in data"  v-bind:key="item._id" :index="item.menu_id" >
									<block >
										<u-grid-item  @click="click(item.menu_id)" v-if="isPermissionMenu(item)" >
											<!-- <image src="https://cdn.uviewui.com/uview/grid/hot6.png" style="width: 44rpx;height: 44rpx;top:0;right:0;" class="badge-icon"></image>	
										 -->
											<!-- {{item}} -->
											<u-icon :name="item.url.url" :size="70" />
											<view class="grid-text" :value="item.name">
												{{item.name}}
											</view>
										</u-grid-item>
									</block>
								</block>				
							</u-grid>
						</unicloud-db>
					</swiper-item>
					<swiper-item>
						<unicloud-db ref="menudb1" v-slot:default="{data, loading, error, options}"
							collection="opendb-app-menus" where="enable==true && parent_id=='menu1'" orderby="sort asc">
							<u-grid :border="border" :col="col"  hover-class="hover-class"  >
								<block v-for="(item,index) in data"  v-bind:key="item._id" :index="item.menu_id" >
									<block >
										<u-grid-item  @click="click(item.menu_id)" v-if="isPermissionMenu(item)" >
											<!-- <image src="https://cdn.uviewui.com/uview/grid/hot6.png" style="width: 44rpx;height: 44rpx;top:0;right:0;" class="badge-icon"></image>	
										 -->
											<!-- {{item}} -->
											<u-icon :name="item.url.url" :size="70" />
											<view class="grid-text" :value="item.name">
												{{item.name}}
											</view>
										</u-grid-item>
									</block>
								</block>				
							</u-grid>
						</unicloud-db>
					</swiper-item>
					<!-- <swiper-item>
						<u-grid :border="border" :col="col" @click="click">
							<u-grid-item v-for="(item, index) in list" :index="index + 18" :key="index">
								<u-icon :name="item" :size="46"></u-icon>
								<text class="grid-text">{{ '宫格' + (index + 1) }}</text>
							</u-grid-item>
						</u-grid>
					</swiper-item> -->
				</swiper>

				<view class="indicator-dots" v-if="isSwiper">
					<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
					</view>
					<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
					</view>
					<!-- <view class="indicator-dots-item" :class="[current == 2 ? 'indicator-dots-active' : '']">
					</view> -->
				</view>
			</view>
		</view>

		<view class="u-config-wrap" hidden="true">
			<view class="u-config-title u-border-bottom">
				参数配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">是否显示边框</view>
				<u-subsection :list="['是', '否']" @change="borderChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">是否可滑动</view>
				<u-subsection current="1" :list="['是', '否']" @change="isSwiperChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">修改列数</view>
				<u-subsection :list="['3', '4']" @change="colChange"></u-subsection>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				title: ['考试模块', '舆情模块'],
				list: ['integral', 'kefu-ermai', 'coupon', 'gift', 'scan', 'pause-circle', 'wifi', 'email', 'list'],
				menuList: [{
						cusicon: '/static/images/icon/xuexi.png',
						icon: 'file-text',
						title: '在线学习',
						page: '/pages/exam/examtestselect'
					},
					{
						cusicon: '/static/images/icon/kaoshi.png',
						icon: 'file-text-fill',
						title: '在线考试',
						page: '/pages/exam/examselect'
					},
					{
						cusicon: '/static/images/icon/chengji.png',
						icol: 'checkmark',
						title: '我的成绩',
						page: '/pages/exam/grade'
					},
					{
						cusicon: '/static/images/icon/examset.png',
						icon: 'checkmark',
						title: '考试管理',
						page: '/pages/exam/examset'
					},
					{
						cusicon: '/static/images/icon/plague.jpg',
						icon: 'file-text-fill',
						title: '疫情动态',
						page: '/pages/plague/query'
					},

					// {cusicon:'/static/images/icon/va.jpg',icon:'file-text-fill',title:'疫苗预约',page:'/pages/fuyin_va/index'},
					{
						cusicon: '/static/images/icon/return.jpg',
						icon: 'file-text-fill',
						title: '返乡登记',
						page: '/pages/fuyin_returnees/add'
					},
					{
						cusicon: '/static/images/icon/examset.png',
						icon: 'checkmark',
						title: '数据查看',
						page: '/pages/common/webview/webview?url=https://fuyin.fuxinbank.com:10054/fuyin/gr'
					},
					{
						cusicon: '/static/images/icon/examset.png',
						icon: 'checkmark',
						title: '我要直播',
						page: '/pages/livebroadcast/push_config'
					},
					{
						cusicon: '/static/images/icon/examset.png',
						icon: 'checkmark',
						title: '观看直播',
						page: '/pages/livebroadcast/TV/index'
					},
					{
						cusicon: '/static/images/icon/examset.png',
						icon: 'checkmark',
						title: '投票',
						page: '/pages/activity/vote'
					}

				],
				menuList1: [
					// {cusicon:'/static/images/icon/yuqing.jpg',icon:'file-text',title:'舆情查看',page:'/pages/opinion/opinion'},

					// {cusicon:'/static/images/icon/yuqing.jpg',icon:'file-text-fill',title:'关键词管理',page:'/pages/opinion/category'},		
					// 	{cusicon:'/static/images/icon/yuqing.jpg',icon:'file-text-fill',title:'短视频',page:'/pages/video/shortvideo'}
				],
				isSwiper: true,
				current: 0,
				border: false,
				col: 4
			};
		},
		async mounted(){
	       let userInfo = await this.$store.dispatch("user/getUser");
		   this.userInfo=userInfo;
		   console.log(userInfo);
		},
		methods: {
			isSwiperChange(index) {
				console.log(index)
				this.isSwiper = index == 0 ? true : false;
			},
			borderChange(index) {
				this.border = index == 0 ? true : false;
			},
			isPermissionMenu(item){
				let permission=item.permission
				console.log(item);
				if(!permission||permission.length==0){
					 console.log(true)
					 return true;
				}
				for(let index in permission){
					for(let x in this.userInfo.role){
						if (this.userInfo.role[x]==permission[index]||'admin'==this.userInfo.role[x]){
							console.log(true)
							return true;
						}		
					}
				}
				return false;
			},
			colChange(index) {
				this.col = index == 0 ? 3 : 4;
			},
			click(index) {
				console.log(index)
				// this.$refs.uToast.show({
				// 	title: `点击了第${index + 1}宫格`,
				// 	type: 'warning'
				// })
				this.$u.route(index)
			},
			change(e) {
				console.log(e.detail.current)
				this.current = e.detail.current;
			},
			// 针对单个grid-item的事件
			itemClick(index) {
				// console.log(index);
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../common/demo.scss";

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.badge-icon {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
	}

	.swiper {
		height: 480rpx;
	}

	.indicator-dots {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.indicator-dots-item {
		background-color: $u-tips-color;
		height: 6px;
		width: 6px;
		border-radius: 10px;
		margin: 0 3px;
	}

	.indicator-dots-active {
		background-color: $u-type-primary;
	}
</style>
