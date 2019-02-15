<template>
  <div class="mainIndex">
    <!-- 文案框 -->
    <div class="game-info"></div>
    <div>
      <van-button type="danger" class="paly-game" @click="startGame">开始游戏</van-button>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        startGame() {
            this.$router.push("/info")
        }
    },
};
</script>

<style scoped>
.mainIndex {
  width: 100%;
  height: 80vh;
  background: #edbfb0;
  padding: 10vh 0;
  /* background: #edbfb0 url("../assets/img/index_bg.jpg")  left center no-repeat; */
  /* background-size:contain; */
}
.game-info{
    width: 85%;
    height: 60vh;
    background-color: #fff;
    margin: 0 auto;
    margin-bottom: 10vh;
}
.paly-game {
  margin: 0 auto;
  display: block;
}
</style>