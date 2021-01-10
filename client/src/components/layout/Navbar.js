import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Navbar.css'

const Navbar = props => {

    let navLinks = (
        <ul>
            <li><Link to="/developers">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    if (props.isAuth) {
        navLinks = (
            <ul>
                <li><Link to="/posts"><i className="fas fa-sticky-note"></i>{' '}<span className="hide-sm">Posts</span></Link></li>
                <li><Link to="/developers"><i className="fab fa-dev"></i>{' '}<span className="hide-sm">Developers</span></Link></li>
                <li><Link to="/dashboard"><i className="fas fa-user"></i>{' '}<span className="hide-sm">Dashboard</span></Link></li>
                <li><Link to="/logout"><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></Link></li>
            </ul>
        )
    }

    return <Fragment>
        <nav className='navbar'>
            <h1>
                <Link to='/'><i className="fas fa-code"></i>{' '}<span className="hide-sm">DevConnector</span></Link>
            </h1>
            {navLinks}
        </nav>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(Navbar)