import { Fragment } from 'react'
import { connect } from 'react-redux'

import { deleteExperience } from '../../store/actions'
import formatDate from '../../utility/formatDate'

const ListExperience = props => {

    const deleteExperienceHandler = (expId) => {
        console.log(expId)
        props.deleteExperience(expId)
    }

    const experiences = props.profile.experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}
            </td>
            <td>
                <button className="btn btn-dark" onClick={deleteExperienceHandler.bind(this, exp._id)} >Delete</button>
            </td>
        </tr>
    ))

    // let content = (

    // )

    !props.profile.experience && console.log('no data')

    return <Fragment>
        <h2 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Experience Credentials</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
            </thead>
            <tbody>{experiences}</tbody>
        </table>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps, { deleteExperience })(ListExperience)