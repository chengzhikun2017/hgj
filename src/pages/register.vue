<template>
  <div class="register hgj-container" flex="dir:top">
    <app-nav title="注册页" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="logo"></div>
      <div class="form">
        <div class="label">
          <span class="icon-account"></span>
          <span class="label-name">手机号</span>
        </div>
        <div class="input">
          <app-input v-model='phone' ref='phoneInput' class='login-input' :placeholder='"请输入手机号"'></app-input>
        </div>
        <div class="mybutton">
          <app-button @click.native='goSignUp'>获取验证码</app-button>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import Regs from '../utils/reg.js'
  import {mapActions} from 'vuex'
  // import API from '../api'
  // import accountAPI from '../api/account.js'

  export default {
    data () {
      return {
        phone:'',
      }
    },
    methods:{
      goSignUp(){
        console.log('this.$router',this,this.$router)
        this.$router.push('/signin')
      },
      ...mapActions({
        isPhoneRegisted:'account_isPhoneRegister'
      })
    },
    computed:{
      phoneValid(){
        return Regs.phone(this.phone)
      },
    },
    watch:{
      phoneValid(v){
        if(v){
          console.log('phone is valid')
          this.isPhoneRegisted(this.phone).then(res=>{
            console.log('res,account_isPhoneRegister',res)
            if(res.status===1){
              this.hgjAlert({
                title:'已有账号',
                // todo
                // options:[

                // ],
              })
            }
          })
        }
        this.$store.commit('account_setPhone',this.phone)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .register {
    
    article {
      background: white;
      padding: 0 0.2rem;
      .logo {
        width: 100%;
        height: 1.22rem;
      }
    }
    .form {
      .label {
        padding-top: 0.1rem;
        font-size: 0.14rem;
        color: #a4a4a4;
        .label-name {
          padding-left: 0.05rem;
        }
      }
      .input {
        width: 100%;
      }
    }
    .mybutton {
      margin-top: 1.68rem;
    }
  } 
</style>