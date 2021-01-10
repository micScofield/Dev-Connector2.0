import { Fragment } from 'react'
import { connect } from 'react-redux'

import { deleteEducation } from '../../store/actions'
import formatDate from '../../utility/formatDate'

const ListEducation = props => {

    const deleteEducationHandler = (eduId) => {
        console.log(eduId)
        props.deleteEducation(eduId)
    }

    const educations = props.profile.education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Present'}
            </td>
            <td>
                <button className="btn btn-dark" onClick={deleteEducationHandler.bind(this, edu._id)}>Delete</button>
            </td>
        </tr>
    ))

    return <Fragment>
        <h2 style={{marginTop: '1.5rem', marginBottom: '1rem'}}>Education Credentials</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
            </thead>
            <tbody>{educations}</tbody>
        </table>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps, { deleteEducation })(ListEducation)