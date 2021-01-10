import { Fragment } from 'react'

const ProfileAbout = props => {
    return <Fragment>
        {/* Displaying Bio */}
        <div>
            <h2>{props.profile.user.name}'s Bio</h2>
            <p className='small'>{props.profile.bio ? props.profile.bio : <span>No Bio entered by user !!!</span>}</p>
        </div>

        {/* Separator Line */}
        <div className='line'></div>

        {/* Displaying Skills */}
        <div>
            <h2 style={{marginBottom: '1rem'}}>Skill Set</h2>
            {props.profile.skills.length !== 0 && props.profile.skills.map(skill => {
                return <span key={skill} style={{paddingLeft: '4rem'}}><i className='fa fa-check'></i> {skill}</span>
            })}
        </div>
    </Fragment>
}

export default ProfileAbout