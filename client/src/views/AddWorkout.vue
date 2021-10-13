<template>
  <b-container fluid='md' class="container">
    <b-row>
      <b-col>
        <form class="workout-form" @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="titleExample">This is the name of your workout</label>
            <input
              type="text"
              class="form-control"
              id="titleExample"
              aria-describedby="titleHelp"
              placeholder="Enter Title"
              v-model="title"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <button
          type="button"
          class="btn btn-dark"
          @click="$router.push({ name: 'workouts' })"
        >
          Go Back
        </button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'addWorkout',
  data() {
    return {
      title: '',
      exercises: [],
      userId: 0
    }
  },
  mounted() {
    this.userId = this.$route.params.userId
  },
  methods: {
    onSubmit() {
      const newWorkout = {
        title: this.title,
        exercises: this.exercises
      }
      Api.post('workouts', newWorkout).then((response) => {
        console.log(response)
        Api.patch('athletes/' + this.userId + '/' + response.data._id)
      })
    }
  }
}
</script>
