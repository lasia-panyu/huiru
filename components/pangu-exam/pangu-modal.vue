<template>
	<view>
		<view :class="[value? 'show': '']" class="yy-modal" id="show" @click="closeModal">
			<div @click.stop class='content'>
				<slot></slot>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			};
		},
		props:{
			value: {
				type: [Boolean, String],
				default: false
			}
		},
		watch: {
			value(val) {
				if (val) {
					this.show = val
				} else {
					this.handleHidden()
				}
			}
		},
		methods:{
			closeModal(e){
				this.$emit('input', false)
			},
			handleHidden(){
				setTimeout(()=> {
					this.show = false
				}, 300)
			}
		}
	}
</script>

<style scoped lang="scss">
.yy-modal{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	opacity: 0;
	transform: scale(1.185);
	pointer-events: none;
	transition: all 0.3s ease-in-out 0s;
	background: rgba(0,0,0,0.6);
}
.show{
	opacity: 1;
	transition-duration: 0.3s;
	transform: scale(1);
	overflow-x: hidden;
	overflow-y: auto;
	pointer-events: auto;

}
.content{
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	border-radius: 15rpx;
	overflow: hidden;
}

</style>
