<template>
  <div id="app">
    <div id="nav">
      <!-- This one if desktop -->
      <header class="header_reg">
        <router-link class="logo" to="/">
          <img class="logo" src="assets/Logo.png" alt="Fitness Tracker Logo" />
        </router-link>
        <nav>
          <ul class="nav__links"></ul>
        </nav>
        <router-link class="lgn_btn" to="/login"> Login </router-link>
        <router-link class="lgn_btn" to="/register"> Register </router-link>
      </header>
      <!-- This one if mobile -->
      <header class="header_mobile">
        <router-link class="logo" to="/">
          <img class="logo" src="assets/Logo.png" alt="Fitness Tracker Logo" />
        </router-link>
        <nav>
          <ul class="nav__links"></ul>
        </nav>
        <router-link class="lgn_btn_mobile" to="/login"> Login </router-link>
        <router-link class="lgn_btn_mobile" to="/register"> Register </router-link>
      </header>

    </div>
    <!-- Render the content of the current page view -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    myFunction() {
      const x = document.getElementById('myLinks')
      if (x.style.display === 'block') {
        x.style.display = 'none'
      } else {
        x.style.display = 'block'
      }
    }
  }
}
</script>

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

/* Style the navigation menu */
.topnav {
  overflow: hidden;
  background-color: #333;
  position: relative;
}

/* Hide the links inside the navigation menu (except for logo/home) */
.topnav #myLinks {
  display: none;
}

/* Style navigation menu links */
.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

/* Style the hamburger menu */
.topnav a.icon {
  background: black;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

/* Add a grey background color on mouse-over */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active link (or home/logo) */
.active {
  background-color: #04aa6d;
  color: white;
}
</style>
