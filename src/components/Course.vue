<template>
  <div>
    <form-preview v-for="course in courses" style="margin-bottom: 15px;"
                  header-value="预约信息"
                  :body-items="course.info"></form-preview>

  </div>
</template>

<script>

  import { FormPreview } from 'vux'

  export default {
    components: { FormPreview },
    data () {
      return {
        courses: []
      }
    },
    methods: {
      getTimeStr (sec) {
        let hour = parseInt(sec / 3600)
        let min = parseInt((sec % 3600) / 60)
        return ('00' + hour).slice(-2) + ':' + ('00' + min).slice(-2)
      }
    },
    async created () {
      let type = this.$route.params.type
      let { token } = localStorage
      let res = await this.$http.get(this.appHost + '/api/courses/' + type, { headers: { token: token } })
      if (!res.data.errcode) {
        this.courses = res.data.data
        this.courses.forEach(x => {
          let date = x.year + '-' + x.month + '-' + x.date
          x.info = [
            {label: '开始时间', value: date + ' ' + this.getTimeStr(x.start)},
            {label: '结束时间', value: date + ' ' + this.getTimeStr(x.end)},
            {label: '教练姓名', value: x.coach_nick},
            {label: '教练电话', value: x.coach_mobile},
            {label: '学员姓名', value: x.user_nick},
            {label: '学员电话', value: x.user_mobile}
          ]
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
