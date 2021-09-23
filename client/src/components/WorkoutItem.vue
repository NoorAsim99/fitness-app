<template>
    <div>
        <p>{{workout.title}} has these exercises: {{workout.exercises}}</p>
    </div>
</template>

<script>
export default {
  name: 'workout-item',
  props: ['workout']
}
</script>
