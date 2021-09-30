<template>
  <div>
    <h1>{{ message }}</h1>
    <h2>{{ successMessage }}</h2>
    <h2>{{ errorMessage }}</h2>
    <b-button v-on:click="newTraininglog()">Add a new training log </b-button>
    <form>
      <input v-model="entryStr" placeholder="Type an entry" />
      <input v-model="dateStr" placeholder="Type a date" />
    </form>
    <b-button v-on:click="getTraininglogs()">Get logs </b-button>
    <ul>
      <li v-for="log in logs" :key="log.entry">
        {{ log.entry }}
         <b-button v-on:click="deleteTraininglog(log._id)">Delete this log </b-button>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'traininglog',
  data() {
    return {
      message: 'none',
      successMessage: '',
      errorMessage: '',
      entryStr: '',
      dateStr: '',
      logs: []
    }
  },
  methods: {
    newTraininglog() {
      const body = {
        entry: this.entryStr,
        date: this.dateStr
      }
      Api.post('traininglogs', body)
        .then((response) => {
          this.message = response.data.message
          if (response.status === 201) {
            this.successMessage = 'Training log added!'
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message
        })
    },
    getTraininglogs() {
      Api.get('traininglogs')
        .then((response) => {
          this.logs = response.data.traininglogs
          if (response.status === 200) {
            this.successMessage = 'Successfully got logs'
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message
        })
    },
    deleteTraininglog(logId) {
      Api.delete('traininglogs/' + logId)
        .then((response) => {
          this.logs = response.data.traininglogs
          if (response.status === 204) {
            this.successMessage = 'Successfully deleted log'
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message
        })
    }
  }
}
</script>

<style scoped>
.btn_message {
  margin-bottom: 1em;
}

h1 {
  color: black;
}
</style>
