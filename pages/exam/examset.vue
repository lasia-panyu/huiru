<template>
	<view>
		<pangu-advert ></pangu-advert>
		<view v:if="examsessions">
		<view class="marg">
		<u-toast ref="uToast" />
		</view>
	    <pangu-card :lists="examsessions" :keys="keys" :title="title" clickflag=true
		 v-on:handleSubmit='handleSubmit'>	
	    </pangu-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				plain:false,
				ripple:true,
				title:"考试场次",
				examsessions:[],
				keys:['s_id','','statu','s_desc'],
				userInfo:{}
		    }	
		},	
		async onLoad() {
		  this.reload();	
		  //  console.log(this.$util.examsessions);
		  //  console.log(this.examsessions);
		},
		
		methods: {
			click(){			
			},
			async reload(){
			    this.userInfo=await this.$util.getUser(this);
				let result=await this.$util.post("UnEndScene",{teacher_id:this.userInfo._id	});
				 // this.examsessions=result;
				 console.log(result);
				//  let result=this.$util.examsessions;
				 this.examsessions=result.map(
				   x=>{			
								x['flag']=x['status']==1?false:true;
								x['statu']=x['status']==1?"已完成":"未完成";
								x['s_desc']=x['status']==1?"已完成":"未完成";
								x['s_desc']="考试时间:"+x['s_date']+' '+x['s_start_Time'].replace(/(\d\d)(\d\d)/,"$1:$2");
								return x;
							 } 
				 ).reverse();
				//  console.log(this.$util.examsessions);
				//  console.log(this.examsessions);
			},
			async handleSubmit(item){
				let that =this;
				console.log(item);
				if(item.status!=1){
					
					let result=await this.$util.post("endSceSet",{'s_teller_id':item.s_teller_id	,'s_id':item.s_id});
					console.log(result);
					let msgInfo=result['MsgInfo'];
					console.log(result['MsgInfo'].reverse().join());
	                let tmp=result['MsgInfo'].reverse().join();
					let content=result['MsgInfo'].length>=1?("还有"+result['MsgInfo'].reverse().join()+"未提交"):"已经全部提交";
					if(tmp=="均已完成答题"){
						content="已经全部提交";
					}
					uni.showModal({
					    title: '关闭考试',
					    content: '当前考试'+content+"。是否关闭考试？",
					    success:async function (res) {							
					        if (res.confirm) {
								console.log(msgInfo);
								let result1=await that.$util.post("EndSceUpdate",{'sce_id':item.s_id,'unCommitTeller':msgInfo});
								if(result1){
									that.$util.toast(that.$refs,"场次关闭成功！",true,'success');
									that.reload();
								}else{
									that.$util.toast(that.$refs,"场次关闭失败，重新提交！",true,'error');
								}
							//	that.$u.route("/pages/index/index");
					        } else if (res.cancel) {
							//	that.$u.route("/pages/index/index");
					        }
					    }
					});
				}else{
					// let result=await this.$util.post("exportExcel",{'filename':item.s_id,'sce_index':item.s_id});
					// console.log(result);
					// let fileName = result.headers['content-disposition'].match(/fushun(\S*)xls/)[0];					 
					// //fileDownload(res.data, fileName); //如果用方法一 ，这里需要安装 npm install js-file-download --save ,然后引用 var fileDownload = require('js-file-download')，使用详情见github;
					// let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
					// let objectUrl = URL.createObjectURL(blob);
					// console.log(objectUrl);
					// //window.location.href = objectUrl;  
					// uni.openDocument({
					//       filePath: objectUrl,
					//       success: function (res) {
					//         console.log('打开文档成功');
					//       }
					//  });
					//{headers: {'Content-Type': 'multipart/form-data'}})
					// let data = new FormData();
					// data.append('filename',item.s_id);
					// data.append('sce_index',item.s_id);
					// console.log(data)
					let param="filename="+item.s_id+"&sce_index="+item.s_id;
					this.$axios.post("exportExcel",param, {
					       responseType: 'arraybuffer',headers:{'Content-Type': 'application/x-www-form-urlencoded'}
					     }).then((res) => {		
						   console.log(res);
					      // let fileName = res.headers['content-disposition'].match(/fushun(\S*)xls/)[0];					 
					       //fileDownload(res.data, fileName); //如果用方法一 ，这里需要安装 npm install js-file-download --save ,然后引用 var fileDownload = require('js-file-download')，使用详情见github;
					        console.log("!!!!!!!!!!1");
						   let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
					       let objectUrl = URL.createObjectURL(blob);
						   console.log("!!!!!!!!!!2");
						   console.log(objectUrl);
					       //window.location.href = objectUrl;
						  console.log("!!!!!!!!!!3");
					       uni.openDocument({
					             filePath: objectUrl,
					             success: function (res) {
					               console.log('打开文档成功');
					             }
					        });
					     }).catch(function (res) {});
				
					
				}
			},
			format(date){
			            var y = date.getFullYear(); 
			            var m = date.getMonth() + 1;  
			                m = m < 10 ? ('0' + m) : m;  
			            var d = date.getDate();  
			                d = d < 10 ? ('0' + d) : d;  
			            var h = date.getHours();  
			                h=h < 10 ? ('0' + h) : h;  
			            var minute = date.getMinutes();  
			                minute = minute < 10 ? ('0' + minute) : minute;  
			            var second=date.getSeconds();  
			                second=second < 10 ? ('0' + second) : second;  
			            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
			}
		}
	}
</script>

<style>
	.marg{
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
