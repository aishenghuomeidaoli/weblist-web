<template>
  <div>
    <b-btn @click="show=true" variant="success" class="user-center-button">用户中心</b-btn>
    <b-modal v-model="show"
             title="欢迎使用 Web List">
      <b-container fluid>
        <b-tabs class="gallery">
          <b-tab title="登录" active>
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group id="exampleInputGroup2"
                            label="用户名:"
                            label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="text"
                              v-model="loginForm.username"
                              required
                              placeholder="输入用户名">
                </b-form-input>
              </b-form-group>
              <b-form-group id="exampleInputGroup3"
                            label="登录密码:"
                            label-for="exampleInput3">
                <b-form-input id="exampleInput3"
                              type="password"
                              v-model="loginForm.password"
                              required
                              placeholder="输入密码">
                </b-form-input>
              </b-form-group>
            </b-form>
          </b-tab>
          <b-tab title="注册">
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group id="exampleInputGroup2"
                            label="用户名:"
                            label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="text"
                              v-model="loginForm.username"
                              required
                              placeholder="输入用户名">
                </b-form-input>
              </b-form-group>
              <b-form-group id="exampleInputGroup3"
                            label="登录密码:"
                            label-for="exampleInput3">
                <b-form-input id="exampleInput3"
                              type="password"
                              v-model="loginForm.password"
                              required
                              placeholder="输入密码">
                </b-form-input>
              </b-form-group>
              <b-form-group id="exampleInputGroup3"
                            label="再次输入密码:"
                            label-for="exampleInput4">
                <b-form-input id="exampleInput4"
                              type="password"
                              v-model="loginForm.passwordRepeat"
                              required
                              placeholder="再次输入密码">
                </b-form-input>
              </b-form-group>
            </b-form>
          </b-tab>
        </b-tabs>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-button type="submit" variant="primary">提交</b-button>
        <b-button type="reset" variant="danger">重置</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "auth",
    data() {
      return {
        show: false, // 模态框
        loginForm: {
          username: '',
          password: '',
          passwordRepeat: ''
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.loginForm.username = '';
        this.loginForm.password = '';
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
  }

</style>
