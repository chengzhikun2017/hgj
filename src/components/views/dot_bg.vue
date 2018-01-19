<template>
  <div class="dot-bg" >
    <canvas class="canvas" ref='canvas'>
    </canvas>
    <div class="content">
      <slot>
        
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx:null,
      canvas:null,
      ratio:null,
      centers:[],
      radius:[2,1.8],
      distanceOfCenter:[4,4],
      dotColor:['#4be2f8','#f84f4b'],
      halfWidth:[187,222],
      halfHeight:[94,110],
      regressionFunc:[{
        func:function(x){
          return 0.004*x*x-180
        }
      },{
        func:function(x){
          return -0.35*x-150
        }
      },],
    }
  },
  props:{
    // distanceOfCenter:{
    //   default:4
    // },
    type:{
      default:0
    },
    // halfWidth:{
    //   default:187,
    // },
    // halfHeight:{
    //   default:94,
    // },
  },
  methods:{
    drawDot(x,y,r,color){
      let ctx=this.ctx
      ctx.beginPath()
      ctx.fillStyle=color
      ctx.arc(x,y,r,0,2*Math.PI)
      ctx.fill()
    },
    createDots(){
      
    },
    // regressionFunc(x){
    //   return 0.003*x*x-150
    // },
    calcAxises(){
      let halfHeight=this.halfHeight[this.type],halfWidth=this.halfWidth[this.type]
      let x=-halfWidth,y=-halfHeight,distance=this.distanceOfCenter[this.type]*2
      let halfDistance=distance/2
      let centers=[],i=0
      let func=this.regressionFunc[this.type].func
      let radius=this.radius[this.type]
      while(y<halfHeight){
        while(x<halfWidth){
          let expectY=func(x)
          let r=radius-Math.abs(expectY-y)*0.01
          // r=r>0?r:0
          if(r<=0){
            x+=distance
            continue
          }
          centers.push({x:x,y:y,r:r})
          x+=distance
        }
        x=-halfWidth-halfDistance*(i%2)
        console.log('x',x)
        y+=distance
        i++
      }
      // console.log('centers',centers)
      this.centers=centers
    },
    drawDots(){
      let centers=this.centers,l=centers.length,color=this.dotColor[this.type]
      for(let i=0;i<l;i++){
        this.drawDot(centers[i].x,centers[i].y,centers[i].r,color)
      }
    },
    initCvs(){
      window.addEventListener('resize',()=>{
        var ratio=document.body.clientWidth/375
        this.ratio=ratio
        this.canvas.style.transform=`scale(${ratio},${ratio})`
      })
      this.canvas=this.$refs.canvas
      var ratio=document.body.clientWidth/375
      this.ratio=ratio
      this.canvas.style.transform=`scale(${ratio},${ratio})`
      if(this.type===1){
        this.canvas.style.transform=`scale(${ratio*1},${ratio*1}) rotate(-3deg) translate(-0.05rem,-0.05rem)`
      }
      this.canvas.setAttribute('height',this.halfHeight[this.type]*2+1)
      this.canvas.setAttribute('width',this.halfWidth[this.type]*2+1)
      var ctx=this.canvas.getContext('2d');
      this.ctx=ctx
      ctx.translate(this.halfWidth[this.type],this.halfHeight[this.type])
    },
  },
  mounted(){
    this.initCvs()
    this.calcAxises()
    this.drawDots()
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.dot-bg{
  width: 100%;
}
.canvas{
  /*transform:scale(2,2);*/
  transform-origin:0 0;
  /*width: 3.75rem;*/
  /*height: 1.88rem;*/
  /*border:1px solid red;*/
  

}
.content{
  position: absolute;
  width: 100%;
  top: 0;
}
</style>
