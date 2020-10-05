export class FormController{
  public sendData(fields: any): Promise<any>{
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()

      xhr.open("POST", '/test.php', true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return
      
        resolve(JSON.parse(this.responseText))
      }

      xhr.send(JSON.stringify(fields))
    })
  }
  
  public validateLastStep(fields: any, deliveryMode: string): { status: boolean, fields: any }{
    let result = {
      status: false,
      fields: fields
    }

    result.fields.country.status = ''
    result.fields.city.status = ''
    result.fields.index.status = ''
    result.fields.address.status = ''
    result.fields.deliveryDate.status = ''

    result.fields.country.msg = ''
    result.fields.city.msg = ''
    result.fields.index.msg = ''
    result.fields.address.msg = ''
    result.fields.deliveryDate.msg = ''

    if(deliveryMode === 'delivery'){
      if(fields.country.value.trim().length === 0){
        result.fields.country.status = 'danger'
        result.fields.country.msg = 'Поле обязательно к заполнению!'
      } else if(fields.city.value.trim().length === 0){
        result.fields.city.status = 'danger'
        result.fields.city.msg = 'Поле обязательно к заполнению!'
      } else if(fields.city.value.trim().length > 255){
        result.fields.city.status = 'warn'
        result.fields.city.msg = 'Максимум 255 символов! У вас '+fields.city.value.trim().length+'.'
      } else if(fields.index.value.trim().length === 0){
        result.fields.index.status = 'danger'
        result.fields.index.msg = 'Поле обязательно к заполнению!'
      } else if(fields.index.value.trim().length < 6){
        result.fields.index.status = 'warn'
        result.fields.index.msg = 'Нужно 6 символов! У вас '+fields.index.value.trim().length+'.'
      } else if(fields.address.value.trim().length === 0){
        result.fields.address.status = 'danger'
        result.fields.address.msg = 'Поле обязательно к заполнению!'
      } else if(fields.address.value.trim().length > 255){
        result.fields.address.status = 'warn'
        result.fields.address.msg = 'Максимум 255 символов! У вас '+fields.address.value.trim().length+'.'
      } else if(fields.deliveryDate.value.trim().length === 0){
        result.fields.deliveryDate.status = 'danger'
        result.fields.deliveryDate.msg = 'Поле обязательно к заполнению!'
      } else if(fields.deliveryDate.value.trim().length < 10){
        result.fields.deliveryDate.status = 'warn'
        result.fields.deliveryDate.msg = 'Формат: 00/00/0000.'
      } else if(!this.validateDate(fields.deliveryDate.value.trim())){
        result.fields.deliveryDate.status = 'warn'
        result.fields.deliveryDate.msg = 'Не верный формат даты!'
      } else{
        result.status = true
        result.fields.country.status = ''
        result.fields.city.status = ''
        result.fields.index.status = ''
        result.fields.address.status = ''
        result.fields.deliveryDate.status = ''

        result.fields.country.msg = ''
        result.fields.city.msg = ''
        result.fields.index.msg = ''
        result.fields.address.msg = ''
        result.fields.deliveryDate.msg = ''
      }
    } else{
      result.status = true
    }

    return result
  }

  public validateFirstStep(fields: any): { status: boolean, fields: any }{
    let result = {
      status: false,
      fields: fields
    }

    result.fields.firstName.status = ''
    result.fields.lastName.status = ''
    result.fields.phone.status = ''
    result.fields.email.status = ''

    result.fields.firstName.msg = ''
    result.fields.lastName.msg = ''
    result.fields.phone.msg = ''
    result.fields.email.msg = ''

    if(fields.firstName.value.trim().length === 0){
      result.fields.firstName.status = 'danger'
      result.fields.firstName.msg = 'Поле обязательно к заполнению!'
    } else if(fields.firstName.value.trim().length > 255){
      result.fields.firstName.status = 'warn'
      result.fields.firstName.msg = 'Максимум 255 символов! У вас '+fields.firstName.value.trim().length+'.'
    } else if(fields.lastName.value.trim().length === 0){
      result.fields.lastName.status = 'danger'
      result.fields.lastName.msg = 'Поле обязательно к заполнению!'
    } else if(fields.lastName.value.trim().length > 255){
      result.fields.lastName.status = 'warn'
      result.fields.lastName.msg = 'Максимум 255 символов! У вас '+fields.firstName.value.trim().length+'.'
    } else if(fields.phone.value.trim().length === 0){
      result.fields.phone.status = 'danger'
      result.fields.phone.msg = 'Поле обязательно к заполнению!'
    } else if(fields.phone.value.trim().length < 12){
      result.fields.phone.status = 'warn'
      result.fields.phone.msg = 'Введите номер телефона полностью!'
    } else if(fields.email.value.trim().length === 0){
      result.fields.email.status = 'danger'
      result.fields.email.msg = 'Поле обязательно к заполнению!'
    } else if(!this.validateEmail(fields.email.value.trim())){
      result.fields.email.status = 'warn'
      result.fields.email.msg = 'Введите корректный Email!'
    } else{
      result.status = true
      result.fields.firstName.status = ''
      result.fields.lastName.status = ''
      result.fields.phone.status = ''
      result.fields.email.status = ''

      result.fields.firstName.msg = ''
      result.fields.lastName.msg = ''
      result.fields.phone.msg = ''
      result.fields.email.msg = ''
    }

    return result
  }

  private validateDate(date: string): boolean{
    let result = false

    let dateParts = date.split('/')

    if(parseInt(dateParts[0]) > 31 || parseInt(dateParts[0]) < 1){
      result = false
    } else if(parseInt(dateParts[1]) > 12 || parseInt(dateParts[1]) < 1){
      result = false
    } else{
      result = true
    }

    return result
  }

  private validateEmail(email: string): boolean{
    let result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return result.test(email)
  }
}