## 答题组件

#### 调用方法
```
	<template>
		<view>
			<Answer :questtionList='questtionList' @submit='handleSubmit' @onChange='onChange'></Answer>
		</view>
		
	</template>
	<script>
		import Answer from '@/components/dyw-answer/answer.vue'
		export default {
			data() {
				return {
					questtionList: [],
				}
			},
			components:{
				Answer
			},
			methods: {
				/* 提交答案
				 */
				handleSubmit(answerList){
					console.log(answerList)
				},
				/* 题目答案变化
				 */
				onChange(answer){
					console.log(answer)
				}
				
				
			}
		}
	</script>
	
```	

#### 参数
questtionList： 题目列表，组件中有列表格式    格式： Array

currentSwiperItem: 设置默认题目,默认为第一道题目,从0开始。  格式： Number

duration: swiper滑动事件，默认300    格式: String/Number

|  参数名   | 默认值  | 描述  | 格式 |
|  ----  | ----  | ----  | ----  |
| questtionList  | - | 题目列表，组件中有列表格式案例。  | Array |
| currentSwiperItem  | 0 | 设置默认题目,默认为第一道题目,从0开始。  | Number |
| duration  | 300 | swiper滑动事件  | Number |

#### 方法
#### 
|  方法名   | 返回值  | 描述  | 返回格式 |
|  ----  | ----  | ----  | ----  |
| submit  | questtionList | 点击提交时，调用该方法  | Array |
| onChange  | 当前修改的题目对象 | 当用户选择答案时触发该方法  | Object |


