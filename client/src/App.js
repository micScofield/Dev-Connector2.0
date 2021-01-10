import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRoute from './components/routing/PrivateRoute'
import Navbar from './components/layout/Navbar'
import Lander from './components/layout/Lander'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Developers from './components/Developers/Developers'
import Posts from './components/posts/Posts'
import PostDiscussion from './components/posts/PostDiscussion'
import Logout from './components/auth/Logout'
import CreateProfile from './components/dashboard/profiles/CreateProfile'
import EditProfile from './components/dashboard/profiles/EditProfile'
import AddExperience from './components/dashboard/profiles/AddExperience'
import AddEducation from './components/dashboard/profiles/AddEducation'
import DetailedProfile from './components/Developers/DetailedProfile/DetailedProfile'
import { loadUser } from './store/actions'

import './App.css';

const App = props => {

  useEffect(() => {
    props.LOAD_USER()
  }, [])

  const routes = (
    <Switch>
      <Route path='/register' exact component={Register} />
      <Route path='/login' exact component={Login} />
      <Route path='/developers' exact component={Developers} />
      <Route path='/user/:userId' exact component={DetailedProfile} />
      <PrivateRoute path='/logout' exact component={Logout} />
      <PrivateRoute path='/posts' exact component={Posts} />
      <PrivateRoute path='/posts/:id' exact component={PostDiscussion} />
      <PrivateRoute path='/dashboard' exact component={Dashboard} />
      <PrivateRoute path='/create-profile' exact component={CreateProfile} />
      <PrivateRoute path='/edit-profile' exact component={EditProfile} />
      <PrivateRoute path='/add-experience' exact component={AddExperience} />
      <PrivateRoute path='/add-education' exact component={AddEducation} />
      <Route path='/' exact component={Lander} />
      <Redirect to='/' />
    </Switch>
  )

  return (
    <Router>
      <Fragment>
        <Navbar />
        {routes}
      </Fragment>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    LOAD_USER: () => dispatch(loadUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)