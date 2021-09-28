<template>
  <div id="app">
    <div id="nav">
      <header>
        <router-link class="logo" to="/"> <img class="logo"  src="assets/Logo.png" alt="Fitness Tracker Logo"> </router-link>
        <nav>
          <ul class="nav__links">
          </ul>
        </nav>
        <a v-if="'DETERMINEifLOGGEDin' === 'DETERMINEifLOGGEDin'" class="loginbtn" href="login"> <b-button class="lgn_btn">Login</b-button> </a>
        <a v-else class="loginbtn" href="login">  <b-button class="lgn_btn" v-on:click="logout()" >Logout</b-button> </a>
        <a class="registerBtn" href="register"> <b-button class="lgn_btn">Register</b-button> </a>
      </header>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn_message {
  margin-bottom: 1em;
}
.loginField {
  color: white;
}

</style>
