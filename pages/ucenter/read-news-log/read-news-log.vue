 <template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :where="udbWhere"
			collection="opendb-news-articles" @load="isLoading == false" @error="isLoading == false" :page-size="10">
			<uni-list>
				<uni-list-item v-for="(item, index) in data" :key="index" :clickable="true"
					@click="handleItemClick(item)">
					<view slot="body">
						<text>{{item.title}}</text>
						<uni-dateformat class="article-date" :date="readNewsLog[index].last_time" format="yyyy-MM-dd hh:mm"
							:threshold="[0, 0]" />
					</view>
				</uni-list-item>
			</uni-list>
			<uni-load-state @networkResume="refreshData" :state="{data,pagination,hasMore, loading, error}"></uni-load-state>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: true,
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: '',
				},
				readNewsLog:[],
				udbWhere:''
			}
		},
		async onLoad() {
			let user=await this.$store.dispatch("user/getUser");
			let result= await this.$util.cloudFunction("news","logs",{"user_id":user._id});				
			this.readNewsLog = result;
			let readNewsLogIds = this.readNewsLog.map(({article_id})=>article_id)
			this.udbWhere = `"_id" in ${JSON.stringify(readNewsLogIds)}`;
			console.log(this.udbWhere);
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			refreshData() {
				this.$refs.udb.loadData({
					clear: true
				}, (res) => {
					console.log(res);
					uni.stopPullDownRefresh()
				})
			},
			handleItemClick(item) {
				console.log(item);
				this.$util.news=item;
				uni.navigateTo({
					url: `/pages/news/newsdetails`
				})
			}
		}
	}
</script>

<style>
	.article-date {
		color: #C8C7CC;
	}
</style>
