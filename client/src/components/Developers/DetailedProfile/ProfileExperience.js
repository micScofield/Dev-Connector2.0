import { Fragment } from 'react'

import formatDate from '../../../utility/formatDate'

const ProfileExperience = ({ experience }) => {
    return <Fragment>
        {experience && <Fragment>
            <h2 className='primary-color' style={{marginBottom: '1rem'}}>Experience</h2>

            {experience.map(exp => {
                return <div key={exp._id}>
                    <h3 className='my-bottom'>{exp.company}</h3>
                    <p className='my-bottom'>{formatDate(exp.from)} - {exp.current ? <span>Current</span> : exp.to ? <span>{formatDate(exp.to)}</span> : <span>Unknown</span>}</p>
                    <p className='my-bottom'><strong>Position : </strong>{exp.title}</p>
                    {exp.description && <p  className='my-bottom-1'><strong>Description : </strong>{exp.description}</p>}
                </div>
            })}
        </Fragment>}
    </Fragment>
}

export default ProfileExperience