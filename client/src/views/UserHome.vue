<template>
  <div class="container">
    <br />
    <br />
    <div class="row">
      <div class="col-md-3">
        <h2>Hello {{ userName }}</h2>
      </div>
      <div class="col-md-6">
        <router-link class="routerLink" :to="{name: 'workouts', params: { userId: this.userId } }"> Workouts </router-link>
        <router-link class="routerLink" to="/traininglog">
          Traininglog
        </router-link>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
// import { Api } from '@/Api'
export default {
  name: 'userHome',
  data() {
    return {
      userId: 0,
      userName: ''
    }
  },
  created() {
    this.userId = this.$route.params.userId
    this.userName = this.$route.params.userName
  },
  methods: {}
}
</script>

<style scoped>
.routerLink {
  margin: 0em 0.5em;
  border-radius: 40px;
  background: rgba(217, 4, 41, 1);
  padding: 15px;
}

h2 {
  color: lightgray;
}
</style>
