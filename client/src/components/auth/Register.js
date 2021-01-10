import { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setAlert, auth } from '../../store/actions'
import CheckValidity from '../../utility/checkValidity'
import Input from '../UIElements/Input'
import Spinner from '../UIElements/Spinner'

const Register = props => {

    const [formData, setFormData] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            info: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            info: 'This site uses gravatar, so if you want to have a profile image, use that one.'
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false,
            info: ''
        },
        password2: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false,
            info: ''
        }
    })

    const [isFormValid, setIsFormValid] = useState(false)

    const onChangeHandler = (identifier, rules) => {
        const updatedFormData = { ...formData }
        const updatedFormDataDeep = { ...updatedFormData[identifier] }

        //set values
        updatedFormDataDeep.value = event.target.value
        updatedFormDataDeep.valid = CheckValidity(event.target.value, rules)
        updatedFormDataDeep.touched = true

        updatedFormData[identifier] = updatedFormDataDeep

        let isFormValid = true
        for (let key in updatedFormData) {
            isFormValid = updatedFormData[key].valid && isFormValid
        }
        setIsFormValid(isFormValid)
        setFormData(updatedFormData)
    }

    const registerHandler = () => {
        event.preventDefault();
        if (formData.password.value !== formData.password2.value) {
            return props.ALERT('danger', 'passwords do not match')
        }
        props.AUTH(formData.name.value, formData.email.value, formData.password.value)
    }

    const registerFormArray = []
    for (let i in formData) {
        const formElement = {
            id: i,
            config: formData[i]
        }
        registerFormArray.push(formElement)
    }

    let registerButtonClasses = ['btn', 'btn-large', 'btn-primary']
    if (!isFormValid) {
        registerButtonClasses.push('btn-disabled')
    }

    let form = (
        <form onSubmit={registerHandler}>
            {
                registerFormArray.map(i => {
                    return (
                        <Input
                            key={i.id}
                            invalid={!i.config.valid}
                            touched={i.config.touched}
                            elementType={i.config.elementType}
                            elementConfig={i.config.elementConfig}
                            changed={onChangeHandler.bind(this, i.id, i.config.validation)}
                            info={i.config.info}
                            value={i.config.value} />
                    )
                })
            }
            <input type="submit" disabled={!isFormValid} className={registerButtonClasses.join(' ')} style={{ border: 'none' }} value="Register" /><br />
                    Already have an account ? <Link to='/login' className='btn btn-primary'>Login</Link>
        </form>
    )
    if (props.loading) {
        form = <Spinner />
    }

    const alertCssClass = ['alert']
    if(props.alertType === 'danger') {alertCssClass.push('alert-dark')}
    if(props.alertType === 'success') {alertCssClass.push('alert-primary')}

    if (props.isAuth) {return <Redirect to='/dashboard' />}

    return <Fragment>
        <section className='container'>
            <div>
                <h1 className='primary-color large'>Sign Up</h1>
                <p className='medium'><i className='fas fa-user'></i> Create your account</p>

                {props.alertMsg ? <p className={alertCssClass.join(' ')}>{props.alertMsg}</p> : null}
                {props.error ? <p className={alertCssClass.join(' ')}>{props.error}</p> : null}

                {form}

            </div>
        </section>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        alertMsg: state.alert.msg,
        alertType: state.alert.type,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ALERT: (type, msg) => dispatch(setAlert(type, msg)),
        AUTH: (name, email, password) => dispatch(auth(name, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)