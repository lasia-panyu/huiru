<template>
  <div class="hm-friends-requests-card">
    <div class="box">
      <div class="hd">
        <text class="friendRequest">{{ options.friendRequest }}</text>
        <image class="titleClass" :src="options.titleClass" />
      </div>
      <div class="bd">
        <div class="group">
          <div class="container">
            <image class="userpng" :src="options.userpng" />
            <div class="outer">
              <text class="name">{{ options.name }}</text>
              <text class="address1">{{ options.address1 }}</text>
            </div>
          </div>
          <div class="blockTwo">
            <image class="userImage" :src="options.userImage" />
            <div class="block">
              <div class="wrap">
                <text class="name2">{{ options.name2 }}</text>
              </div>
              <text class="address2">{{ options.address2 }}</text>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="row1">
            <image class="erroimg" :src="options.erroimg" />
          </div>
          <div class="row2">
            <image class="erroimg" :src="options.erroimg" />
          </div>
        </div>
        <div class="listTwo">
          <div class="addClass">
            <image class="addimg" :src="options.addimg" />
          </div>
          <div class="rowClass">
            <image class="addimg" :src="options.addimg" />
          </div>
        </div>
      </div>
      <div class="threeClass">
        <div class="blockThree">
          <image class="avator" :src="options.avator" />
          <div class="containerTwo">
            <div class="groupTwo">
              <text class="name3">{{ options.name3 }}</text>
            </div>
            <text class="address3">{{ options.address3 }}</text>
          </div>
        </div>
        <div class="groupThree">
          <div class="erroClass">
            <image class="erroimg" :src="options.erroimg" />
          </div>
          <div class="tianjiaWrap">
            <image class="addimg" :src="options.addimg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmFriendsRequestsCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-friends-requests-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          friendRequest: '好友请求',
          titleClass:
            '/static/hm-friends-requests-card/images/img_24029_0_5.png',
          userpng:
            '/static/hm-friends-requests-card/images/img_24029_0_0.png',
          name: '张三',
          address1: '北京',
          userImage:
            '/static/hm-friends-requests-card/images/img_24029_0_3.png',
          name2: '王五',
          address2: '上海',
          erroimg:
            '/static/hm-friends-requests-card/images/img_24029_0_2.png',
          addimg:
            '/static/hm-friends-requests-card/images/img_24029_0_1.png',
          avator:
            '/static/hm-friends-requests-card/images/img_24029_0_4.png',
          name3: '艾山',
          address3: '广州'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
@import './index.response.css';
</style>
