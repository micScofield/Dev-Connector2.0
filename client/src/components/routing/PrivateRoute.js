import { Redirect, Route } from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
    <Route {...rest} render={props => isAuth ? (<Component {...props} />) : (<Redirect to='/login' />)} />
)

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(PrivateRoute)