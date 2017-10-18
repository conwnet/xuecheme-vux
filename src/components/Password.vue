<template>
  <div>
    <group title="登录">
      <x-input v-model="old_pass" title="旧密码"></x-input>
      <x-input v-model="new_pass" title="新密码"></x-input>
      <x-input v-model="re_pass" :equal-with="new_pass" title="确认密码"></x-input>

    </group>

    <x-button type="primary" style="margin: 10px 0;" @click.native="changePass">确认修改</x-button>
  </div>
</template>

<script>

  import { Group, XInput, XButton, AlertPlugin } from 'vux'

  export default {
    components: {
      XButton, Group, XInput, AlertPlugin
    },
    data () {
      return {
        old_pass: '',
        new_pass: '',
        re_pass: ''
      }
    },
    methods: {
      async changePass () {
        if (this.new_pass !== this.re_pass) {
          this.$vux.alert.show({'content': '两次密码输入不一样！'})
        }
        let { token } = localStorage
        let res = await this.$http.post(this.appHost + '/api/change_pass', {
          old_pass: this.old_pass,
          new_pass: this.new_pass
        }, { headers: { token: token } })
        if (res.status === 200) {
          this.$vux.alert.show({'content': res.data.errmsg})
        }
      }
    }
  }

</script>

<style>

</style>
