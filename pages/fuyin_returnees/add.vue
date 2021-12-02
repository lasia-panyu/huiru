<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="name" label="姓名" required>
        <uni-easyinput v-model="formData.name" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="mobile" label="手机号码" required>
        <uni-easyinput v-model="formData.mobile" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="idcard_type" label="证件类型">
        <uni-data-checkbox v-model="formData.idcard_type" :localdata="formOptions.idcard_type_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="idcard" label="证件号码">
        <uni-easyinput v-model="formData.idcard" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="address" label="本地住址" required>
        <uni-easyinput v-model="formData.address" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="from_abroad" label="是否来自国外" required>
        <switch @change="binddata('from_abroad', $event.detail.value)" :checked="formData.from_abroad"></switch>
      </uni-forms-item>
      <uni-forms-item name="province_code" label="">
        <uni-easyinput placeholder="省级编码，冗余存储" v-model="formData.province_code"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="city_code" label="">
        <uni-easyinput placeholder="地级编码，冗余存储" v-model="formData.city_code"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="area_code" label="来源地省市区">
        <uni-data-picker self-field="code" parent-field="parent_code" v-model="formData.area_code" collection="opendb-city-china" orderby="value asc" field="code as value, name as text, eq(type, 2) as isleaf"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="from_address" label="来源地地址" required>
        <uni-easyinput v-model="formData.from_address" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="transport" label="交通工具类型">
        <uni-data-checkbox v-model="formData.transport" :localdata="formOptions.transport_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="transport_no" label="交通工具班次">
        <uni-easyinput placeholder="飞机航班,火车车次,汽车班次,自驾车牌等" v-model="formData.transport_no" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="status" label="状态" required>
        <uni-data-checkbox v-model="formData.status" :localdata="formOptions.status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="comment" label="备注">
        <textarea @input="binddata('comment', $event.detail.value)" class="uni-textarea-border" v-model="formData.comment" trim="both"></textarea>
      </uni-forms-item>
      <uni-forms-item name="Health_code" label="健康码颜色">
        <uni-data-checkbox v-model="formData.Health_code" :localdata="formOptions.Health_code_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="na_test_time" label="核酸检测时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.na_test_time"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="na_test_result" label="核酸检测结果">
        <uni-data-checkbox v-model="formData.na_test_result" :localdata="formOptions.na_test_result_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="temperature" label="体温">
        <uni-easyinput type="number" v-model="formData.temperature"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="cough" label="是否咳嗽">
        <switch @change="binddata('cough', $event.detail.value)" :checked="formData.cough"></switch>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/fuyin_returnees.js';

  const db = uniCloud.database();
  const dbCollectionName = 'fuyin_returnees';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  export default {
    data() {
      let formData = {
        "name": "",
        "mobile": "",
        "idcard_type": 0,
        "idcard": "",
        "address": "",
        "from_abroad": false,
        "province_code": "",
        "city_code": "",
        "area_code": "",
        "from_address": "",
        "transport": null,
        "transport_no": "",
        "status": null,
        "comment": "",
        "Health_code": null,
        "na_test_time": null,
        "na_test_result": null,
        "temperature": null,
        "cough": null
      }
      return {
        formData,
        formOptions: {
          "idcard_type_localdata": [
            {
              "text": "身份证",
              "value": 0
            },
            {
              "text": "护照",
              "value": 1
            },
            {
              "text": "军官证",
              "value": 2
            },
            {
              "text": "港澳身份证",
              "value": 3
            }
          ],
          "transport_localdata": [
            {
              "text": "飞机",
              "value": 0
            },
            {
              "text": "火车",
              "value": 1
            },
            {
              "text": "长途汽车",
              "value": 2
            },
            {
              "text": "自驾",
              "value": 3
            },
            {
              "text": "轮船",
              "value": 4
            }
          ],
          "status_localdata": [
            {
              "text": "居家隔离",
              "value": 0
            },
            {
              "text": "集中隔离",
              "value": 1
            },
            {
              "text": "解除隔离",
              "value": 2
            },
            {
              "text": "送医",
              "value": 3
            },
            {
              "text": "出院居家隔离",
              "value": 4
            },
            {
              "text": "康复",
              "value": 5
            },
            {
              "text": "死亡",
              "value": 6
            }
          ],
          "Health_code_localdata": [
            {
              "text": "绿色",
              "value": 0
            },
            {
              "text": "黄色",
              "value": 1
            },
            {
              "text": "红色",
              "value": 2
            }
          ],
          "na_test_result_localdata": [
            {
              "text": "阴性",
              "value": 0
            },
            {
              "text": "阳性",
              "value": 1
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
	async onLoad(){
		let result = await this.$util.getUser(this);
		this.formData.name=result.nickname;
		this.formData.mobile=result.mobile;
		this.formData.idcard=result.email;
		// this.formData.department_id=result.department_id;
		console.log(result);
	},
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      /**
       * 触发表单提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          this.submitForm(res)
        }).catch(() => {
          uni.hideLoading()
        })
      },

      submitForm(value) {
        // 使用 clientDB 提交数据
        db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    line-height: 1;
    margin: 0;
  }
</style>
