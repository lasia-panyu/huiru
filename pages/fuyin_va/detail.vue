<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" collection="fuyin_va" field="name,mobile,idcard_type,idcard,from_abroad,department_id{name},address_home_type,address_home,address_work_type,address_work,vaccine_status,status,comment" :where="queryWhere" :getone="true" :manual="true">
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
          <text>户籍</text>
          <text>{{options.from_abroad_valuetotext[data.from_abroad]}}</text>
        </view>
        <view>
          <text>部门</text>
          <text>{{data.department_id && data.department_id[0] && data.department_id[0].name}}</text>
        </view>
        <view>
          <text>现居住地</text>
          <text>{{options.address_home_type_valuetotext[data.address_home_type]}}</text>
        </view>
        <view>
          <text>现居住地详细地址</text>
          <text>{{data.address_home}}</text>
        </view>
        <view>
          <text>现工作地</text>
          <text>{{options.address_work_type_valuetotext[data.address_work_type]}}</text>
        </view>
        <view>
          <text>工作地详细地址</text>
          <text>{{data.address_work}}</text>
        </view>
        <view>
          <text>接种疫苗状态</text>
          <text>{{options.vaccine_status_valuetotext[data.vaccine_status]}}</text>
        </view>
        <view>
          <text>预约记录状态</text>
          <text>{{options.status_valuetotext[data.status]}}</text>
        </view>
        <view>
          <text>备注</text>
          <text>{{data.comment}}</text>
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
  import { enumConverter } from '../../js_sdk/validator/fuyin_va.js';

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
