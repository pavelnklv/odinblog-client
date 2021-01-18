import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { AuthContext, JWT_KEY } from '../context/authContext';

export default function MyArticlesPage() {
  const { me } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('drafts');
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (activeTab === 'drafts') {
      setLoading(true);
      fetch('/api/articles/me/drafts', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}` }
      })
        .then(res => res.json())
        .then(json => {
          setArticles(json.data.articles);
          setLoading(false);
        });
    } else if (activeTab === 'published') {
      setLoading(true);
      fetch(`/api/users/${me._id}/articles`)
        .then(res => res.json())
        .then(json => {
          setArticles(json.data.articles);
          setLoading(false);
        });
    }
  }, [activeTab, me])

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'drafts' ? 'active' : ''}`}
              onClick={() => setActiveTab('drafts')}
            >
              Drafts
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'published' ? 'active' : ''}`}
              onClick={() => setActiveTab('published')}
            >
              Published
            </button>
          </li>
        </ul>
      </div>
      <div className="col-12 mb-3">
        {loading ? (
          <Loader />
        ) : (
          articles.map(article => (
            <h6 key={article._id}>{article.title}</h6>
          ))
        )}
      </div>
    </div>
  );
}
