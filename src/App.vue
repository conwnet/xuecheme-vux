<template>
  <view-box>
    <x-header :left-options="{ showBack: showBack }" style="position: absolute; width: 100%; z-index: 100;">学车么</x-header>

    <transition name="fade">
      <router-view style="margin-top: 46px;"></router-view>
    </transition>

    <tabbar>
      <tabbar-item link="/home">
        <img slot="icon" :src="this.appHost + '/static/home.png'">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/coaches">
        <img slot="icon" :src="this.appHost + '/static/coach.png'">
        <span slot="label">预约教练</span>
      </tabbar-item>
      <tabbar-item link="/profile">
        <img slot="icon" :src="this.appHost + '/static/profile.png'">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<script>

  import { Tabbar, TabbarItem, ViewBox, XHeader } from 'vux'

  export default {
    name: 'app',
    components: {
      ViewBox, Tabbar, TabbarItem, XHeader
    },
    computed: {
      showBack () {
        return this.$route.path.split('/').length > 2
      }
    }
  }

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }

  .fade-enter-active {
    transition: opacity .5s
  }
  .fade-enter {
    opacity: 0
  }

  ::-webkit-scrollbar{
    display:none;
  }

</style>
