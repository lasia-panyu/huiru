<template>
<!--  <view class="hm-sms-list-card">
   <view class="box"  v-for="(item,index) in lists" :key="item[keys[0]]">
   <image class="xueshengdangan" :src="options.xueshengdangan" />
    <image class="primary" src="/static/images/ad1.jpg" />
      <view class="sub">
        <view class="outer">
          <view class="wrap">
            <text class="paybak">{{ item[keys[0]] }}</text>
           <text class="company">{{ item[keys[1]]}}</text>
          </view>
          <text class="txt">{{item[keys[2]]}}</text>
        </view>
        <view class="block">
          <text class="desc">{{item[keys[3]]}}</text>
        </view>
      </view>
	       <image class="side" :src="options.side" :onclickf="onclickf"/>

    </view>
  </view> -->
  <view>
  	<view class="item" v-for="(item, index) in lists" :key="item[keys[0]]"  >
  		<view class="top">
  			<view class="name">{{ item[keys[0]] }}</view>
  			<view v-if="item[keys[1]]" class="phone">{{ item[keys[1]] }}</view>
  			<view class="tag">
  				<text  :class="{red:item.flag}">{{item[keys[2]]}}</text>
  			</view>
  		</view>
  		<view class="bottom">
  			{{item[keys[3]]}}
  			<u-icon v-if="clickflag"  name="edit-pen":size="80" color="#999999"  @click="handleSubmit(item)"></u-icon>
  		</view>
  	</view>
  </view>

</template>
<script>
export default {
  props: {
    title:String,
	lists:Array,
	keys:Array,
	clickflag:"",
  },
  data() {
    return {};
  },
  methods: {  
	handleSubmit(item){
		console.log(item)
		this.$emit("handleSubmit",item)
	},
  }
};
</script>


<style lang="scss" scoped>
.item {
	padding: 40rpx 20rpx;
	.top {
		display: flex;
		font-weight: bold;
		font-size: 34rpx;			
		.name{
			width: 70%;
		}
		.phone {
			margin-left: 60rpx;
		}
		.tag {
			display: flex;
			font-weight: normal;
			align-items: right;
			text {
				display: block;
				width: 100%;
				height: 34rpx;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 20rpx;
				border-radius: 6rpx;
				text-align: center;
				margin-right: 30rpx;
				background-color:rgb(49, 145, 253);
			}
			.red{
				background-color:red
			}
		}
	}
	.bottom {
		display: flex;
		margin-top: 20rpx;
		font-size: 28rpx;
		justify-content: space-between;
		color: #999999;
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 600rpx;
	line-height: 100rpx;
	position: absolute;
	bottom: 30rpx;
	left: 80rpx;
	background-color: red;
	border-radius: 60rpx;
	font-size: 30rpx;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 10rpx;
		}
	}
}
</style>
