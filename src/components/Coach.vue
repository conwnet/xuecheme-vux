<template>
  <div>
    <divider>时间表</divider>
    <button-tab>
      <button-tab-item selected>{{ tomorrow }}</button-tab-item>
    </button-tab>
    <div style="margin-top: 10px;">
      <x-table>
        <thead>
          <tr>
            <th>开始</th>
            <th>结束</th>
            <th>预约</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses">
            <td>{{ getTimeStr(course.start) }}</td>
            <td>{{ getTimeStr(course.end) }}</td>
            <td><x-button mini type="primary" :disabled="course.status" @click.native="confirmInfo(course.start, course.end)">{{ course.status ? '已被预约' : '立即预约' }}</x-button></td>
          </tr>
        </tbody>
      </x-table>
    </div>
      <confirm v-model="confirmShow" title="确定预约？" @on-confirm="submit">
        <p>{{ getTimeStr(start) + '-' + getTimeStr(end) }}</p>
      </confirm>
  </div>
</template>

<script>

  import { XHeader, ButtonTab, ButtonTabItem, Divider, XTable, XButton, Confirm, AlertPlugin } from 'vux'

  export default {
    components: {
      AlertPlugin,
      Confirm,
      XTable,
      XButton,
      Divider,
      XHeader,
      ButtonTab,
      ButtonTabItem
    },
    data () {
      return {
        confirmShow: false,
        courses: [],
        start: 0,
        end: 0,
        coach_id: 0
      }
    },
    methods: {
      getTimeStr (sec) {
        let hour = parseInt(sec / 3600)
        let min = parseInt((sec % 3600) / 60)
        return ('00' + hour).slice(-2) + ':' + ('00' + min).slice(-2)
      },
      confirmInfo (start, end) {
        this.start = start
        this.end = end
        this.confirmShow = !this.confirmShow
      },
      async submit () {
        let { token } = localStorage
        let res = await this.$http.post(this.appHost + '/api/plan', {start: this.start, end: this.end, coach_id: this.coach_id}, { headers: { token: token } })
        if (res.data.errcode) {
          this.$vux.alert.show({'content': res.data.errmsg})
        }
      }
    },
    computed: {
      tomorrow () {
        let date = new Date(Date.now() + 86400 * 1000)
        return (1900 + date.getYear()) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      }
    },
    async created () {
      this.coach_id = this.$route.params.id
      let { token } = localStorage
      let res = await this.$http.get(this.appHost + '/api/plan/' + this.coach_id, { headers: { token: token } })
      if (!res.data.errcode) {
        this.courses = res.data.data
      }
    }
  }

</script>

<style lang="less">


  .coaches {
    display: flex;
    background-color: #fff;
    height: 90px;

    .headimg {
      display: block;
      margin: 0 5px;
      padding: 5px 0;
      width: 80px;
      height: 80px;
    }

    .content {
      flex: 1;
      background: #fff;
    }
  }


</style>
