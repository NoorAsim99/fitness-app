<template>
  <div>
    <div class="center-content">
      <router-link class="logo" to="/register"> <img
        id="previewImg"
        src="assets/Preview.png"
        alt="Features preview and signup"
      /> </router-link>
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
      user: '',
      fieldInfo: ''
    }
  },
  methods: {
    getUser(username) {
      Api.get('athletes/' + username)
        .then((response) => {
          console.log(response)
          this.user = response.data[0].username
          console.log(this.user)
        })
        .catch((error) => {
          this.message = error
        })
    },
    logout() {
      console.log('logout the user')
    }
  }
}
</script>

<style scoped>
.btn_message {
  margin-bottom: 1em;
}
.loginField {
  color: white;
}
</style>
