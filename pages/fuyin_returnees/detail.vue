<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" collection="fuyin_returnees,opendb-city-china" field="name,mobile,idcard_type,idcard,address,from_abroad,province_code,city_code,area_code{name},from_address,transport,transport_no,status,comment,Health_code,na_test_time,na_test_result,temperature,cough" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>姓名</text>
          <text>{{data.name}}</text>
        </view>
        <view>
          <text>手机号码</text>
          <text>{{data.mobile}}</text>
        </view>
        <view>
          <text>证件类型</text>
          <text>{{options.idcard_type_valuetotext[data.idcard_type]}}</text>
        </view>
        <view>
          <text>证件号码</text>
          <text>{{data.idcard}}</text>
        </view>
        <view>
          <text>本地住址</text>
          <text>{{data.address}}</text>
        </view>
        <view>
          <text>是否来自国外</text>
          <text>{{data.from_abroad == true ? '✅' : '❌'}}</text>
        </view>
        <view>
          <text>province_code</text>
          <text>{{data.province_code}}</text>
        </view>
        <view>
          <text>city_code</text>
          <text>{{data.city_code}}</text>
        </view>
        <view>
          <text>来源地省市区</text>
          <text>{{data.area_code && data.area_code[0] && data.area_code[0].name}}</text>
        </view>
        <view>
          <text>来源地地址</text>
          <text>{{data.from_address}}</text>
        </view>
        <view>
          <text>交通工具类型</text>
          <text>{{options.transport_valuetotext[data.transport]}}</text>
        </view>
        <view>
          <text>交通工具班次</text>
          <text>{{data.transport_no}}</text>
        </view>
        <view>
          <text>状态</text>
          <text>{{options.status_valuetotext[data.status]}}</text>
        </view>
        <view>
          <text>备注</text>
          <text>{{data.comment}}</text>
        </view>
        <view>
          <text>健康码颜色</text>
          <text>{{options.Health_code_valuetotext[data.Health_code]}}</text>
        </view>
        <view>
          <text>核酸检测时间</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.na_test_time"></uni-dateformat>
        </view>
        <view>
          <text>核酸检测结果</text>
          <text>{{options.na_test_result_valuetotext[data.na_test_result]}}</text>
        </view>
        <view>
          <text>体温</text>
          <text>{{data.temperature}}</text>
        </view>
        <view>
          <text>是否咳嗽</text>
          <text>{{data.cough == true ? '✅' : '❌'}}</text>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/fuyin_returnees.js';

  export default {
    data() {
      return {
        queryWhere: '',
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"'
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
