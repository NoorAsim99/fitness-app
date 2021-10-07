<template>
  <div class="container">
    <b-row>
      <b-col>
        <form class="exercise-form" @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="titleExample">This is the name of your exercise</label>
            <input
              type="text"
              class="form-control"
              id="titleExample"
              aria-describedby="titleHelp"
              placeholder="Enter Title"
              v-model="title"
            />
          </div>
          <div class="form-group">
            <label for="repsExample">How many reps?</label>
            <input
              type="number"
              class="form-control"
              id="repsExample"
              aria-describedby="repsHelp"
              placeholder="Enter Reps"
              v-model="repetitions"
            />
          </div>
          <div class="form-group">
            <label for="setsExample">How many sets?</label>
            <input
              type="number"
              class="form-control"
              id="setsExample"
              aria-describedby="setsHelp"
              placeholder="Enter Sets"
              v-model="sets"
            />
          </div>
          <div class="form-group">
            <label for="intensityExample"
              >What is the intensity of the exercise?</label
            >
            <input
              type="text"
              class="form-control"
              id="intensityExample"
              aria-describedby="intensityHelp"
              placeholder="RPE or %"
              v-model="intensity"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-link
          class="reg_btn"
          :to="{ name: 'workouts', params: { userId: this.userId } }"
        >
          Go back
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'addToWorkout',
  data() {
    return {
      workoutId: 0,
      userId: 0,
      title: '',
      repetitions: '',
      sets: '',
      intensity: ''
    }
  },
  created() {
    this.workoutId = this.$route.params.workoutId
    this.userId = this.$route.params.userId
  },
  methods: {
    onSubmit() {
      this.workoutId = this.$route.params.workoutId
      const newExercise = {
        title: this.title,
        repetitions: this.repetitions,
        sets: this.sets,
        intensity: this.intensity
      }
      Api.post(`/workouts/${this.workoutId}/exercises`, newExercise).then(
        (response) => {
          console.log(response)
        }
      )
    }
  }
}
</script>
