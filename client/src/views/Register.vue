<template>
  <div class="container">
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <h2> Register an account </h2>
        <form>
          <div class="form-group">
            <input
              type="username"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="fieldInfo"
              placeholder="Enter a username"
            />
            <!-- <input v-if="user === ''" class="loginField" v-model="fieldInfo" placeholder="Username"> -->
          </div>
          <!-- <button type="submit" class="btn btn-primary">Login</button> FOR BELOW: v-if="user === ''" -->
          <p v-if="errorMessage !== ''" class="errorMsg">{{ errorMessage }}</p>
          <p v-else-if="successMessage !== ''" class="successMsg">{{ successMessage }}</p>
          <a class="loginbtn" href="#">
            <!-- <button>Login</button> -->
            <b-button class="reg_btn" v-on:click="postUser(fieldInfo)"
              >Register</b-button
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
  name: 'register',
  data() {
    return {
      user: '',
      fieldInfo: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    postUser(name) {
      this.errorMessage = ''
      this.successMessage = ''
      if (name === '') {
        this.errorMessage = 'Please enter a username'
      } else {
        const body = { username: name }
        Api.post('athletes', body)
          .then((response) => {
            console.log(response)
            this.user = response.data.username
            console.log(this.user)
            if (response.status === 201) {
              this.successMessage = 'Account created, you can now log in with your username'
            }
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message
          })
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

.successMsg {
  color: green;
}

h2 {
  color: rgba(217, 4, 41, 1);;
  padding-bottom: 0.5em;
}
</style>
