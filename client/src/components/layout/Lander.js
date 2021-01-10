import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import './Lander.css'

const Lander = props => {

    if (props.isAuth) {return <Redirect to='/dashboard' />}

    return <section className='landing'>
        <div className='landingOverlay'>
            <div className='landingInner'>
                <h1 className='x-large'>DevConnector</h1>
                <p className='large'>Create a developer profile/portfolio, share posts and get help from other developers</p>
                <div className='buttons'>
                    <Link to='/register' className='btn btn-primary'>Signup</Link>
                    <Link to='/login' className='btn btn-light'>Login</Link>
                </div>
            </div>
        </div>
    </section>
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(Lander)