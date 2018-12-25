<template>
  <div style="margin-top:100px">
    <el-form :model="form">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="文件" label-width="50px">
        <el-upload
          action=""
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          ref="upload"
        >
          <!-- :http-request="upload" -->
          <!--<el-button size="small" type="primary">点击上传</el-button>-->
          <!--<div slot="tip" class="el-upload__tip">只能上传pdf文件</div>-->
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="upload">确定</el-button>
  </div>
</template>

<script>
  const uuidv5 = require('uuid/v5');
  export default {
    data() {
      return {
        form: {
          name: '',
          age: ''
        }
      }
    },
    methods: {
      upload() {
        const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

        console.log(uuidv5('Hello, World!', MY_NAMESPACE));
      },
      upload1() {
        const formData = new FormData();
        const file = this.$refs.upload.uploadFiles[0];
        const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
        // if (!file) { // 若未选择文件
        //   alert('请选择文件');
        //   return;
        // }
        formData.append('file', file.raw);
        formData.append('name', this.name);
        this.$http.post('/api/' ,formData,  headerConfig).then(res => {
          console.log(123);
          console.log(res);
        }).catch(function (error) {
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            // console.log(error.response.data);
            console.log(error.response.status);
            // console.log(error.response.headers);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          // console.log(error.config);
        });
      }

    }
  }
</script>

<style scoped>

</style>
