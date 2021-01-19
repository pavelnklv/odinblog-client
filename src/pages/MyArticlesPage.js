import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleItem from '../components/ArticleItem';
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

  useEffect(() => {
    document.title = 'My articles - Odinblog'
  }, [])

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
            <div className="row mb-3 border-bottom" key={article._id}>
              <div className="col-12">
                <h4>
                  <Link
                    className="text-decoration-none"
                    to={`/a/${article.slug}`}
                  >
                    {article.title}
                  </Link>
                  <span className="float-end">
                    <Link
                      role="button"
                      className="text-success"
                      to={`/a/${article.slug}/edit`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </Link>
                    {' '}
                    <i
                      role="button"
                      className="text-danger"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                      </svg>
                    </i>
                  </span>
                </h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
