<template>
  <div class="play-game">
    <div class="game-info" v-if="timer">
      <div class="info-words">游戏介绍</div>
      <!-- 点击知道了开始计时 -->
      <van-button size="large" @click="startTimer">知道了</van-button>
    </div>
    <div class="play-start" v-if="gamePlay">
      <!-- 题目框 -->
      <div class="question">{{questionObj.questionsTitle}}</div>
      <div class="answer">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell
              v-for="(item,index) in questionObj.questions"
              :title="item.des"
              clickable
              @click="radio = item.id;getRight(item.is_standard_answer)"
              :key="index"
            >
              <van-radio :name="item.id"/>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <!-- 下一题的 -->
      <div class="btn-group">
        <van-button type="default" @click="nextQuestion" :disabled="questionNum>3">下一题</van-button>
        <van-button type="default" :disabled="questionNum<4" @click="submitAnswer">提交</van-button>
      </div>
    </div>
    <!-- 结果成绩排行 -->
    <div class="resultRank" v-if="resultFlag">
      <div class="success-words">
        <h1>恭喜完成</h1>
      </div>
      <div class="success-score">
        <h1>分数：{{score}}分</h1>
      </div>
      <div class="success-timer">
        <h1>用时：{{userTimer}}</h1>
      </div>
      <div class="success-rank">
        <ul>
          <li v-for="(item,index) in rankList" :key="index">
              No.{{index+1}}  {{item.username}} {{item.phone}} {{item.timer}} 秒
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../../static/data.json";
import axios from "axios";
export default {
  created() {
    let test = [];
    for (let i = 0; i < 10; i++) {
      let num = Math.floor(Math.random() * 10);
      if (test.indexOf(num) == -1 && test.length < 5) {
        test.push(num);
        this.questionArray.push(data[num]);
      }
    }
    this.questionObj = this.questionArray[0];
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
      rankList:[]
    };
  },
  methods: {
    startTimer() {
      let Nowtimer = new Date().getTime();
      this.start = Nowtimer;
      this.timer = false;
      this.gamePlay = true;
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
          message: "选择答案啊,你个傻叉",
          duration: 1000,
          background: "#1989fa"
        });
      }
    },
    submitAnswer() {
      let is_standard_answer = this.is_standard_answer;
      if (typeof is_standard_answer == "number") {
        this.rightArr.push(this.is_standard_answer);
        let endtimer = new Date().getTime();
        let timer = (endtimer - this.start) / 1000;
        console.log(endtimer - this.start);
        console.log(this.rightArr);
        let sumNum = this.rightArr.reduce((tmp, item, index) => {
          return tmp + item;
        });
        this.gamePlay = false;
        this.resultFlag = true;
        this.is_standard_answer = "";
        this.radio = "";
        this.score = sumNum * 20;
        this.userTimer = timer + "秒";
        this.sendResult(
          `box_${Math.random()}`,
          "17521510410",
          timer,
          this.score
        );
      } else {
        this.$notify({
          message: "选择答案啊,你个傻叉",
          duration: 1000,
          background: "#1989fa"
        });
      }
    },
    async sendResult(username, phone, timer, score) {
        let sendMsg = await this._Api("http://192.168.1.213:8089/Lanter/sendResult",{username, phone, timer, score});
        if(sendMsg.code == 0){
            let getRank = await this._Api("http://192.168.1.213:8089/Lanter/getRank",{});
            this.rankList = getRank.msg;
        }
     
    },
    _Api(url,opts) {
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
  height: 80vh;
  background: #c05545;
  padding: 10vh 0;
}
.game-info {
  width: 85%;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
}
.info-words {
  width: 100%;
  height: 80%;
  text-align: center;
  vertical-align: middle;
}
.play-start {
  width: 85%;
  height: 100%;
  margin: 0 auto;
  background-color: #be9a9c;
}
.play-start .question {
  width: 100%;
  height: 35vh;
}
.btn-group {
  margin-top: 3vh;
  display: flex;
  justify-content: space-around;
}
.resultRank {
  width: 85%;
  height: 100%;
  margin: 0 auto;
  background-color: #be9a9c;
}
</style>