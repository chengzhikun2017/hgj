<template>
  <div  class="record-list" >
    <div class="list-top" v-if='list.length>0'>——下拉释放刷新——</div>
    <div class="list-top" v-if='list.length===0&&!loading'>无数据</div>
    <div class="list-top" v-if='loading'>刷新中</div>
    <div class="list-container" :style='{height:height}' v-scroll-load='{method:getmore,listSelector:".list-container-inner"}' >
      <div class="list-container-inner" v-pull-refresh='{method:getNew}' v-inner-scroll>
        <slot></slot>
        <div class="list-bottom" v-if='noMore'>————我是有底线的————</div>
        <div class="list-bottom" v-if='!noMore'>————加载中————</div>
      </div>
    </div>
  </div>
</template>

<script>
  // import publicFun from '../../js/public.js'
  // import bus from '../../bus.js'
  import fetch from '../../utils/fetch.js'
  export default {
    data() {
      return {
        loading: false,
        list:[],
        crrtPage:0,
        noMore:false,
    }
  },
  props:{
    cfg:{
      
    },
    // top:{
    //   default:0.4
    // },
  },
  created(){
    // this.url=this.config.url
    this.getNew()
  },
  computed:{
    height(){
      let height=window.screen.height/100-0.44
      return height+'rem'
    },
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
      console.log('loading record list',this.cfg.params)
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
    position: relative;
    .list-container{
      transform:translateY(0);
      overflow: scroll;
      /*height: 6rem;*/
      /*z-index: 2;*/
      background: transparent;
      }
    }
    .list-top{
      position: absolute;
      top: 0.2rem;
      font-size: 0.12rem;
      width: 100%;
      overflow: visible;
      text-align: center;
      /*z-index: 0;*/
    }
    .list-bottom{
      text-align: center;
      font-size: 0.12rem;
      height: 0.16rem;
      margin: 0.1rem;
    }
  </style>
