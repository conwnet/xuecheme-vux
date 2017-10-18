<template>
  <div style="padding-bottom: 10px;margin-top: 46px;">
    <blur :blur-amount="10"  :url="headImgUrl">
      <div class="headimg"><img :src="headImgUrl"></div>
    </blur>

    <group title="个人中心">
      <cell title="个人资料" value="编辑" is-link link="/profile/info"></cell>
      <cell title="待上课程" value="查看" is-link link="/course/0"></cell>
      <cell title="历史记录" value="查看" is-link link="/course/1"></cell>
    </group>

    <group title="账户中心">
      <cell title="修改密码" is-link link="/profile/password"></cell>
    </group>

    <x-button type="warn" style="margin-top: 10px;" @click.native="logout">注销登录</x-button>
  </div>
</template>

<script>

  import { XHeader, Blur, Group, Cell, XButton } from 'vux'

  export default {
    components: {
      XHeader, Blur, Group, Cell, XButton
    },
    data () {
      return {
        headImgUrl: this.appHost + '/static/student.jpg'
      }
    },
    methods: {
      logout () {
        localStorage.timeout = 0
        localStorage.token = ''
        this.$router.go('/login')
      }
    },
    created () {
      let {token, timeout} = localStorage
      if (!token || Date.now() + 600000 > parseInt(timeout)) {
        this.$router.push('/login')
      }
    }
  }

</script>

<style lang="less">

  .headimg {
    text-align: center;
    padding-top: 30px;
    color: #fff;
    font-size: 18px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid #ececec;
    }
  }

</style>
