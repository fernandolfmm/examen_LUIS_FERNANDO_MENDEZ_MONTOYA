<template>
  <v-app id="login" class="main">
    <loader :loading="false" animation="lock"/>
    <v-main>
      <v-container class="just-center" style="    position: absolute;
" fluid fill-heigh>
        <v-card color="rgba(255, 255, 255, 0.816)" class="animate__animated animate__bounceInRight mx-auto px-3 py-14 rounded-lg" max-width="450">
          <div class="itemsCenter mb-12">
            <v-img :src="logo" max-width="350"></v-img>
          </div>
          <v-card-text>
            <v-form ref="formLogin" lazy-validation @keyup.enter.native="login()">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field v-model="form.username" label="Usuario" :disabled="loading" outlined required autocomplete="off">
                    <template v-slot:prepend>
                      <div class="just-center mt-2">
                        <v-icon x-large>mdi-account</v-icon>
                      </div>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field v-model="form.password" label="Contraseña" prepend-icon="mdi-lock" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" :disabled="loading" outlined required autocomplete="off">
                    <template v-slot:prepend>
                      <div class="just-center mt-2">
                        <v-icon x-large>mdi-lock</v-icon>
                      </div>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12" md="12">
                <v-btn block color="primary" class="white--text" :loading="loading" @click="login()">Entrar</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <BasicAlert :active.sync="alert.active" :msg="alert.msg" :color="alert.color" />
      </v-container>
            <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </v-main>
    
  </v-app>
</template>
<script>
import "animate.css";
import { Loader, BasicAlert } from "@/components";
import LottieAnimation from "lottie-web-vue";


export default {
  components: {
    Loader,
    BasicAlert,
        LottieAnimation,

  },
  data: () => ({
    version: process.env.VUE_APP_VERSION,
    host: process.env.VUE_APP_API_SERVER,
    email: "",
    active: false,
    password: null,
    show: false,
    loading: false,
    resetMode: false,
    logo: require("@/assets/images/logo.svg"),
    form: {
      username: "",
      password: "",
    },
    alert: {
      active: false,
      color: "error",
      msg: "",
    },
    paths: {
      login: "/api/user/login/v2",
    },
  }),
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    async login() {
            this.$router.push("/home");

    },
  },
};
</script>

<style lang="scss" scoped>

.area{
    background: #007bff;  
    background: -webkit-linear-gradient(to left, #17a2b8, #4e54c8);  
    width: 100%;
    height:100vh;
    
   
}

.circles{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.circles li{
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
    
}

.circles li:nth-child(1){
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}


.circles li:nth-child(2){
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
}

.circles li:nth-child(3){
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}

.circles li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}

.circles li:nth-child(5){
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}

.circles li:nth-child(6){
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
}

.circles li:nth-child(7){
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}

.circles li:nth-child(8){
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}

.circles li:nth-child(9){
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
}

.circles li:nth-child(10){
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}
@keyframes animate {

    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100%{
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }

}
</style>
