import { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import useForm from '../../../hooks/useForm'
import Input from '../../UIElements/Input'
import { addExperience } from '../../../store/actions'

const AddExperience = props => {

    //accepted parameters = name, validation, info, options, checkbox 
    //for dropdown inputs please provide options also
    //for checkboxes, pass along a checkbox property with the initial value

    //returns form object, overall validity, onChangeHandler    
    const [formData, isFormValid, onChangeHandler] = useForm([
        { name: 'title', validation: { required: true } },
        { name: 'company', validation: { required: true } },
        { name: 'location' },
        { name: 'from', validation: { required: true }, info: 'From Date' },
        { name: 'current', checkbox: false, info: 'Current Job' },
        { name: 'to', info: 'To Date' },
        { name: 'description' }
    ])

    const AddExperienceHandler = e => {
        e.preventDefault();

        //converting formData to the form we expect at the backend {status: '', company: '', ...}
        let userFormData = {}
        for (let userInputIdentifier in formData) {
            let name = formData[userInputIdentifier].id
            userFormData[name] = formData[userInputIdentifier].config.value
            if (name === 'current') userFormData[name] = formData[userInputIdentifier].config.checked
        }
        console.log(userFormData)
        props.ADD_EXPERIENCE(userFormData, props.history)
    }

    //converting object format to an array to loop through and map each one to an input field
    const formArray = []
    for (let key in formData) {
        formArray.push(formData[key])
    }

    //popping the todate field if currentjob is checked...(took 3 hours. Was earlier trying to disable the field but couldnt, instead popping it is elegant and easier)
    for (let key in formData) {
        if (formData[key].id === 'current') {
            if (formData[key].config.checked) {
                const index = formArray.findIndex(element => element.id === 'to')
                formArray.splice(index, 1)
            }
        }
    }

    let AddExperienceButtonClasses = ['btn', 'btn-large', 'btn-primary']
    if (!isFormValid) {
        AddExperienceButtonClasses.push('btn-disabled')
    }

    return <Fragment>
        <div className='container'>
            <h1 className='large primary-color'>Add an Experience</h1>
            <p className='medium'><i className='fas fa-code-branch'></i> Add any developer/programming positions that you have had in the past</p>
            <div style={{ marginTop: '10px' }}>* = required fields</div>

            <form onSubmit={AddExperienceHandler}>
                <div>
                    {formArray.map(i => {
                        return <Input
                            key={i.id}
                            invalid={!i.config.valid}
                            touched={i.config.touched}
                            elementType={i.config.elementType}
                            elementConfig={i.config.elementConfig}
                            changed={e => onChangeHandler(e, i.id, i.config.validation)}
                            value={i.config.value}
                            info={i.config.info}
                            icon={i.config.icon}
                            checked={i.config.checked}
                        />
                    })}
                </div>
                {props.alertMsg ? <p className='alert alert-dark'>{props.alertMsg}</p> : null}
                <div>
                    <input type='submit' disabled={!isFormValid} className={AddExperienceButtonClasses.join(' ')} />
                    <Link to='/profiles' className='btn btn-dark'> Go Back </Link>
                </div>
            </form>
        </div>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        alertMsg: state.alert.msg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ADD_EXPERIENCE: (formData, history) => dispatch(addExperience(formData, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience))