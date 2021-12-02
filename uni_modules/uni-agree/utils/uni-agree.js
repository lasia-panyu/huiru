export default function(){
	console.log(uni.getSystemInfoSync().platform)
	let userprotocol = uni.getStorageSync('userprotocol');
	console.log('userprotocol',userprotocol);
	if(!userprotocol){
		uni.navigateTo({
			url:'uni_modules/uni-agree/pages/uni-agree/uni-agree',
			animationType:"none"
		})
	}
}