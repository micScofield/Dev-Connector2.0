import { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../store/actions'
import Spinner from '../UIElements/Spinner'
import CheckValidity from '../../utility/checkValidity'
import Input from '../UIElements/Input'

const Login = props => {

    const [formData, setFormData] = useState({
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
            touched: false
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
            touched: false
        }
    })

    const [isFormValid, setIsFormValid] = useState(false)

    const onChangeHandler = (e, identifier, rules) => {
        const updatedFormData = { ...formData }
        const updatedFormDataDeep = { ...updatedFormData[identifier] }

        //set values
        updatedFormDataDeep.value = e.target.value
        updatedFormDataDeep.valid = CheckValidity(e.target.value, rules)
        updatedFormDataDeep.touched = true

        updatedFormData[identifier] = updatedFormDataDeep

        let isFormValid = true
        for (let key in updatedFormData) {
            isFormValid = updatedFormData[key].valid && isFormValid
        }
        setIsFormValid(isFormValid)
        setFormData(updatedFormData)
    }

    const loginHandler = e => {
        e.preventDefault();
        props.LOGIN(formData.email.value, formData.password.value)
    }

    const loginFormArray = []
    for (let i in formData) {
        const formElement = {
            id: i,
            config: formData[i]
        }
        loginFormArray.push(formElement)
    }

    let loginButtonClasses = ['btn', 'btn-large', 'btn-primary']
    if(!isFormValid) {
        loginButtonClasses.push('btn-disabled')
    }

    let form = (
        <form onSubmit={loginHandler}>
            {
                loginFormArray.map(i => {
                    return (
                        <Input
                            key={i.id}
                            invalid={!i.config.valid}
                            touched={i.config.touched}
                            elementType={i.config.elementType}
                            elementConfig={i.config.elementConfig}
                            changed={e => onChangeHandler(e, i.id, i.config.validation)}
                            value={i.config.value} />
                    )
                })
            }
            <input type="submit" disabled={!isFormValid} className={loginButtonClasses.join(' ')} value="login" /><br />
            Don't have an account ? <Link to='/register' className='btn btn-primary'>Sign up</Link>
        </form>
    )

    if (props.loading) {
        form = <Spinner />
    }

    //useful when we have classes based on conditions
    const alertCssClass = ['alert']
    if(props.alertType === 'danger') {alertCssClass.push('alert-dark')}

    if(props.isAuth) {return <Redirect to='/dashboard' />}

    return <Fragment>
        <section className='container'>
            <div>
                <h1 className='primary-color large'>Login</h1>
                <p className='medium'><i className='fas fa-user'></i> Sign into your account</p>

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
        LOGIN: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)