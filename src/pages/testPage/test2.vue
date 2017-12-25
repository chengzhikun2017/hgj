<template>
  <div>
    <div @click='testGet'>test get</div>
    <div @click='test'>test post</div>
    <div @click='testXHR'>test xhr post</div>
    <div @click='testPost'>test not fetch post</div>
  </div>
</template>

<script>
import testFetch from '../../api/test.js'
import axios from 'axios'
export default {
  data() {
    return {
    
    }
  },
  methods:{
    testGet(){
      var fetchPro=testFetch.isPhoneRegister(17702103430)
      fetchPro.then(res=>{
        console.log('res',res)
      })
    },
    test(){
      var fetchPro=testFetch.testPost()
      fetchPro.then(res=>{
        console.log('res',res)
      })
    },
    testXHR(){
      var formData = new FormData();
      // var cfg = this.uploadConfig
      // formData.append('imgFile', this.input.files[0])

      // for (let key in cfg.data) {
      //   formData.append(key, cfg.data[key])
      // }
      // console.log('formData',formData) // sorry this can't work
      var xhr = new XMLHttpRequest()
      xhr.withCredentials = true;
      xhr.open('POST','http://106.14.119.213:9009/api/card/bindCC')
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log('success', xhr.response)
          this.response = {}
          this.response.body = JSON.parse(xhr.response)
            // console.log('this,response',JSON.parse(xhr.response))          
          publicFun.postRes(this.response, this)
        }
        // console.log('xhr ready change')
        // console.log('xhr',xhr.readyState)
        // console.log('xhr',xhr.response)
        // console.log('xhr',xhr)
      }, false)
      xhr.onerror = function(e) {
        console.log('error', e)
      }
      xhr.onloadstart = function() {
        console.log('start upload')
      }

      if (!xhr.upload) {
        console.log('xhr.upload error')
      } else {
        if (xhr.upload.onprogress === undefined) {
          console.log('xhr.upload.onprogress error')
        } else {
          xhr.upload.addEventListener("progress", (e) => {
            console.log('progress', e)
            var percentage = Math.round((e.loaded * 100) / e.total);
            this.loadingText = percentage + '%'
            console.log('loaded', percentage)
          })
        }
      }


      // xhr.
      // xhr.upload.addEventListener("progress", function(e) {
      // if (e.lengthComputable) {

      //  console.log('progrssing')
      // }
      // }, false);
      xhr.send(formData)
    },
    testPost(){
      axios.post('/api/card/bindCC', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    },
  },
  events: {},
  components: {}
}
</script>

<style>

</style>
