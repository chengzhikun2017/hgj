<template>
  <div class="editPwd hgj-container" flex="dir:top">
    <app-nav flex-box="0">修改密码</app-nav>
    <article flex-box="1">
      <app-formitem label="输入原来的密码" :first="true">
        <app-input v-model='pwd' class='form-input' :placeholder="'请输入原密码'" :type='pwdType'/>
      </app-formitem>
      <app-formitem label="输入新密码" :last="true">
        <app-input class='form-input' v-model='newPwd' :placeholder="'请输入新密码'" :type='pwdType'/>
      </app-formitem>
      <div class="mybutton">
        <app-button @click.native='submit'>确认修改</app-button>
      </div>
    </article>
  </div>
</template>
<script>
  import {mapActions,mapMutations} from 'vuex'
  import helper from '../utils/helper.js'
  export default {
    data () {
      return {
        pwd:'',
        newPwd:'',
        pwdType:'password',
      }
    },
    methods:{
      submit(){
        this.account_modifyPwd({
          password: this.pwd,
          newPassword: this.newPwd
        }).then((res)=>{
          this.hgjToast({
            content:'修改成功',
            cbEntered:()=>{
              this.router_willBackToIndex()
              helper.goPage(-1)
            },
          })
        })
      },
      ...mapMutations([
        'router_willBackToIndex',
        ]),
      ...mapActions([
        'account_modifyPwd',
        ]),
    },
  }
</script>
<style lang="scss" scoped>
  .editPwd {
    article {
      .mybutton {
        margin-top:0.36rem;
        padding:0 0.2rem;
      }
    }
  }
</style>