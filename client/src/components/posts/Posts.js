import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { loadPosts, addPost } from '../../store/actions'
import Spinner from '../UIElements/Spinner'

import Post from './Post'

const Posts = ({ loadPosts, addPost, isAuth, posts: { posts, loading }, alertMsg, alertType }) => {

  const [text, setText] = useState('')

  useEffect(() => {
    isAuth && loadPosts()
  }, [isAuth, loadPosts])

  const changeHandler = event => {
    setText(event.target.value)
  }

  const submitPostHandler = (event) => {
    event.preventDefault();
    addPost({ text })
    setText('')
  }

  let displayPosts
  if (!loading) displayPosts = posts

  const alertClasses = ['alert']
  if (alertType === 'success') alertClasses.push('alert-primary')
  else alertClasses.push('alert-dark')

  return <div className='container'>
    <h1 className='primary-color' style={{ fontSize: '2.8rem' }}>Posts</h1>
    <p className='medium'><i className="fas fa-user"></i>Welcome to the community !</p>

    {/* Form for making post */}
    <p className='alert alert-primary my-bottom-1'><strong>Say Something</strong></p>
    <textarea style={{ width: '100%', fontSize: '1.3rem', padding: '0.5rem' }} rows='6' value={text} placeholder='Create A Post' onChange={changeHandler.bind(this)} />
    <button className='btn btn-large btn-primary' onClick={submitPostHandler.bind(this)}>Submit</button>

    {!loading && alertMsg && <p className={alertClasses.join(' ')}>{alertMsg}</p>}

    {loading ? <Spinner /> : (posts.length === 0 ? <h1>No posts to show</h1> : posts.map(post => (
      <Post key={post._id} post={post} showActions={true} />
    )))}

  </div>
}

const mapStateToProps = state => ({
  posts: state.post,
  isAuth: state.auth.isAuth,
  alertType: state.alert.type,
  alertMsg: state.alert.msg
})

export default connect(mapStateToProps, { loadPosts, addPost })(Posts)