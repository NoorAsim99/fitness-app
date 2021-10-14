<template>
    <b-container fluid='md' class="container">
        <p>{{workout.title}} has these exercises:</p>
        <ul>
          <li v-for="exercise in workout.exercises" :key="exercise._id">
            {{exercise.title}} - reps: {{exercise.repetitions}} sets: {{exercise.sets}} intensity: {{exercise.intensity}}
          </li>
        </ul>
        <b-button variant="danger" v-on:click="$emit('del-workout', workout._id)">X</b-button>
        <b-button variant="success" @click="$router.push({ name: 'addToWorkout', params: {workoutId: workout._id} })">+</b-button>
        <b-button variant="info" @click="$router.push ({ name: 'editWorkout', params: {workoutId: workout._id} })">Edit</b-button>
    </b-container>
</template>

<script>
export default {
  name: 'workout-item',
  props: ['workout']
}
</script>
