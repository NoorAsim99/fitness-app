<template>
    <div class="container">
        <h1>Here are all your workouts</h1>
        <div v-for="workout in workouts" v-bind:key="workout._id">
            <workout-item v-bind:workout="workout" v-on:del-workout="deleteWorkout"/>
        </div>
        <div>
          <router-link class="reg_btn" :to="{name: 'addWorkout', params: { userId: this.userId } }"> Add workout </router-link>
          </div>
    </div>
</template>

<script>
import WorkoutItem from '../components/WorkoutItem.vue'
import { Api } from '@/Api'

export default {
  name: 'workouts',
  components: {
    'workout-item': WorkoutItem
  },
  data() {
    return {
      workouts: [],
      userId: 0
    }
  },
  mounted() {
    this.userId = this.$route.params.userId

    Api.get('athletes/' + this.$route.params.userId + '/workouts')
      .then(response => {
        console.log(response)
        this.workouts = response.data.workouts
      })
      .catch(error => {
        this.workouts = []
        console.log(error)
      })
  },
  methods: {
    deleteWorkout(id) {
      console.log(`Delete workout with id ${id}`)
      Api.delete(`/workouts/${id}`)
        .then(response => {
          const index = this.workouts.findIndex(workouts => workouts._id === id)
          this.workouts.splice(index, 1)
        })
    }
  }
}
</script>

<style scoped>
.container {
  color: lightgray;
}
</style>
