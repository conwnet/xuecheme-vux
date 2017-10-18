<template>
  <div>
    <panel header="教练列表" :list="coaches"></panel>
  </div>
</template>

<script>

  import { XHeader, Panel } from 'vux'

  export default {
    components: {
      XHeader,
      Panel
    },
    data () {
      return {
        coaches: []
      }
    },
    async created () {
      let { token } = localStorage
      let res = await this.$http.get(this.appHost + '/api/coaches', { headers: { token: token } })
      if (!res.data.errcode) {
        this.coaches = res.data.coaches
        this.coaches.forEach(x => {
          x.src = this.appHost + '/static/coach.jpg'
        })
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
