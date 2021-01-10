import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import Spinner from '../UIElements/Spinner'
import ListExperience from './ListExperience'
import ListEducation from './ListEducation'
import { currentProfile, deleteAccount } from '../../store/actions'

const Dashboard = props => {

  useEffect(() => {
    props.LOAD_CURRENT_USER()
  }, [])

  const alertClasses = ['alert']
  if (props.alertType === 'success') alertClasses.push('alert-primary')
  else alertClasses.push('alert-dark')

  let dashboard = (
    <div className='container'>
      <h1 className='primary-color'>Dashboard</h1>
      <p className='medium'><i className='fas fa-user'></i> Welcome {props.user && props.user.name}</p>
      {!props.loading && !props.profile && <Fragment>
        <h3>No profile found for your user. Create one ?</h3> <Link className='btn btn-primary' to='/create-profile'>Create Profile</Link>
      </Fragment>
      }

      {props.alertMsg ? <p className={alertClasses.join(' ')}>{props.alertMsg}</p> : null}

      {!props.loading && props.profile && <Fragment>
        <Link to='/edit-profile' className='btn btn-light'>
          <i className='fas fa-user-circle text-primary' /> Edit Profile
        </Link>
        <Link to='/add-experience' className='btn btn-light'>
          <i className='fab fa-black-tie text-primary' /> Add Experience
        </Link>
        <Link to='/add-education' className='btn btn-light'>
          <i className='fas fa-graduation-cap text-primary' /> Add Education
        </Link>
        <ListExperience />
        <ListEducation />
        <button className='btn btn-large btn-dark' style={{marginTop: '1.5rem'}} onClick={() => props.DELETE_ACCOUNT(props.history)}>Delete Account</button>
      </Fragment>}
    </div>
  )
  if (props.loading) dashboard = <Spinner />

  return dashboard
}

const mapStateToProps = state => {
  return {
    loading: state.profile.loading,
    user: state.auth.user,
    profile: state.profile.profile,
    alertMsg: state.alert.msg,
    alertType: state.alert.type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    LOAD_CURRENT_USER: () => dispatch(currentProfile()),
    DELETE_ACCOUNT: (history) => dispatch(deleteAccount(history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard))