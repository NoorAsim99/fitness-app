import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import UserHome from './views/UserHome.vue'
import Workouts from './views/Workouts.vue'
import Traininglog from './views/Traininglog.vue'
import AddToWorkout from './views/AddToWorkout.vue'
import AddWorkout from './views/AddWorkout.vue'
import EditWorkout from './views/EditWorkout.vue'

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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/userHome/:userId',
      name: 'userHome',
      component: UserHome
    },
    {
      path: '/workouts',
      name: 'workouts',
      component: Workouts
    },
    {
      path: '/traininglog',
      name: 'traininglog',
      component: Traininglog
    },
    {
      path: '/addToWorkout/:workoutId',
      name: 'addToWorkout',
      component: AddToWorkout
    },
    {
      path: '/workouts/addWorkout',
      name: 'addWorkout',
      component: AddWorkout
    },
    {
      path: '/editWorkout/:workoutId',
      name: 'editWorkout',
      component: EditWorkout
    }
  ]
})
