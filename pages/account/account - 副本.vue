<template>
<view>
	<view>
	<!-- 	<u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar> -->
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic"  size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{account.name}} 
				<block v-if="account.role==1">
					<image style="width: 50rpx;height: 25rpx;margin-bottom: 10upx;margin-left: 5upx;" src="../../static/image/vip.png"></image>					
				</block>			
				</view> 
				<view class="u-font-14 u-tips-color">账号:{{account.id}}</view>
			</view>
			<!--
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
			-->
		</view>
		

			<view class="u-m-t-20" >
					<!-- <u-cell-group>
						<block v-for="(value, key) in account" :key="key">
						<u-cell-item v-if="value" icon="account" :title="value"></u-cell-item>
						</block>
					</u-cell-group> -->
                    <u-cell-group title="账户信息">
						<u-cell-item :border-bottom="false" icon="account"  title="手机号" :value="account.phone" :arrow="false"></u-cell-item>			
						<!--<u-icon slot="icon" size="34" name="calendar" style="margin-right: 5px;"></u-icon>
						<u-icon slot="right-icon" size="34" name="calendar"></u-icon>
						<u-field slot="value"></u-field>-->
	                   <u-cell-item :border-bottom="false" icon="account"  title="身份证号" :value="account.id_num" :arrow="false">	</u-cell-item>			
	                   <u-cell-item :border-bottom="false" icon="account"  title="机构" :value="account.dept" :arrow="false">	</u-cell-item>			
	                   <u-cell-item :border-bottom="false" icon="account"  title="地区" :value="account.zoneno_name" :arrow="false">	</u-cell-item>							
				    </u-cell-group>
			</view>


		
		<view class="u-m-t-20">
			<u-cell-group>
			<!-- 	<u-cell-item icon="setting" title="修改个人信息" @tap="setting"></u-cell-item> -->
				<u-cell-item icon="setting" title="退出" @tap="exit"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
    <pangu-nav ></pangu-nav>
 <!--   <u-tabbar :list="list"></u-tabbar> -->
</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://fuyin.fuxinbank.com:10054/newsPaper/221.png',
				show:true,
				account:this.$util.account
			}
		},
		onLoad() {
			this.list=[{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 0,
						isDot: false,
						customIcon: false,
						url:'pages/index/content',
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 0,
						isDot: false,
						customIcon: false,
						url:'pages/account/account',
					},
				];
		},
		methods: {
			setting(){
				console.log('111111');
				this.$u.route('/pages/account/setting');
			},
			exit(){
				this.$util.account=null;
			 	this.$util.exam=null;
				this.$util.examconf=null;
				this.$util.examsessions=null;			
				this.$u.route({type:'redirect',url:'/pages/login/login'});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
