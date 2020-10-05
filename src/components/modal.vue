<template lang="pug">
  #modal(v-if="show")
    .modal__content
      .content__data {{ modalText }}
      .modal__close(@click="show = false") x
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Modal extends Vue {
  private modalText = ''
  private show = false

  created() {
    this.$bus.$on('openModal', (data: boolean) => {
      this.show = true
      if(data){
        this.modalText = 'Успешно отправлено!'
        setTimeout(() => {
          location.reload()
        }, 5000)
      } else{
        this.modalText = 'Пожалуйста повторите запрос позже!'
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>