<template>
    <div>
        <p>{{workout.title}} has these exercises:</p>
        <b-container>{{workout.exercises}}</b-container>
        <b-button variant="danger" v-on:click="$emit('del-workout', workout._id)">X</b-button>
        <b-button variant="success" @click="$router.push({ name: 'addExercise', params: {workoutId: workout._id}})">+</b-button>
    </div>
</template>

<script>
export default {
  name: 'workout-item',
  props: ['workout']
}
</script>
