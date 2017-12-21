<template>
  <div class="records" flex="dir:top">
    <app-nav title="计划执行记录" flex-box="0"></app-nav>
    <article flex-box="1">
      <ul class="recordlist">
        <li class="recorditem">
          <app-record :record="record1"></app-record>
        </li>
        <li class="recorditem">
          <app-record :record="record2"></app-record>
        </li>
      </ul>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        record1: {
          lastNo: '8888',
          money: 98.4,
          time: '2017-12-19 / 21:42',
          btnType: 'success' // doing, success
        },
        record2: {
          lastNo: '8848',
          money: 98.43,
          time: '2017-11-19 / 21:42',
          btnType: 'doing' // doing, success
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .records {
    width: 100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      .recordlist {
        .recorditem {
          display: block;
          padding-bottom: 0.1rem;
        }
      }
    }
  }
</style>