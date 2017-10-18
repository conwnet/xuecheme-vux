<template>
  <div>
    <group title="登录">
      <x-input v-model="username" title="手机号"></x-input>
      <x-input v-model="password" title="密码"></x-input>
    </group>

    <x-button type="primary" style="margin: 10px 0;" @click.native="login">登录</x-button>
  </div>
</template>

<script>

  import { Group, XInput, XButton } from 'vux'

  export default {
    components: {
      XButton, Group, XInput
    },
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async login () {
        let res = await this.$http.post(this.appHost + '/api/login', {
          username: this.username,
          password: this.password
        })
        if (res.status === 200 && res.data.errcode) {
        } else {
          localStorage.token = res.data.token
          localStorage.timeout = res.data.timeout * 1000
          this.$router.push('/profile')
        }
      }
    }
  }

</script>

<style>

</style>
