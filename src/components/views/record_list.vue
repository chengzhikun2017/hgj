<template>
  <div  class="record-list" >
    <!-- <div v-loading='loading' element-loading-text='请稍后'></div> -->
    <div class="list-container" :style="{marginTop:top+'rem'}"  v-scroll-load='{method:getmore,listSelector:".list-container-inner"}' >
      <div class="list-container-inner" v-pull-refresh='{method:getNew}' v-inner-scroll>
        <div class="list-top" v-if='list.length>0'>——释放刷新——</div>
        <div class="list-top" v-if='list.length===0&&!loading'>无数据</div>
        <div class="list-top" v-if='loading'>刷新中</div>
        <slot></slot>
        <div class="list-bottom" v-if='noMore'>————我是有底线的————</div>
      </div>
    </div>
    <!-- <remind :remind='remind'></remind> -->
  </div>
</template>

<script>
  // import publicFun from '../../js/public.js'
  // import bus from '../../bus.js'
  import fetch from '../../utils/fetch.js'
  export default {
    data() {
      return {
        // response: null,
        loading: false,
        // records: [],
        list:[],
        crrtPage:0,
        loading:false,
        noMore:false,
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
      if( !this.noMore&& this.loading === false){
        // console.warn('get!!')
        this.get()
      }
    },
    getNew(){
      if(this.loading==true){
        return
      }else{
        this.loading==true
        this.list=[]
        // this.ttlPage=null
        this.crrtPage=1
        this.noMore=false
        this.get()
      }
    },
    //loading
    //ttlPage
    //crrtPage
    //noMore
    //limit
    //[status]
    //
    //uncertain parameters
    //url
    get() {
      if (this.loading) {
        return
      }
      if (this.noMore) {
        return
      }
      console.log('loading record list')
      this.loading = true
      fetch({
        url: this.cfg.url,
        params: Object.assign({
          page: this.crrtPage,
          limit: 8,
        }, this.cfg.params, ),
      }).then(res => {
        this.loading = false
        this.crrtPage++
        // if(res.length===0){
        if(res.length<4){
          this.noMore=true
        }
        
        this.list = this.list.concat(res)
        this.$emit('input', this.list)

      })
      // publicFun.get(url, this, () => {
      //   var data = this.response.body
      //   console.log('data brokerage rcd', data.data)
      //   this.records = this.records.concat(data.data.data)
      //   bus.$emit('input', this.records)
      //   this.ttlPage = data.data.pages
      //   if (this.ttlPage > this.crrtPage) {
      //     this.crrtPage++
      //   } else {
      //     this.noMore = true
      //   }
      //   this.loading = false
      // }, () => {
      //   this.loading = false
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
    .list-container{
      overflow: scroll;
      height: 6rem;
      margin-top: 0.4rem;
      border:1px solid red;
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
