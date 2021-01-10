import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import Post from './Post'
import DiscussionForm from './DiscussionForm'
import Spinner from '../UIElements/Spinner'
import { loadPost, deleteComment } from '../../store/actions'
import formatDate from '../../utility/formatDate'

const PostDiscussion = ({ loadPost, posts: { post, loading, error }, userId, match, history, deleteComment, alertMsg }) => {

    useEffect(() => {
        loadPost(match.params.id)
    }, [])

    !loading && post && console.log(post.comments)

    const comments = !loading && post && post.comments.map(comment => (
        <div className="comments" key={comment._id}>
            <div className="post my-top-1">
                <div>
                    <Link to={`/user/${comment.user}`}>
                        <img
                            src={comment.avatar}
                            alt="Cant load image"
                        />
                        <h4 className='primary-color'>{comment.name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-top-1">
                        {comment.text}
                    </p>
                    <p className="post-date">
                        Posted on {formatDate(comment.date)}
                    </p>
                    {comment.user === userId && <button type="button" className="btn btn-large btn-dark" onClick={e => deleteComment(post._id, comment._id)}>
                        <i className="fas fa-times"></i>
                    </button>}
                </div>
            </div>
        </div>
    ))

    return loading ? <Spinner /> : (!post ? <h2 className='container'>{error}</h2> : <Fragment>
        <div className='container'>
            <button className='btn btn-large' onClick={() => history.goBack()}>Back to Posts</button>
            <Post post={post} userId={userId} showActions={false} lightBg={true} />

            <DiscussionForm postId={post._id} />

            {!loading && alertMsg && <p className='alert alert-primary'>{alertMsg}</p>}

            {comments}
        </div>
    </Fragment>)
}

const mapStateToProps = state => ({
    alertMsg: state.alert.msg,
    posts: state.post,
    userId: state.auth.user._id
})

export default connect(mapStateToProps, { loadPost, deleteComment })(withRouter(PostDiscussion))