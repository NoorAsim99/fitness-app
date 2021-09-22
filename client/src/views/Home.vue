<template>
  <div>
    <!--
    <b-jumbotron header="DIT341 Frontend" lead="Welcome to your DIT341 Frontend Vue.js App">
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()" >Get Message from Server</b-button>
      <p>Message from the server:<br/>
      {{ message }}</p>
    </b-jumbotron>
    -->

    <header>
        <img class="logo" src="assets/Logo.png" alt="Fitness Tracker Logo">
        <nav>
          <ul class="nav__links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">{{ message }}</a></li>
          </ul>
        </nav>
        <a class="loginbtn" href="#"> <!-- <button>Login</button> --> <b-button class="lgn_btn" v-on:click="getMessage()" >Login</b-button> </a>
      </header>

      <div class="center-content">
        <img id="previewImg" src="assets/Preview.png" alt="Features preview & signup">

        <img id="loginImg" src="assets/LoginBg.png" alt="Blured colors">

      </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/api/athletes')
        .then(response => {
          console.log(response)
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
