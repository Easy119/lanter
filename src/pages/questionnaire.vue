<template>
  <div class="questionnaire">
    <!-- 页面加载首页 -->
    <div class="home" v-if="home_flag">
        <div class="btn" @click="home_flag = false">受邀参与吱音ziinlife问卷</div>
    </div>
    <div class="home_repeat" v-if="home_flag"></div>
    <!-- 选项个数 -->
    <div class="tabbar">
      <ul>
        <li :class="[count == n-1?'current':'']" v-for="n in 6" :key="n">第{{n}}题</li>
      </ul>
    </div>
    <!-- 选项答案 -->
    <div class="answerBox">
      <div class="answer-header">{{questionObj.questionsTitle}}</div>
      <div>
        <!-- 单选 -->
        <van-radio-group v-model="radio" v-if="count == 0">
          <van-cell-group>
            <van-cell
              v-for="(item,index) in questionObj.questions"
              clickable
              :key="index"
              :title="item.des"
              @click="radio = item.type"
            >
              <van-radio :name="item.type"/>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <!-- 图片 -->
        <img
          src="../assets/images/product.jpg"
          alt
          class="productImg"
          v-if="count == 5"
          @click="showBig"
        >
        <!-- 多选 -->
        <van-checkbox-group v-model="checkedNames" v-if="count != 0">
          <van-cell-group>
            <van-cell
              v-for="(item,index) in questionObj.questions"
              clickable
              :key="index"
              :title="item.des"
            >
              <van-checkbox :name="item.type" ref="checkboxes" class="checkboxes"  :key="index" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </div>
    <!-- next -->
    <div class="next">
      <span @click="next">{{nextMsg}}</span>
    </div>
  </div>
</template>

<script>
import data from "../../static/question.json";
import axios from "axios";
import URL from "../serviceAPI.config.js";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      home_flag:true,
      checkedNames: [],
      radio: "",
      questionObj: {},
      count: 0,
      is_loading: false,
      imgArr: [""],
      nextMsg: "下一题",
      rightAnswer: []
    };
  },
  created() {
    this.questionObj = data[this.count];
  },
  updated() {
    this.questionObj = data[this.count];
  },
  computed: {
    loadingImg() {
      return `/static/images/${this.count}.gif`;
    }
  },
  methods: {
    toggle(index) {
      console.log(index);
      this.$refs.checkboxes[index].toggle();
    },
    showBig() {
      ImagePreview([
        "http://139.196.24.37:8219/static/images/product.jpg"
      ]);
    },
    async next() {
      if (this.count < 5) {
        // 判断是否有数据
        if (this.radio != "" || this.checkedNames.length > 0) {
          this.count == 0
            ? this.checkedNames.push(this.radio)
            : this.checkedNames;
          this.radio = "";
          let answer = {
            id: `title_${this.count + 1}`,
            opts: this.checkedNames
          };
          this.rightAnswer.push(answer);
          this.count += 1;
          this.count == 5 ? (this.nextMsg = "提交") : (this.nextMsg = "下一题");
          this.questionObj = data[this.count];
          this.checkedNames = [];
          this.is_loading = true;
          setTimeout(() => {
            this.is_loading = false;
            this.checkedNames = [];
          }, 1700);
        } else {
          this.$notify({
            message: "选中您要选择的选项",
            duration: 1500,
            background: "#1989fa"
          });
        }
      } else {
        if (this.checkedNames.length > 0) {
          let answer = {
            id: `title_${this.count + 1}`,
            opts: this.checkedNames
          };
          this.rightAnswer.push(answer);
          let resultString = this.rightAnswer;
          // 上传数据
          let sendResult = await this._Api(URL.investSend, { resultString });
          this.$dialog
            .alert({
              title: "ziinlife-生活可以更懂你",
              message: "您的意见是我们继续努力的强大动力"
            })
            .then(() => {
              this.rightAnswer = [];
              this.count = 0;
              this.nextMsg = "下一题";
              this.checkedNames = [];
              this.radio = "";
            });
        } else {
          this.$notify({
            message: "选中您要选择的选项",
            duration: 1500,
            background: "#1989fa"
          });
        }
      }
    },
    selectBox(n) {
      this.count = n - 1;
      this.count == 5 ? (this.nextMsg = "提交") : (this.nextMsg = "下一题");
      this.questionObj = data[this.count];
      this.checkedNames = [];
      this.is_loading = true;
      setTimeout(() => {
        this.is_loading = false;
      }, 1500);
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
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: #f5f5f5;
}

.questionnaire {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
/* home */
.home {
  width: 100%;
  height: 100vh;
  background: #383735 url("../assets/images/home.png") left top no-repeat;
  background-size: 100%;
  z-index: 111;
  position: fixed;
  left: 0;
  top: 0;
}
.home .btn{
  display: block;
  width: 300px;;
  height: 50px;
  color: #fff;
  font-size: 18px;
  line-height: 50px;
  background-color: #ad8d64;
  text-align: center;
  position: absolute;
  left: 50%;;
  top: 80%;
  transform: translate(-50%);
}
/* tabbar */
.tabbar ,.home {
  width: 100%;
}
.tabbar ul {
  height: 40px;
  display: flex;
  align-items: center;
  overflow-y: hidden;
  flex-wrap: nowrap;
  border-bottom: 3px solid #cdcdcd;
}
.tabbar ul li {
  color: #aca9a7;
  font-size: 12px;
  line-height: 37px;
  padding: 0px 18px;
  list-style: none;
  white-space: nowrap;
}
.tabbar ul li.current {
  border-bottom: 2px solid #383735;
  font-weight: bold;
  color: #000;
}
/*  */
.answerBox {
  overflow: scroll;
  height: 500px;
}
.answer-header {
  min-height: 26px;
  text-indent: 1em;
  font-size: 14px;
  line-height: 26px;
  padding: 12px 0;
}
ul.checkBox li {
  font-size: 14px;
  line-height: 48px;
  padding: 0 20px;
}
/*  */
.productImg {
  display: block;
  width: 150px;
  height: 199px;
  margin: 25px auto;
}
/*  */
.next {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 40px;
  left: 0;
}
.next span {
  display: block;
  width: 90%;
  height: 40px;
  background-color: #383735;
  margin: 0 auto;
  color: #ad8d64;
  text-align: center;
  font-size: 14px;
  line-height: 40px;
  border-radius: 4px;
}
/* loadingBox */
.loadingBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
}
.loadingBox img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}
</style>