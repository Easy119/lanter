<template>
  <div class="play-game">
    <div class="game-info" v-if="timer">
      <div class="info-words">
        <h2>游戏介绍</h2>
        <p style="text-align:left;text-indent:2em">
          吱音内部员工进入系统后，填写完相关信息后即可参加完成后系统将根据大家猜对灯迷的正确度和答题时间自动进行排名。活动结束选取前5名获的精美礼品一份快来比比看，谁是本次活动的“猜谜王”
        </p>
      </div>
      <!-- 点击知道了开始计时 -->
      <van-button size="large" @click="startTimer" class="close-info-btn">知道了</van-button>
    </div>
    <div class="play-start" v-if="gamePlay">
      <!-- 题目框 -->
      <div class="play-start-question">
        <div class="question">{{questionObj.questionsTitle}}</div>
      </div>
      <p style="text-align:center;font-size:10px;line-height:0">{{questionNum + 1}}/10</p>
      <div class="answer">
        <van-radio-group v-model="radio">
          <ul>
            <li
              class="answer-item"
              v-for="(item,index) in questionObj.questions"
              :title="item.des"
              clickable
              @click="radio = item.id;getRight(item.is_standard_answer)"
              :key="index"
            >
              <span>{{item.type}}</span>
              <span>{{item.des}}</span>
              <van-radio :name="item.id" class="radio-style"/>
            </li>
          </ul>
        </van-radio-group>
      </div>
      <!-- 下一题的 -->
      <div class="btn-group">
        <van-button
          type="default"
          @click="nextQuestion"
          :disabled="questionNum>8"
          class="btn-group-item"
        >下一题</van-button>
        <van-button
          type="default"
          :disabled="questionNum<9"
          @click="submitAnswer"
          class="btn-group-item"
        >提交</van-button>
      </div>
    </div>
    <!-- 结果成绩排行 -->
    <div class="resultRank" v-if="resultFlag">
      <div class="success-words">
        <img src="../assets/img/resultTitle.png" alt width="100%">
      </div>
      <div class="success-score">
        <span>{{score}}分</span>
      </div>
      <div class="success-timer">
        <span>{{userTimer}}</span>
      </div>
      <div class="success-rank">
        <div class="rank-bg">
          <ul>
            <li
              v-for="(item,index) in rankList"
              :key="index"
            >{{index+1}}. {{item.username}} {{item.phone | hiddenPhone}} {{item.timer}} 秒 {{item.score}} 分</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../../static/data.json";
import URL from "../serviceAPI.config.js";
import axios from "axios";
export default {
  created() {
    let test = [];
    for (let i = 0; test.length < 10; i++) {
      let num = Math.floor(Math.random() * 10);
      if (test.indexOf(num) == -1) {
        test.push(num);
        this.questionArray.push(data[num]);
      }
    }
    this.questionObj = this.questionArray[0];
  },
  filters: {
    hiddenPhone(str) {
      return str.substr(0, 3) + "****" + str.substr(7);
    }
  },
  data() {
    return {
      timer: true,
      resultFlag: false,
      gamePlay: false,
      radio: "",
      is_standard_answer: "",
      questionNum: 0,
      questionArray: [],
      questionObj: {},
      rightArr: [],
      start: 0,
      score: "",
      userTimer: "",
      rankList: []
    };
  },
  methods: {
    startTimer() {
      this.$dialog
        .alert({
          title: "友情提醒，机会只有一次，愿你又快又好",
          message:
            "我知道你不会看完游戏介绍，所以友情提醒一下，机会真的只有一次,当你点击确认的时间，游戏就开始计时了！！！"
        })
        .then(() => {
          let Nowtimer = new Date().getTime();
          this.start = Nowtimer;
          this.timer = false;
          this.gamePlay = true;
        });
      // let Nowtimer = new Date().getTime();
      // this.start = Nowtimer;
      // this.timer = false;
      // this.gamePlay = true;
    },
    getRight(rightNum) {
      this.is_standard_answer = rightNum;
    },
    nextQuestion() {
      let is_standard_answer = this.is_standard_answer;
      if (typeof is_standard_answer == "number") {
        this.rightArr.push(this.is_standard_answer);
        this.questionNum += 1;
        let questionNum = this.questionNum;
        this.questionObj = this.questionArray[questionNum];
        this.is_standard_answer = "";
      } else {
        this.$notify({
          message: "请选择答案啊,童鞋儿",
          duration: 1000,
          background: "#69423b"
        });
      }
    },
    async submitAnswer() {
      let is_standard_answer = this.is_standard_answer;
      if (typeof is_standard_answer == "number") {
        this.rightArr.push(this.is_standard_answer);
        let endtimer = new Date().getTime();
        let timer = (endtimer - this.start) / 1000;
        let sumNum = this.rightArr.reduce((tmp, item, index) => {
          return tmp + item;
        });
        this.gamePlay = false;
        this.resultFlag = true;
        this.is_standard_answer = "";
        this.radio = "";
        this.score = sumNum * 10;
        this.userTimer = timer + "秒";
        if (localStorage.getItem("count") == "ok") {
          this.$notify({
            message: "后台显示您之前已经提交过了,本次成绩仅供娱乐,元宵节快乐!",
            duration: 5000,
            background: "#69423b"
          });
          let getRank = await this._Api(URL.getRank, {});
          this.rankList = getRank.msg;
        } else {
          this.sendResult(localStorage.getItem("username"),localStorage.getItem("phone"),timer,this.score);
        }
      } else {
        this.$notify({
          message: "请选择答案啊,童鞋儿",
          duration: 1000,
          background: "#69423b"
        });
      }
    },
    async sendResult(username, phone, timer, score) {
      let sendMsg = await this._Api(URL.sendResult, {
        username,
        phone,
        timer,
        score
      });
      if (sendMsg.code == 0) {
        localStorage.setItem("count", "ok");
        let getRank = await this._Api(URL.getRank, {});
        this.rankList = getRank.msg;
      } else {
        this.$notify({
          message: "网络请求异常，请重新尝试",
          duration: 1000,
          background: "#1989fa"
        });
      }
    },
    _Api(url, opts) {
      return new Promise((resolve, reject) => {
        axios
          .post(url, opts)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>

<style scoped>
.play-game {
  width: 100%;
  min-height: 100vh;
  background: #ff8c7d url("../assets/img/user_info.png") left top no-repeat;
  background-size: 100%;
}
.game-info {
  width: 85%;
  height: 100%;
  margin: 0 auto;

}
.close-info-btn {
  background: url("../assets/img/btn.png") center center no-repeat;
  background-size: 100% 100%;
  height: 0.8rem !important;
  width: 2.467rem !important;
  border: none;
  color: #fff;
  line-height: 0.8rem;
  margin: 2rem auto 0;
  display: block;
}
.info-words {
  width: 100%;
  height: 40%;
  padding-top: 20%;
  text-align: center;
  font-size: 14px;
}
.play-start {
  width: 100%;
  height: 100vh;
  background: url("../assets/img/play_bg.png") left top no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding-top: 3.733rem;
}
.play-start-question {
  width: 100%;
  height: 4.88rem;
}
.play-start .question {
  margin: 0 auto;
  width: 7.032rem;
  height: 4.88rem;
  background: url("../assets/img/question.png") center center no-repeat;
  background-size: contain;
  font-size: 14px;
  padding: 0.6rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  color: #fff;
}
.play-game .answer {
  width: 100%;
  /* margin-bottom: 0.2rem; */
}
.answer-item {
  background: url("../assets/img/anwser.png") center center no-repeat;
  background-size: contain;
  height: 1.1rem;
  width: 5.227rem;
  margin: 0 auto;
  font-size: 12px;
  line-height: 0.7rem;
  color: #fff;
  padding: 0.2rem 0.333rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}
/* .answer-item .radio-style i.van-icon {
  width: 0.413rem !important;
  height: 0.413rem !important;
  display: block;
} */
.btn-group {
  display: flex;
  justify-content: space-around;
  width: 7.32rem;
  height: 0.8rem;
  margin: 0 auto;
}
.btn-group-item {
  background: url("../assets/img/btn.png") center center no-repeat;
  background-size: 100% 100%;
  height: 0.8rem !important;
  width: 2.467rem !important;
  border: none;
  color: #fff;
  line-height: 0.8rem;
}
.resultRank {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  font-size: 14px;
  overflow: hidden;
  padding-top: 2.387rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.success-words img,
.success-score span,
.success-timer span {
  display: block;
  width: 5.227rem;
  height: 1.907rem;
  margin: 0 auto;
}
.success-score,
.success-timer,
.success-words {
  height: 1.907rem;
  width: 100%;
  margin-bottom: 0.607rem;
}
.success-score span {
  background: url("../assets/img/resultScore.png") center center no-repeat;
  background-size: contain;
  padding: 1rem 0.267rem 0.267rem 0.267rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  line-height: 0.657rem;
  color: #fff;
}
.success-timer span {
  background: url("../assets/img/resultTimer.png") center center no-repeat;
  background-size: contain;
  padding: 1rem 0.267rem 0.267rem 0.267rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  line-height: 0.657rem;
  color: #fff;
}
.success-rank {
  width: 100%;
  height: 3.587rem;
}
.success-rank .rank-bg {
  background: url("../assets/img/resultRank.png") center center no-repeat;
  background-size: contain;
  width: 5.227rem;
  height: 100%;
  margin: 0 auto;
  padding: 1rem 0.267rem 0.267rem 0.267rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.rank-bg ul {
  background-color: #69423b;
  font-size: 12px;
  overflow: scroll;
  color: #fff;
  width: 4.693rem;
  height: 2rem;
}
</style>