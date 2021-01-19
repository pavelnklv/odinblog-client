import { useContext, useEffect, useState } from 'react';
import { AuthContext, JWT_KEY } from '../context/authContext';
import Loader from './Loader';

export default function Comments({ article }) {
  const { me } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`/api/articles/${article}/comments`)
      .then(res => res.json())
      .then(json => {
        setComments(json.data.comments);
        setLoading(false);
      })
  }, [article])

  const onAddCommentClick = e => {
    e.preventDefault()

    if (newComment === '') {
      return
    }

    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
      },
      body: JSON.stringify({
        articleSlug: article,
        text: newComment
      })
    })
      .then(res => res.json())
      .then(json => {
        setComments([json.data.comment, ...comments]);
        setNewComment('');
      });
  }

  if (loading) return <Loader />

  return (
    <div className="row">
      <div className="col">
        {me ? (
          <form>
            <textarea
              className="form-control mb-3"
              placeholder="Write a comment"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={onAddCommentClick}
            >
              Add Comment
            </button>
          </form>
        ) : (
          <p>Please sign in to add a comment.</p>
        )}
        <ul className="list-group list-group-flush">
            {comments.map(comment => (
              <li className="list-group-item" key={comment._id}>
                {comment.author.firstName} {comment.author.lastName}: {comment.text}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
