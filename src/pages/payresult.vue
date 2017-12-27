<template>
  <div class="payresult" flex="dir:top">
    <app-nav flex-box="0">支付成功</app-nav>
    <article flex-box="1">
      <div class="bill">
        <div class="sign">
          
        </div>
        <div class="bill-content">
          <div class="pay">
            <p>支付成功</p>
            <div class="moneybox">
              <span class="unit">
                ¥
              </span>
              <span class="money">
                500.00元
              </span>
            </div>
          </div>
          <div class="liner"></div>
          <div class="msg">
            <div class="msgitem" flex="main:justify">
              <div class="left">
                <div class="label">付款方式</div>
                <div class="detail">余额支付</div>
              </div>
              <div class="right">
                <div class="label">付款项目</div>
                <div class="detail">账户激活</div>
              </div>
            </div>
            <div class="msgitem">
              <div class="label">流水号</div>
              <div class="detail">HXB3638-AC9X33-10165367</div>
            </div>
          </div>
          <div class="liner-cut">
          </div>
          <div class="mybutton">
            <app-button>查看详情</app-button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .payresult {
    width: 100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      padding: 0.15rem 0.2rem;
      .bill {
        border-radius: 0.1rem;
        box-shadow: 0px 20px 62px 0 rgba(185, 185, 185, 0.38);
        .sign {
          height: 0.5rem;
          background-image: linear-gradient(to right, #5ae2ad, #53d769);
          border-top-left-radius: 0.1rem;
          border-top-right-radius: 0.1rem;
        }
        .bill-content {
          padding:0 0.15rem;
          border-bottom-left-radius: 0.1rem;
          border-bottom-right-radius: 0.1rem;
          background: white;
          .pay {
            text-align: center;
            padding: 0.3rem;
            p {
              font-size: 0.13rem;
              line-height: 1;
              color: #a4a4a4;
            }
            .moneybox {
              padding-top: 0.08rem;
              .unit {
                font-size: 0.1rem;
                color: #383838;
                vertical-align: top;
              }
              .money {
                font-size: 0.33rem;
                font-weight: 700;
                color: #383838;
                line-height: 1;
              }
            }
          }
          .liner, .liner-cut {
            position: relative;
            height: 1px;
            border:1px dashed #d3d3d3;
          }
          .liner-cut {
            &:before {
              position: absolute;
              top: -0.075rem;
              left: -0.16rem;
              content: ' ';
              border-top: 0.075rem solid transparent;
              border-left: 0.12rem solid #f3f3f3;
              border-bottom: 0.075rem solid transparent;
            };
            &:after {
              position: absolute;
              top: -0.075rem;
              right: -0.16rem;
              content: ' ';
              border-top: 0.075rem solid transparent;
              border-right: 0.12rem solid #f3f3f3;
              border-bottom: 0.075rem solid transparent;
            };
          }
          .msg {
            padding: 0.25rem 0 0.25rem;
            .msgitem {
              padding-bottom: 0.15rem;
              .label {
                font-size: 0.12rem;
                color: #a4a4a4;
                line-height: 1;
                padding-bottom: 0.09rem;
              }
              .detail {
                font-size: 0.16rem;
                color: #3aa4f7;
                line-height: 1;
              }
            }
          }
          .mybutton {
            padding: 0.24rem 0;
          }
        }
      }
    }
  }
</style>