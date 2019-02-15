<template>
  <div class="userInfo">
    <div class="info">
      <input type="text" class="user" placeholder="姓名" v-model="username">
      <input type="tel" class="user" placeholder="手机号" v-model="phone">
      <van-button size="large" class="submit" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      phone: ""
    };
  },
  methods: {
    submit() {
      if (this.username != "" && this.phone != "") {
        this.$router.push("/play");
      } else {
          this.$notify({
          message: "填个人信息啊,你个傻叉",
          duration: 1000,
          background: "#1989fa"
        });
      }
    }
  }
};
</script>

<style scoped>
.userInfo {
  width: 100%;
  height: 80vh;
  background: #efd0cb;
  padding: 10vh 0;
}
.info {
  width: 85%;
  height: 80%;
  background-color: #fff;
  margin: 0 auto;
  padding: 10% 0;
}
.info .user {
  display: block;
  width: 80%;
  height: 8vh;
  font-size: 16px;
  line-height: 8vh;
  margin: 8vh auto;
}
.info .submit {
  margin-top: 8vh;
}
</style>