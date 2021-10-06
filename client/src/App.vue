<template>
  <div id="app">
    <div id="nav">
      <header>
        <router-link class="logo" to="/"> <img class="logo"  src="assets/Logo.png" alt="Fitness Tracker Logo"> </router-link>
        <nav>
          <ul class="nav__links">
          </ul>
        </nav>
        <router-link class="lgn_btn" to="/login">
          Login
        </router-link>
        <router-link class="lgn_btn" to="/register">
          Register
        </router-link>
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
