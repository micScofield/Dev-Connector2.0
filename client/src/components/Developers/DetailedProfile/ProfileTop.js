import { Fragment } from 'react'

const ProfileTop = props => {

    //storing user's social media links in an array
    let socialLinksArray = []
    if (props.profile) for (let key in props.profile.social) {
        socialLinksArray.push({ type: key, url: props.profile.social[key] })
    }

    //displaying social media icons using array and user's website
    let displaySocialLinks = socialLinksArray.length === 0 ? null : socialLinksArray.map(social => {
        return <a href={social.url} target='_blank' key={social.type}><i className={`fab fa-${social.type} fa-2x`}></i>{social.type === 'linkedIn' && <i className="fab fa-linkedin fa-2x"></i>}</a>
    })
    let website = props.profile && props.profile.website ? <a href={props.profile.website} target='_blank'><i className={`fas fa-globe fa-2x`}></i></a> : null

    const dummyGravatar = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'

    return <Fragment>
        <img src={props.profile.user.avatar ? props.profile.user.avatar : dummyGravatar} alt='Poor internet, cant load image' />
        <p style={{fontSize: '2.6rem', fontWeight: 'bold', marginBottom: '5px'}}>{props.profile.user.name}</p>
        <p className='medium' style={{marginBottom: '5px'}} >{props.profile.status} {props.profile.company && <span>at {props.profile.company}</span>}</p>
        <p className='small'>{props.profile.location}</p>
        <div className='profile-top-icons'>
            {website}
            {displaySocialLinks}
        </div>
    </Fragment>
}

export default ProfileTop