<template>
	<view style="width: 750rpx;">
		<template v-if="!state.error">
			<uni-load-more v-if="state.loading||state.pagination.current!=1||state.data.length!=0" :status="state.loading?'loading':(state.hasMore?'hasMore':'noMore')"></uni-load-more>
			<text class="noData" v-else>暂无数据</text>
		</template>
		<view v-else>
			<view class="box" v-if="networkType == 'none'">
				<image class="icon-image" src="@/static/uni-load-state/disconnection.png" mode="widthFix"></image>
				<text class="tip-text">网络异常</text>
				<view class="btn btn-default" @click="openSettings">
					<text class="btn-text">前往设置</text>
				</view>
			</view>
			<text class="err" v-else>错误：{{JSON.stringify(state.error)}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uni-load-state",
		data() {
			return {
				"networkType": ""
			};
		},
		props: {
			state:{
				type: Object,
				default(){
					return {
						"loading":true,
						"hasMore":false,
						"pagination":{"pages":0},
						"data":[],
						"error":{}
					}
				}
			}
		},
		mounted() {
			uni.onNetworkStatusChange(({
				networkType
			}) => {
				if(this.networkType == 'none' && networkType != 'none'){ //之前没网现在有了
					this.$emit('networkResume')
				}
				this.networkType = networkType;
			});
			uni.getNetworkType({
				success: ({
					networkType
				}) => {
					this.networkType = networkType;
				}
			});
		},
		methods:{
			openSettings(){
				if (uni.getSystemInfoSync().platform == "ios") {
					var UIApplication = plus.ios.import("UIApplication");
					var application2 = UIApplication.sharedApplication();
					var NSURL2 = plus.ios.import("NSURL");
					var setting2 = NSURL2.URLWithString("App-prefs:root=General");
					application2.openURL(setting2);
					plus.ios.deleteObject(setting2);
					plus.ios.deleteObject(NSURL2);
					plus.ios.deleteObject(application2);
				} else {
					var Intent = plus.android.importClass("android.content.Intent");
					var Settings = plus.android.importClass("android.provider.Settings");
					var mainActivity = plus.android.runtimeMainActivity();
					var intent = new Intent(Settings.ACTION_SETTINGS);
					mainActivity.startActivity(intent);
				}
			}
		}
	}
</script>

<style scoped>
	.box{
		flex: 1;
		margin:100rpx 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.icon-image{
		width: 300rpx;
	}
	.tip-text{
		color: #999999;
		font-size: 32rpx;
		margin-bottom: 30rpx;
	}
	
	.btn {
		padding: 5px 10px;
		width: 128px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.btn-text {
		color: #999999;
		font-size: 15px;
	}

	.btn-default {
		border-color: #999999;
		border-style: solid;
		border-width: 1px;
		border-radius: 3px;
	}
	
	.noData{
		text-align: center;
		padding: 30rpx;
	}
	.err{
		width: 750rpx;
		color: #DD524D;
	}
</style>
