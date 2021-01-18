import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import Loader from './Loader';

export default function Comments({ article }) {
  const { me } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/comments/${article}`)
      .then(res => res.json())
      .then(json => {
        setComments(json.data.comments);
        setLoading(false);
      })
  }, [article])

  if (loading) return <Loader />

  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col">
            {me ? (
              <form>
                <textarea
                  placeholder="Write a comment"
                />
              </form>
            ) : (
              <p>Please sign in to add a comment.</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col">
            {comments.map(comment => (
              <p key={comment._id}>{comment.text}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
