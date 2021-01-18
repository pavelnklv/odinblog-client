import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function UserPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${params.userId}`)
      .then(res => res.json())
      .then(json => setUser(json.data.user))
      .then(() => fetch(`/api/users/${params.userId}/articles`)
        .then(res => res.json())
        .then(json => {
          setArticles(json.data.articles);
          setLoading(false);
        }));
  }, [params])

  if (loading) return <Loader />;

  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-3">
            <h5>{user.firstName} {user.lastName}</h5>
            <p>{user.about}</p>
          </div>
          <div className="col-9">
            {articles.map(article => (
              <h6 key={article._id}>{article.title}</h6>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}