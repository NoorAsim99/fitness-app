<template>
  <p> Hello {{ userId }} </p>
</template>

<script>
// import { Api } from '@/Api'
export default {
  name: 'userHome',
  data() {
    return {
      userId: 0,
      msg: 'Hey Nic Raboy'
    }
  },
  created() {
    this.userId = this.$route.params.userId
  },
  methods: {}
}
</script>

<style>
</style>
