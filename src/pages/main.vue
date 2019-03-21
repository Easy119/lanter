<template>
  <div class="mainIndex">
    <!-- 文案框 -->
    <div class="game-info"></div>
    <div class="game-button">
      <img src="../assets/img/play_game.jpg" alt=""  @click="startGame" class="paly-game">
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
  height: 100vh;
  background: #69423b url("../assets/img/index_bg.png")  left top no-repeat;
  background-size:  100%;
  position: relative; 
}
.game-button{
  position: absolute;
  left: 0;
  bottom: 1.227rem;
  width: 100%;
  height: 0.813rem;

}
.paly-game {
  display: block;
  width: 2.47rem;
  height: 0.813rem;
  margin: 0 auto;
}
</style>