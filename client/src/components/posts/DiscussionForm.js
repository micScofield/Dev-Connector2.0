import { useState, Fragment } from 'react'
import { connect } from 'react-redux'

import { addComment } from '../../store/actions'

const DiscussionForm = ({ postId, addComment }) => {

    const [text, setText] = useState('')

    const changeHandler = event => {
        setText(event.target.value)
    }

    const submitPostHandler = (event) => {
        event.preventDefault();
        addComment(postId, { text })
        setText('')
    }

    return <Fragment>
        <div>
            <div className='alert alert-primary'><h4>Leave A Comment</h4></div>
            <form className="my-top-1">
                <textarea style={{ width: '100%', fontSize: '1.3rem', padding: '0.5rem' }} rows='3' value={text} placeholder='Write something...' onChange={changeHandler.bind(this)} />
                <button className='btn btn-large btn-dark' onClick={submitPostHandler.bind(this)}>Submit</button>
            </form>
        </div>
    </Fragment>
}

export default connect(null, { addComment })(DiscussionForm)