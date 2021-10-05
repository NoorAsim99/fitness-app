<template>
<div class="container">
<b-row>
<b-col>
    <form class="exercise-form" @submit.prevent="onSubmit">
      <div class="form-group">
      <label for="titleExample">Change the name of this workout</label>
      <input type="text" class="form-control" id="titleExample" aria-describedby="titleHelp" placeholder="Enter New Name" v-model= "title">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

</b-col>
</b-row>
<b-row>
  <b-col>
    <button type="button" class="btn btn-dark" @click="$router.push({ name: 'workouts'})">Go Back</button>
  </b-col>
</b-row>
</div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'editWorkout',
  data() {
    return {
      workoutId: 0,
      form: {
        title: null
      }
    }
  },
  created() {
    this.workoutId = this.$route.params.workoutId
  },
  methods: {
    onSubmit() {
      this.workoutId = this.$route.params.workoutId
      const newTitle = {
        title: this.title
      }
      Api.patch(`/workouts/${this.workoutId}`, newTitle)
        .then((response) => {
          console.log(response)
        })
    }
  }
}

</script>
