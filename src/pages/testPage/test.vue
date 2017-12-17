<template>

  <div>
    <!-- <input type="month" id='test'> -->
<!--     <div class="holder">
      
    </div> -->
    <p>select:</p>
    <div id="test-select">
      <app-select :options='options' v-model='selectValue' :cb='callbackTest'></app-select>
    </div>
    <p>input:</p>
    <div id="test-input">
      <app-input v-model='valueInput' :placeholder='placeholder' ref='appInput' :onSubmit='submitInput1'></app-input>
    </div>
    <p>input:</p>
    <div id="test-input">
      <app-input v-model='valueInput2' :placeholder='placeholder' ref='appInput2' :type='"password"' :onSubmit='submitInput2'></app-input>
    </div>
    <button @click='alert'>alert</button>
    <button @click='alert2'>alert only title</button>
    <button @click='alert_showLoading'>show loading</button>
    <button @click='alert_toast1'>show toast with no callback</button>
    <button @click='alert_toast2'>show toast with callback</button>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      options:[
        {value:1},
        {value:2},
        {value:3},
        {value:4},
        {value:5},
        {value:6},
      ],
      selectValue:'',
      valueInput:'',
      valueInput2:'',
      placeholder:'请输入'
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  created(){
    
  },
  methods:{
    submitInput1(){
      console.log('submitInput1 this',this)
      this.$refs.appInput2.$refs.input.focus()
    },
    submitInput2(){
      alert("提交啦~")
    },
    alert(){
      this.hzgAlert({
        title:'提示标题',
        content:'提示内容*****',
        options: [{
          text: 'yes',
          callback: () => {
            console.log('clicked yes')
          }
        }, {
          text: 'no',
          callback: () => {
            console.log('clicked no')
          }
        }, ],
      })
    },
    alert2(){
      this.hzgAlert({title:'alert alert'})
    },
    alert_toast1(){
      // this.$store.commit('alert_showToast','111')
      this.hzgToast('hahah')
    },
    alert_toast2(){
      this.hzgToast({
        content:'toast with callback',
        cbLeave: () => {
          console.warn('toast leaved')
        },
        cbEnter: () => {
          console.warn('toast entered')
        },
      })
    },
    callbackTest(){
      
      console.log('this.$ref.appInput.$refs.input',this.$refs.appInput.$refs.input)
      this.$refs.appInput.$refs.input.focus()
      console.log('test call back of select')
    },
    ...mapMutations({
      alert_stopLoading:'alert_stopLoading',
      alert_showLoading:'alert_showLoading',
      
    }),
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.holder{
  height: 3rem;
}
button{
  /*border:1px solid red;*/
  background: #ccc;
}
  #test-select{
    height: 0.6rem;
    width: 1rem;
    font-size: 0.25rem;
    color:red;
  }
  #test-input{
    height: 0.4rem;
    /*border:1px solid red;*/
    font-size: 0.2rem;
    color:blue;
    width: 2rem;
    padding:0.05rem;
  }
</style>
