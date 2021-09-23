<template>
    <div>
        <h1>Here are all your workouts</h1>
        <div v-for="workout in workouts" v-bind:key="workout._id">
            <workout-item v-bind:workout="workout"/>
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
    Api.get('/workouts')
      .then(response => {
        console.log(response)
        this.workouts = response.data.workouts
      })
      .catch(error => {
        this.workouts = []
        console.log(error)
      })
  },
  data() {
    return {
      workouts: []
    }
  }
}
</script>
