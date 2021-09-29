import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Workouts from './views/Workouts.vue'
import AddToWorkout from './views/AddToWorkout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/workouts',
      name: 'workouts',
      component: Workouts
    },
    {
      path: '/workouts/:workoutId',
      name: 'addToWorkout',
      Component: AddToWorkout
    }
  ]
})
