<template>
  <div>
    <b-btn @click="show=true" variant="success" class="user-center-button">意见反馈</b-btn>
    <b-modal v-model="show"
             title="欢迎为 WebList 提出意见反馈">
      <b-container fluid>
        <b-form>
          <b-form-group v-if="!anonymous">
            <b-form-input type="text"
                          v-model="form.name"
                          :disabled="anonymous"
                          maxlength="100"
                          required
                          placeholder="输入姓名/联系方式">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input type="text"
                          v-model="form.content"
                          maxlength="500"
                          required
                          placeholder="输入内容" style="height: 100px">
            </b-form-input>
          </b-form-group>
        </b-form>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <el-switch
          v-model="anonymous"
          active-text="匿名"
          active-color="#13ce66">
        </el-switch>
        <b-button type="submit" variant="primary" @click="onSubmit()">提交</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import services from '@/http/services'

  export default {
    name: "feedback",
    data() {
      return {
        show: false, // 模态框
        anonymous: true, // 匿名
        form: {
          name: '',
          content: '',
        },
      }
    },
    methods: {
      onSubmit() {
        if (this.form.content != '') {
          services.weblist.feedback(this.form.name, this.form.content);
          this.show = false;
          this.form.content = '';
          alert('提交成功，感谢您的反馈!')
        }
        else{
          alert('请填写内容!')
        }
      }
    }
  }
</script>
<style scoped>
  .user-center-button {
    position: fixed;
    bottom: 10px;
    right: 10px;
    text-decoration: none;
    font-size: 12px;
    padding: 9px 12px;
    z-index: 100;
  }
</style>
