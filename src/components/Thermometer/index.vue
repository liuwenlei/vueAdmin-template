<template>
  <div class="thermometer">
    <div class="thermometer-body"><div class="thermometer-body-inner"></div></div>
    <div class="thermometer-bottom"></div>
  </div>
</template>

<script>
export default {
  created() {
  },
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.thermometer {
  display: inine-block;
  width: 50px;
  height: 100px;
  background-color: #fff;
  font-size: 0px;
  .thermometer-body {
    display: inline-block;
    position: relative;
    margin: 0 20px;
    width: 10px;
    height: 70px;
    border-radius: 5px 5px 0 0;
    background-color: #fff;
    .thermometer-body-inner {
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 50%;
      border-radius: 5px 5px 0 0;
      background-color: #f00;
      bottom: 0;
    }
  }
  .thermometer-bottom {
    display: inline-block;
    margin: -2px 10px 0 10px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #f00;
  }
}
</style>
