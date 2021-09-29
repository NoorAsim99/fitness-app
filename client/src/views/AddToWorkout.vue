<template>
    <div>
        <p>Fucking what?</p>
    </div>
</template>

<script>

export default {
  name: 'addExercise',
  data() {
    return {
      workoutId: 0
    }
  },
  created() {
    this.workoutId = this.$route.params.workoutId
  }
}
</script>
