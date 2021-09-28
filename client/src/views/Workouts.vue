<template>
    <div>
        <h1>Here are all your workouts</h1>
        <div v-for="workout in workouts" v-bind:key="workout._id">
            <workout-item v-bind:workout="workout" v-on:del-workout="deleteWorkout"/>
        </div>
        <div>
          <b-button variant="success" @click="$router.push('addWorkout')">Add Workout</b-button>
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
  mounted() {
    Api.get('workouts')
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
  },
  data() {
    return {
      workouts: []
    }
  }
}
</script>
