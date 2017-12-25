<template>
  <div  class="record-list" >
    <!-- <div v-loading='loading' element-loading-text='请稍后'></div> -->
    <div class="list-container" :style="{marginTop:top+'rem'}"  v-scroll-load='{method:getmore,listSelector:".list-container-inner"}' >
      <div class="list-container-inner" v-pull-refresh='{method:getNew}' v-inner-scroll>
        <div class="list-top" v-if='records.length>0'>——释放刷新——</div>
        <div class="list-top" v-if='records.length===0&&!loading'>无数据</div>
        <div class="list-top" v-if='loading'>刷新中</div>
        <slot></slot>
        <div class="list-bottom" v-if='allGet'>————我是有底线的————</div>
      </div>
    </div>
    <!-- <remind :remind='remind'></remind> -->
  </div>
</template>

<script>
  // import publicFun from '../../js/public.js'
  // import bus from '../../bus.js'
  export default {
    data() {
      return {
        response: null,
        loading: false,
        records: [],
        crrtPage:0,
        ttlPage:null,
        getting:false,
        allGet:false,
        remind: {
          isShow: false,
          remindMsg: 'remind',
          self_: this,
          remindOpts: [{
            msg: '确定',
          }, ],
        },
    }
  },
  props:{
    cfg:{
    
    },
    top:{
      default:0.4
    },
  },
  created(){
    // this.url=this.config.url
    this.getNew()
  },
  methods:{
    getmore(){
      if( this.crrtPage <= this.ttlPage && this.getting === false){
        // console.warn('get!!')
        this.get()
      }
    },
    getNew(){
      if(this.getting==true){
        return
      }else{
        this.getting==true
        this.records=[]
        this.ttlPage=null
        this.crrtPage=1
        this.allGet=false
        this.get()
      }
    },
    //getting
    //ttlPage
    //crrtPage
    //allGet
    //limit
    //[status]
    //
    //uncertain parameters
    //url
    get() {
      if (this.getting) {
        return
      }
      if (this.ttlPage) {
        if (this.allGet) {
          return
        }
      }
      // var url = publicFun.urlConcat(this.cfg.url, {
      //   limit: this.cfg.limit || 8,
      //   page: this.crrtPage,
      // })
      this.getting = true
      // publicFun.get(url, this, () => {
      //   var data = this.response.body
      //   console.log('data brokerage rcd', data.data)
      //   this.records = this.records.concat(data.data.data)
      //   bus.$emit('input', this.records)
      //   this.ttlPage = data.data.pages
      //   if (this.ttlPage > this.crrtPage) {
      //     this.crrtPage++
      //   } else {
      //     this.allGet = true
      //   }
      //   this.getting = false
      // }, () => {
      //   this.getting = false
      // })
    },
    onScroll(e){
      console.log('e',e)
    },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>

  .record-list{
    .icon-avator{
      font-size: 0.3rem;
    }
    .list-container{
      margin-top: 0.4rem;
      /*.list-container-inner{*/
        /*}*/
      }
    }
    .list-top{
      position: absolute;
      top: 0.2rem;
      font-size: 0.14rem;
      width: 100%;
      overflow: visible;
      text-align: center;
    }
  </style>
