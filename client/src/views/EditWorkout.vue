<template>
<b-container fluid='md' class="container">
<b-row>
<b-col>
    <form class="exercise-form" @submit.prevent="onPatch">
      <div class="form-group">
      <label for="titleExample">Change the name of this workout</label>
      <input type="text" class="form-control" id="titleExample" aria-describedby="titleHelp" placeholder="Enter New Name" v-model= "title">
      </div>
      <button type="submit" class="btn-primary">Submit</button>
    </form>

</b-col>
<b-col>
    <form class="exercise-form" @submit.prevent="onPut">
      <div class="form-group">
      <label for="titleExample">Change the name of this workout</label>
      <input type="text" class="form-control" id="titleExample" aria-describedby="titleHelp" placeholder="Enter New Name" v-model= "title">
      </div>
      <button type="submit" class="btn-primary">Submit + Reset</button>
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
</b-container>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'editWorkout',
  data() {
    return {
      workoutId: 0,
      userId: 0,
      title: null
    }
  },
  created() {
    this.workoutId = this.$route.params.workoutId
    this.userId = this.$route.params.userId
  },
  methods: {
    onPatch() {
      this.workoutId = this.$route.params.workoutId
      const newTitle = {
        title: this.title
      }
      Api.patch(`/workouts/${this.workoutId}`, newTitle)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            console.log('Workout patched')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onPut() {
      this.workoutId = this.$route.params.workoutId
      const newTitle = {
        title: this.title
      }
      Api.put(`/workouts/${this.workoutId}`, newTitle)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            console.log('Put new workout in place of old')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>

<style scoped>
.btn-primary{
  margin-bottom: 20px;
}
</style>
