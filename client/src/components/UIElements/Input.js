import { Fragment } from 'react'

import './Input.css'

const Input = props => {
    const { invalid, elementType, elementConfig, touched, changed, value, info, icon, checked } = props

    let cssClasses = ['input']
    if (invalid && touched) {
        cssClasses.push('invalid')
    }

    let inputElement

    if (elementType === 'input') {
        if (elementConfig.type === 'date') {
            inputElement = (
                <Fragment>
                    <h3>{info}</h3>
                    <input className={cssClasses.join(' ')} {...elementConfig} onChange={changed} value={value} />
                </Fragment>
            )
        } else if (elementConfig.type === 'checkbox') {
            inputElement = (
                <Fragment>
                    <input type='checkbox' onChange={changed} value={checked} checked={checked} /> <span style={{ fontWeight: 'bold' }}>{elementConfig.placeholder}</span>
                </Fragment>
            )
        } else {
            inputElement = (
                <Fragment>
                    {icon === 'null' ? null : icon}
                    <input className={cssClasses.join(' ')} {...elementConfig} onChange={changed} value={value} />
                    <small>{info}</small>
                </Fragment>
            )
        }
    } else if (elementType === 'textarea') {
        inputElement = (
            <Fragment>
                <textarea className={cssClasses.join(' ')} {...elementConfig} onChange={changed} value={value} />
                <small>{info}</small>
            </Fragment>
        )
    } else if (elementType === 'select') {
        inputElement = (
            <Fragment>
                <select className={cssClasses.join(' ')} onChange={changed}>
                    <option value='' >{elementConfig.option1}</option>
                    {elementConfig.options.map(option =>
                        <option key={option.value} value={option.value} >{option.displayValue}</option>
                    )}
                </select>
                <small>{info}</small>
            </Fragment>
        )
    } else if (elementType === 'date') {
        console.log('here')
        inputElement = (
            <Fragment>
                <h3>{info}</h3>
                <input className={cssClasses.join(' ')} {...elementConfig} onChange={changed} value={value} />
                <p>Sucks !!!</p>
            </Fragment>
        )
    }

    const mainDivCss = ['form-group']
    if (icon) {
        mainDivCss.push('social-input')
    }
    return <div className={mainDivCss.join(' ')}>{inputElement}</div>
}

export default Input