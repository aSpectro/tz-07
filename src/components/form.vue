<template lang="pug">
  form.form(ref="form-1")
    .form__formHeader
      .formHeader__step(@click="prevStep" :class="{ active: formStep === 1, success: formStep === 2 }")
        .step__num(v-if="formStep === 1") 1
        .step__num(v-if="formStep === 2")
          v-icon(name="check")
        .step__name Основные данные
      .formHeader__step(:class="{ active: formStep === 2 }")
        .step__num 2
        .step__name Адрес доставки
    template(v-if="formStep === 1")
      .form__formBody
        .formBody__field(:class="{ warn: formFields.firstName.status === 'warn', danger: formFields.firstName.status === 'danger' }")
          .field__label Имя
          input.field__input(v-model="formFields.firstName.value" placeholder="Иван")
          .field__msg {{ formFields.firstName.msg }}
        .formBody__field(:class="{ warn: formFields.lastName.status === 'warn', danger: formFields.lastName.status === 'danger' }")
          .field__label Фамилия
          input.field__input(v-model="formFields.lastName.value" placeholder="Иванов")
          .field__msg {{ formFields.lastName.msg }}
        .formBody__field(:class="{ warn: formFields.phone.status === 'warn', danger: formFields.phone.status === 'danger' }")
          .field__label Телефон
          input.field__input(v-model="formFields.phone.value" type="tel" v-mask="'+###########'" placeholder="+79046524783")
          .field__msg {{ formFields.phone.msg }}
        .formBody__field(:class="{ warn: formFields.email.status === 'warn', danger: formFields.email.status === 'danger' }")
          .field__label Email
          input.field__input(v-model="formFields.email.value" type="email" placeholder="example@example.com")
          .field__msg {{ formFields.email.msg }}
        .formBody__field
          .field_btn(@click="nextStep")
            span Продолжить
            v-icon(name="arrow-right")
    template(v-if="formStep === 2")
      .form__formBody
        .formBody__field
          .field__radioGroup
            input.radioGroup__radio(v-model="deliveryMode" id="radio1" type="radio" value="delivery")
            label.radioGroup__label(for="radio1") Доставка
          .field__radioGroup
            input.radioGroup__radio(v-model="deliveryMode" id="radio2" type="radio" value="pickup")
            label.radioGroup__label(for="radio2") Самовывоз
        template(v-if="deliveryMode === 'delivery'")
          .formBody__field
          .formBody__field(:class="{ warn: formFields.country.status === 'warn', danger: formFields.country.status === 'danger' }")
            .field__label Страна
            select.field__input(v-model="formFields.country.value")
              option(disabled selected value) Не выбрано
              option(value="ru") Россия
              option(value="by") Беларусь
              option(value="kz") Казахстан
              option(value="ua") Украина
            .field__msg {{ formFields.country.msg }}
          .formBody__field(:class="{ warn: formFields.city.status === 'warn', danger: formFields.city.status === 'danger' }")
            .field__label Город
            input.field__input(v-model="formFields.city.value" placeholder="Москва")
            .field__msg {{ formFields.city.msg }}
          .formBody__field(:class="{ warn: formFields.index.status === 'warn', danger: formFields.index.status === 'danger' }")
            .field__label Индекс
            input.field__input(v-model="formFields.index.value" v-mask="'######'" placeholder="398000")
            .field__msg {{ formFields.index.msg }}
          .formBody__field(:class="{ warn: formFields.address.status === 'warn', danger: formFields.address.status === 'danger' }")
            .field__label Адрес
            input.field__input(v-model="formFields.address.value" placeholder="г. Москва, ул. Космонавтов, 14/5")
            .field__msg {{ formFields.address.msg }}
          .formBody__field(:class="{ warn: formFields.deliveryDate.status === 'warn', danger: formFields.deliveryDate.status === 'danger' }")
            .field__label Дата доставки
            input.field__input(v-model="formFields.deliveryDate.value" v-mask="'##/##/####'" placeholder="24/05/2017")
            .field__msg {{ formFields.deliveryDate.msg }}
          .formBody__field
          .formBody__field.fullWidth(:class="{ warn: formFields.comment.status === 'warn', danger: formFields.comment.status === 'danger' }")
            .field__label Адрес
            textarea.field__input(v-model="formFields.comment.value" placeholder="Ваш комментарий здесь...")
            .field__msg {{ formFields.comment.msg }}
        template(v-if="deliveryMode === 'pickup'")
          .formBody__field.fullWidth(:class="{ warn: formFields.comment.status === 'warn', danger: formFields.comment.status === 'danger' }")
              .field__label Адрес
              textarea.field__input(v-model="formFields.comment.value" placeholder="Ваш комментарий здесь...")
              .field__msg {{ formFields.comment.msg }}
        .formBody__field
          .field_btn(@click="sendData")
            span Оформить заказ
            v-icon(name="send")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FormController } from '@/lib/controllers/formController'

@Component({})
export default class Form extends Vue {
  private formStep = 1
  private deliveryMode = 'delivery'

  private formFields = {
    firstName: {
      value: '',
      status: '',
      msg: ''
    },
    lastName: {
      value: '',
      status: '',
      msg: ''
    },
    phone: {
      value: '',
      status: '',
      msg: ''
    },
    email: {
      value: '',
      status: '',
      msg: ''
    },
    country: {
      value: '',
      status: '',
      msg: ''
    },
    city: {
      value: '',
      status: '',
      msg: ''
    },
    index: {
      value: '',
      status: '',
      msg: ''
    },
    address: {
      value: '',
      status: '',
      msg: ''
    },
    deliveryDate: {
      value: '',
      status: '',
      msg: ''
    },
    comment: {
      value: '',
      status: '',
      msg: ''
    }
  }
  
  private prevStep(): void{
    this.formStep = 1
    this.formFields.country.value = ''
    this.formFields.city.value = ''
    this.formFields.index.value = ''
    this.formFields.address.value = ''
    this.formFields.deliveryDate.value = ''
    this.formFields.comment.value = ''
  }

  private nextStep(): void{
    const Form = new FormController()
    const valid = Form.validateFirstStep(this.formFields)

    if(valid.status){
      this.formStep = 2
    } else{
      this.formFields = valid.fields
    }
  }

  private sendData(): void{
    const Form = new FormController()
    const valid = Form.validateLastStep(this.formFields, this.deliveryMode)

    if(valid.status){
      Form.sendData(this.formFields).then((res: any) => {
        if(res.success){
          this.$bus.$emit('openModal', true)
        } else{
          this.$bus.$emit('openModal', false)
        }
      })
    } else{
      this.formFields = valid.fields
    }
  }
}
</script>

<style lang="scss">

</style>
