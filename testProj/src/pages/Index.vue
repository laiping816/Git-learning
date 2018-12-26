<template>
  <div style="margin-top:100px">
    <el-form :model="form">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="文件" label-width="50px">
        <el-upload
          class="avatar-uploader"
          :show-file-list="true"
          action=""
          :auto-upload="false"
          ref="upload">
          <img v-if="imageUrl" :src="`http://localhost:1337/img/person/${imageUrl}`" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!--<el-upload-->
          <!--action=""-->
          <!--list-type="picture-card"-->
          <!--:auto-upload="false"-->
          <!--:limit="1"-->
          <!--ref="upload"-->
        <!--&gt;-->
          <!--&lt;!&ndash; :http-request="upload" &ndash;&gt;-->
          <!--<i class="el-icon-plus"></i>-->
        <!--</el-upload>-->
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="upload">确定</el-button>
  </div>
</template>

<script>
  const uuidv5 = require('uuid/v5');
  // import Excel from 'exceljs'
  export default {
    data() {
      return {
        form: {
          name: '',
          age: ''
        },
        imageUrl: ''
      }
    },
    methods: {
      upload2() {
        const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

        console.log(uuidv5('Hello, World!', MY_NAMESPACE));
      },
      upload() {
        this.$http.delete('/api/img/place', {
          params: {
            uuid: ["0d948570-08de-11e9-928a-8bd2af3d0e1d.jpeg"]
          }
        }).then(res => {
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
      },
      upload2() {
        const formData = new FormData();
        const file = this.$refs.upload.uploadFiles[0];
        const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
        // if (!file) { // 若未选择文件
        //   alert('请选择文件');
        //   return;
        // }
        formData.append('file', file.raw);
        formData.append('name', this.name);
        this.$http.post('/api/img/place' ,formData,  headerConfig).then(res => {
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
