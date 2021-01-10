import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import formatDate from '../../utility/formatDate'
import { addLike, deletePost, removeLike } from '../../store/actions'

const Post = ({ post, userId, addLike, deletePost, removeLike, showActions, lightBg }) => {

    const postClasses = ['post']
    if(lightBg) postClasses.push('bg-light')

    return <Fragment>
        <div className={postClasses.join(' ')}>
            <div>
                <Link to={`/user/${post.user}`}>
                    <img src={post.avatar} alt='cant load image' />
                    <h4 className='primary-color'>{post.name}</h4>
                </Link>
            </div>
            <div>
                <Link to={`/posts/${post._id}`}>
                    <p className="my-top-1" style={{ color: 'black', cursor: 'default' }}>
                        {post.text}
                    </p>
                </Link>
                <p className="post-date my-top">
                    Posted on {formatDate(post.date)}
                </p>
                {showActions && <Fragment>
                    <button type="button" className="btn btn-light" onClick={e => addLike(post._id)}>
                        <i className="fas fa-thumbs-up"></i>
                        <span>{post.likes.length === 0 ? null : <span> {post.likes.length}</span>}</span>
                    </button>
                    <button type="button" className="btn btn-light" onClick={e => removeLike(post._id)}>
                        <i className="fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/posts/${post._id}`} className="btn btn-primary">
                        Discussion {post.comments.length === 0 ? null : <span className='comment-count'> {post.comments.length}</span>}
                    </Link>
                    {post.user === userId && <button type="button" className="btn btn-large btn-dark" onClick={e => deletePost(post._id)}>
                        <i className="fas fa-times"></i>
                    </button>}
                </Fragment>}
            </div>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    userId: state.auth.user._id
})

export default connect(mapStateToProps, { addLike, deletePost, removeLike })(Post)