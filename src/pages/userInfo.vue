<template>
  <div class="userInfo">
    <div class="userName">
      <div class="user-name">
        <input type="text" class="user" v-model="username">
      </div>
    </div>
    <div class="userPhone">
      <div class="user-phone">
        <input type="tel" class="user" v-model="phone">
      </div>
    </div>
    <div class="userSubmit">
      <img src="../assets/img/user_info_submit.png" alt class="submit" @click="submit" width="100%">
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
    checkPhone(phone) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
        alert("手机号格式错误");
        return false;
      } else {
        return true;
      }
    },
    submit() {
      if (this.username != "" && this.phone != "" && this.checkPhone(this.phone)) {
        localStorage.setItem("username",this.username);
        localStorage.setItem("phone",this.phone)
        this.$router.push("/play");
      } else {
        this.$notify({
          message: "请填个人信息啊,童鞋儿",
          duration: 1000,
          background: "#69423b"
        });
      }
    }
  }
};
</script>

<style scoped>
.userInfo {
  width: 100%;
  height: 100vh;
  background: #ff8c7d url("../assets/img/user_info.png") left top no-repeat;
  background-size: 100%;
  position: relative;
}
.userName,
.userPhone,
.userSubmit {
  width: 100%;
  height: 1.307rem;
  position: absolute;
  left: 0;
  top: 4.427rem;
}
.user-name {
  width: 5.227rem;
  height: 1.307rem;
  background: url("../assets/img/user_info_name.png") left top no-repeat;
  background-size: 100%;
  padding-top: 0.6rem;
  margin: 0 auto;
}
.userPhone {
  top: 8.053rem;
}
.user-phone {
  width: 5.227rem;
  height: 1.307rem;
  background: url("../assets/img/user_info_phone.png")left top no-repeat;
  background-size: 100%;
  padding-top: 0.6rem;
  margin: 0 auto;
}
.user-name .user,
.user-phone .user {
  display: block;
  width: 80%;
  height: 0.85rem;
  margin: 0 auto;
  border: none;
  background-color: #69423b;
  color: #fff;
  font-size: 16px;
  line-height: 0.6rem;
  text-align: center;
}
.userSubmit {
  top: 11.467rem;
}
.submit {
  display: block;
  width: 5.227rem;
  height: 1.907rem;
  margin: 0 auto;
}
</style>