<template lang="pug">
  #app
    Form
    Modal
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Form from '@/components/form.vue'
import Modal from '@/components/modal.vue'

@Component({
  components: {
    Form,
    Modal
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">

</style>
