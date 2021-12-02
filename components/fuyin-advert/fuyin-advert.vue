<template>
		<view >
			<unicloud-db v-slot:default="{data, pagination, loading, hasMore, error, options}"
				@load="handleLoad" collection="opendb-news-articles" where="is_essence==true" 
				orderby="publish_date desc">
			          <u-swiper height="300" mode="number" indicator-pos="topRight" :title="true" :list="data" @click="advertClick" ></u-swiper>
			</unicloud-db>			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				news:[]
			};
		},
		methods: {	
			advertClick(index){
		       console.log(index);
		       this.$util.news=this.news[index];
		       uni.navigateTo({
		       	url: `/pages/news/newsdetails`
		       })
			},
			handleLoad(data, ended, pagination) {
			  // `data` 当前查询结果
			  // `ended` 是否有更多数据
			  // `pagination` 分页信息 HBuilderX 3.1.5+ 支持
			  console.log(data);	  
			  for(let index in data){
				  data[index].image=data[index].imgPath[0];
			  }
			  this.news=data;
			  console.log(data);
			}
		}
	};
</script>

<style>
</style>
