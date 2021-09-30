<template>
  <div class="container">
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <h2> Login with username </h2>
        <form>
          <div class="form-group">
            <input
              type="username"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="fieldInfo"
              placeholder="Enter username"
            />
            <!-- <input v-if="user === ''" class="loginField" v-model="fieldInfo" placeholder="Username"> -->
          </div>
          <!-- <button type="submit" class="btn btn-primary">Login</button> FOR BELOW: v-if="user === ''" -->
          <p v-if="errorMessage !== ''" class="errorMsg">{{ errorMessage }}</p>
          <a class="loginbtn" href="#">
            <!-- <button>Login</button> -->
            <b-button class="lgn_btn" v-on:click="getUser(fieldInfo)"
              >Login</b-button
            >
          </a>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
export default {
  name: 'login',
  data() {
    return {
      user: '',
      userId: '',
      fieldInfo: '',
      errorMessage: ''
    }
  },
  methods: {
    getUser(username) {
      if (username !== '') {
        this.errorMessage = ''
        Api.get('athletes/' + username)
          .then((response) => {
            console.log(response)
            if (response.data.length < 1) {
              this.errorMessage = 'User not found'
            } else {
              this.user = response.data[0].username
              this.userId = response.data[0]._id
              console.log(this.user + ' with id: ' + this.userId)
              // this.$router.push('/', { user: this.userId })
              this.$router.push({ name: 'userHome', params: { userId: this.userId, userName: this.user } })
            }
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message
          })
      } else {
        this.errorMessage = 'Please enter a username'
      }
    },
    logout() {
      this.user = ''
    }
  }
}
</script>

<style scoped>
.errorMsg {
  color: red;
}

h2 {
  color: rgba(217, 4, 41, 1);;
  padding-bottom: 0.5em;
}
</style>
