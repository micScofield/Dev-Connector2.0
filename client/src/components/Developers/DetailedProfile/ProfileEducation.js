import { Fragment } from 'react'

import formatDate from '../../../utility/formatDate'

const ProfileEducation = ({ education }) => {
    return <Fragment>
        {education && <Fragment>
            <h2 className='primary-color' style={{marginBottom: '1rem'}}>Education</h2>

            {education.map(edu => {
                return <div key={edu._id}>
                    <h3 className='my-bottom'>{edu.school}</h3>
                    <p className='my-bottom'>{formatDate(edu.from)} - {edu.current ? <span>Current</span> : edu.to ? <span>{formatDate(edu.to)}</span> : <span>Unknown</span>}</p>
                    <p className='my-bottom'><strong>Degree : </strong>{edu.degree}</p>
                    <p className='my-bottom'><strong>Field Of Study : </strong>{edu.fieldOfStudy}</p>
                    {edu.description && <p  className='my-bottom-1'><strong>Description : </strong>{edu.description}</p>}
                </div>
            })}
        </Fragment>}
    </Fragment>
}

export default ProfileEducation