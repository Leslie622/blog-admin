<template>
  <transition appear name="checkUserPGTransition">
    <div class="checkUser">
      <transition
        appear
        enter-active-class="animate__animated animate__lightSpeedInLeft"
      >
        <div class="content">
          <div class="verify">
            <div class="verifyContent">
              <div class="formContent">
                <input type="text" class="verifyInput" v-model="account" />
                <div class="verifyText">请输入账号</div>
                <input type="text" class="verifyInput" v-model="password" />
                <div class="verifyText">请输入密码</div>
              </div>
              <div class="enter checkUserButton" @click="LoginRequest">
                Enter
              </div>
            </div>
          </div>
          <div class="hint">
            <div class="hintContent">
              <div class="hintText">
                如果您不是本站管理员
                <br />
                <br />请返回
              </div>
              <div class="back checkUserButton">Back</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
 
<script>
import { request } from "network/request";
import { LoginRequest } from "common/utils";

import axios from "axios";
export default {
  name: "",
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    LoginRequest,
  },
};
</script>

<style scoped>
.checkUser {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100vw;
  min-width: 1650px;
  height: 100vh;
  font-family: 幼圆;
  background: url("~assets/img/bg/checkUser.png") center / 110% no-repeat;
  animation: rollbg 5s linear infinite;
}

.content {
  position: relative;
  width: 800px;
  height: 480px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 10px 10px 48px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  overflow: hidden;
}

.verify {
  height: 480px;
  background: linear-gradient(60deg, rgb(20, 113, 160), rgb(121, 150, 223));
  clip-path: polygon(0 0, 48% 0, 55% 100%, 0 100%);
}

.hint {
  position: absolute;
  top: 0;
  width: 800px;
  height: 480px;
  background: linear-gradient(-60deg, rgb(252, 148, 132), rgb(253, 185, 174));
  clip-path: polygon(100% 0, 48% 0, 55% 100%, 100% 100%);
}

.hintContent,
.verifyContent {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;
  top: 100px;
  right: 45px;
  width: 300px;
  height: 250px;
  text-align: center;
}

.hintText {
  font-size: 30px;
  color: white;
}

.checkUserButton {
  width: 140px;
  height: 60px;
  border-radius: 30px;
  font-size: 30px;
  line-height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 0 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.enter {
  text-shadow: 0 0 1px rgb(253, 185, 174);
  color: rgb(253, 155, 140);
}

.back {
  color: rgb(20, 113, 160, 0.8);
}

.back:active,
.enter:active {
  box-shadow: none;
}

.verifyContent {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;
  top: 100px;
  left: 45px;
  width: 300px;
  height: 250px;
  text-align: center;
}

.verifyText {
  opacity: 0;
  font-size: 25px;
  color: white;
  pointer-events: none;
  transform: translateY(-30px);
  transition: all ease 0.7s;
}

.verifyInput {
  width: 200px;
  height: 40px;
  margin-top: 20px;
  padding: 0 10px;
  border: none;
  border-radius: 5px;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
}

.verifyInput:focus + div {
  opacity: 1;
  transform: translateY(-75px);
}

@keyframes rollbg {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
