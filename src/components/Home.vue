<template>
  <div style="height: 100%;">
    <iframe id="iframe" style="width: 100%; height: 100%; border: 0;" src="http://m.jiakaobaodian.com/"></iframe>
  </div>
</template>

<script>

  export default {
    data () {
      return {
      }
    },
    created () {
      this.$nextTick(() => {
        let frame = document.getElementById('iframe')
        frame.onload = function () {
          console.log(frame.contentWindow.document.body)
        }
      })
    }
  }
</script>

<style>
</style>
