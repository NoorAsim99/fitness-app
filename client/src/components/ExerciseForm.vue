<template>
    <div>
    <b-form @submit="onSubmit" v-if="show">
        <b-form-group
        id="input-group-1"
        label="Exercise name">
        >
           <b-form-input
             id="input-1"
             v-model="form.title"
             placeholder="Enter exercise name"
             required
           ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Repetitions" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.repetitions"
          placeholder="Enter number of reps"
          required
        ></b-form-input>
    <b-form-group id="input-group-3" label="Sets" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.sets"
              :placehoolder="foods"
              required
            ></b-form-input>
          </b-form-group>
    <b-form-group id="input-group-4" label="Intensity" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.intensity"
          placeholder="Enter intensity"
          required
        ></b-form-input>
      </b-form-group>
    </b-form>
    </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      form: {
        title: '',
        repetitions: '',
        sets: '',
        intensity: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      Api.post('/exercises')
    }
  }
}
</script>
