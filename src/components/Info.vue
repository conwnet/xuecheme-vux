<template>
  <div style="padding-bottom: 10px; margin-top: 46px;">
    <group title="修改个人信息">
      <x-input v-model="nick" title="姓名"></x-input>
      <x-input v-model="age" title="年龄"></x-input>
      <x-input v-model="addr" title="地址"></x-input>
    </group>
    <x-button type="primary" style="margin: 10px 0;" @click.native="saveInfo">保存</x-button>
  </div>
</template>

<script>

  import { Group, XInput, XButton } from 'vux'

  export default {
    components: {
      Group, XInput, XButton
    },
    data () {
      return {
        show: false,
        nick: '',
        age: '',
        addr: ''
      }
    },
    methods: {
      async saveInfo () {
        let { token } = localStorage
        let res = await this.$http.post(this.appHost + '/api/userinfo', {
          nick: this.nick,
          age: this.age,
          addr: this.addr
        }, { headers: { token: token } })
        if (!res.data.errcode) {
          this.$vux.alert.show({
            content: '保存成功！'
          })
        }
      }
    },
    async created () {
      let { token } = localStorage
      let res = await this.$http.get(this.appHost + '/api/userinfo', { headers: { token: token } })
      if (!res.data.errcode) {
        this.nick = res.data.nick
        this.age = res.data.age
        this.addr = res.data.addr
      }
    }
  }

</script>

<style lang="less">


</style>
