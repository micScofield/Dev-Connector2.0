import { useState, useEffect } from 'react'

import checkValidity from '../utility/checkValidity'

const useForm = props => {

    const [showSocialLinks, setShowSocialLinks] = useState(false)

    let fields = []
    for (let key in props) {
        let type = 'text'
        let placeholder = ''
        let elementType = 'input'
        let options = []
        let option1 = '' //for placeholder in dropdown
        let icon = null

        if (props[key].name === 'name') { placeholder = 'Name' }

        if (props[key].name === 'email') { placeholder = 'Email Address' }

        if (props[key].name === 'password') {
            type = 'password'
            placeholder = 'Password'
        }

        if (props[key].name === 'password2') {
            type = 'password'
            placeholder = 'Confirm Password'
        }

        if (props[key].name === 'status') {
            elementType = 'select'
            option1 = props[key].options[0]
            props[key].options.shift()
            props[key].options.map(option => options.push({ value: option.toLowerCase().trim().split(' ').join(''), displayValue: option }))
        }

        if (props[key].name === 'company') { placeholder = props[key].validation ? '* Company' : 'Company' }

        if (props[key].name === 'website') { placeholder = 'Website' }

        if (props[key].name === 'location') { placeholder = 'Location' }

        if (props[key].name === 'skills') { placeholder = '* Skills' }

        if (props[key].name === 'githubusername') { placeholder = 'Github Username' }

        if (props[key].name === 'bio') {
            elementType = 'textarea'
            placeholder = 'A short bio of yourself'
        }

        if (props[key].name === 'description') {
            elementType = 'textarea'
            placeholder = 'Job Description'
        }

        if (props[key].name === 'title') { placeholder = '* Job Title' }

        if (props[key].name === 'from' || props[key].name === 'to') {
            type = 'date'
        }

        if (props[key].name === 'current') {
            type = 'checkbox'
            placeholder = props[key].info
        }

        if (props[key].name === 'school') { placeholder = '* School or Bootcamp' }
        if (props[key].name === 'degree') { placeholder = '* Degree or Certificate' }
        if (props[key].name === 'fieldOfStudy') { placeholder = 'Field Of Study' }

        if (props[key].name === 'twitter') {
            icon = <i className="fab fa-twitter fa-2x"></i>
            placeholder = 'Twitter URL'
        }
        if (props[key].name === 'facebook') {
            icon = <i className="fab fa-facebook fa-2x"></i>
            placeholder = 'Facebook URL'
        }
        if (props[key].name === 'youtube') {
            icon = <i className="fab fa-youtube fa-2x"></i>
            placeholder = 'Youtube URL'
        }
        if (props[key].name === 'linkedIn') {
            icon = <i className="fab fa-linkedin fa-2x"></i>
            placeholder = 'LinkedIn URL'
        }
        if (props[key].name === 'instagram') {
            icon = <i className="fab fa-instagram fa-2x"></i>
            placeholder = 'Instagram URL'
        }

        const field = {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder,
                option1: option1 ? option1 : null,
                options
            },
            checked: props[key].checkbox === true ? true : false,
            value: '',
            validation: props[key].validation ? props[key].validation : '',
            valid: props[key].validation ? false : true,
            touched: props[key].validation ? false : true,
            info: props[key].info ? props[key].info : '',
            icon: icon
        }
        const fieldPush = {
            id: props[key].name,
            config: field
        }

        fields.push(fieldPush)
    }

    const [formData, setFormData] = useState(fields)
    const [isFormValid, setIsFormValid] = useState(false)

    const formArray = []
    for (let key in formData) {
        formArray.push(formData[key])
    }

    const onChangeHandler = (e, identifier, rules) => {

        const copiedForm = { ...formData }
        const index = formArray.findIndex(i => i.id === identifier)

        const updatedFormData = { ...copiedForm[index] }

        updatedFormData.config.value = e.target.value
        updatedFormData.config.valid = checkValidity(e.target.value, rules)
        updatedFormData.config.touched = true

        //setting values differently for checkboxes- using the checked field
        if (identifier === 'current') updatedFormData.config.checked = !updatedFormData.config.checked

        copiedForm[index] = updatedFormData

        let isFormValid = true
        for (let key in copiedForm) {
            isFormValid = isFormValid && copiedForm[key].config.valid
        }

        setFormData(copiedForm)
        setIsFormValid(isFormValid)
    }

    return [formData, isFormValid, onChangeHandler]
}

export default useForm