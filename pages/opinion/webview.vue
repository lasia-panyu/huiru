<template>
	<web-view :src="url" ></web-view>
</template>

<script>
    export default {
        data() {
            return {
                url:'',
                title:''
            }
        },
        onLoad(res) {
			console.log(res.url)
            this.url = decodeURIComponent(res.url);
			console.log(this.url)
        },
		onReady(){
            uni.setNavigationBarTitle({
                title:this.title
            })
        }
    }
</script>
