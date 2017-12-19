<template>
  <div class="plan" flex="dir:top">
    <app-nav title="新建还款计划" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="photoDetail">
        
      </div>
      <div class="form">
        <div class="input">
          <label for="">还款金额</label>
          <input type="text" placeholder="请输入还款金额">
        </div>
        <div class="input">
          <label for="">还款金额</label>
          <input type="text" placeholder="请输入还款金额">
        </div>
        <p>结束时间必须在还款日前2天，起止时间最少间隔1天以上</p>
        <div class="input">
          <label for="">选择保证金</label>
          <button>500</button>
          <button>1000</button>
          <button>2000</button>
        </div>
        <div class="input">
          <label for="">选择开始时间</label>
          <input type="text" placeholder="请输入还款金额">
        </div>
      </div>
      <p>我已同意并已阅读软件服务条款及协议</p>
      <button>预览还款计划</button>
    </article>
    <div class="popView">
      <div class="popCard">
        <div class="title" flex>
          <img src="" alt="">
          <h2>您的还款计划</h2>
          <img src="" alt="">
        </div>
        <div class="content">
          <div class="line">
            <span>计划还款：</span>
            <span>2000.00元</span>
          </div>
          <div class="line">
            <span>保证金：</span>
            <span>600.00元</span>
          </div>
          <div class="line">
            <span>服务费：</span>
            <span>18.00元</span>
          </div>
          <div class="line">
            <span>总计：</span>
            <span>618.00元</span>
          </div>
        </div>
        <div class="footer">
          <div class="line">
            <span>还款时间：</span>
            <span>2017/12/09 —— 2019/01/18</span>
          </div>
          <div class="line">
            <span>还款周期：</span>
            <span>36天/保证金600元/6期还完</span>
          </div>
          <button>开启还款计划</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@/css/flex.css'
  export default {
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .plan {
    width: 100%;
    height: 100%;
    article {

    }
  }
</style>