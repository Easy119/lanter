<template>
  <div class="container">
    <div class="player">
      <video-player  class="video-player vjs-custom-skin" 
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                      @ended="onPlayerEnded($event)"
      >
      </video-player>
    </div>
  </div>
</template>
 
<script>
import { videoPlayer } from "vue-video-player";
export default {
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.3,1.5,1.7, 2.0,3], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "4:3", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "../../static/video/18-webpack的打包分析报表插件与优化总结.mp4" //你的视频地址（必填）
          }
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        // controlBar: {
        //   timeDivider: true,
        //   durationDisplay: true,
        //   remainingTimeDisplay: false,
        // //   fullscreenToggle: true //全屏按钮
        // }
      }
    };
  },
  components: {
    videoPlayer
  },
  methods: {
    onPlayerPlay(player) {
      console.log(player.cache_.sources[0].src);
    },
    onPlayerPause(player) {
      console.log("onPlayerPause");
    },
    onPlayerEnded(player) {
      let string = player.cache_.sources[0].src;
      if (string == "../../../static/video/ziinlife.mp4") {
        this.$refs.videoPlayer.player.src(
          "../../../static/video/ziinlife_2.mp4"
        );
      } else if (string == "../../../static/video/ziinlife_2.mp4") {
        this.$refs.videoPlayer.player.src(
          "../../../static/video/ziinlife_3.mp4"
        );
      } else if(string == "../../../static/video/ziinlife_3.mp4"){
        this.$refs.videoPlayer.player.src(
          "../../../static/video/ziinlife_4.mp4"
        );
      }else {
         this.$refs.videoPlayer.player.src(
          "../../../static/video/ziinlife.mp4"
        );
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
.container {
  background-color: #000000;
  min-height: 100%;
}
</style>
