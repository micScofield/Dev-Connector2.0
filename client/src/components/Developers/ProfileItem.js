import { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

const ProfileItem = ({ profile, history }) => {
    const dummyGravatar = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
    return <Fragment>
        <div className='profiles'>
            <img src={profile.user.avatar ? profile.user.avatar : dummyGravatar} alt='Poor Internet, Cant load image' />
            <div>
                <h2>{profile.user.name}</h2>
                <p>{profile.status} {profile.company && <span>at {profile.company}</span>}</p>
                <p>{profile.location}</p>
                <button onClick={() => history.push(`/user/${profile.user._id}`)} className='btn btn-primary btn-large' style={{ marginTop: '0.5rem' }}>View Profile</button>
            </div>
            <div>
                <ul>
                    {profile.skills.map(skill => (
                        <li key={skill}>
                            <h3 className='primary-color'><i className='fas fa-check'>{skill}</i></h3>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Fragment>
}

export default withRouter(ProfileItem)