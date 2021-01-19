import { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loader from '../components/Loader';
import useArticles from '../hooks/useArticles';
import { AuthContext, JWT_KEY } from '../context/authContext';

export default function HomePage() {
  const { me } = useContext(AuthContext);
  const { loading, error, articles, setArticles } = useArticles('?sort=-createdAt');

  const onArticleDeleteClick = async articleSlug => {
    const res = await fetch(`/api/articles/${articleSlug}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`}
    });
    if (res.ok) {
      const newArticles = articles.filter(article => article.slug !== articleSlug)
      setArticles(newArticles)
    }
  }

  if (loading) return <Loader />;
  if (error) return <p>Error</p>;

  return (
    <div className="row">
      <div className="col-8">
        <div className="row">
          {articles.map(article => (
            <div className="col-12" key={article._id}>
              <div className="row my-3">
                <div className="col-12">
                  <h4><Link className="text-decoration-none" to={`/a/${article.slug}`}>{article.title}</Link></h4>
                </div>
                <div className="col-12">
                  <p>
                    <small>
                      Posted by {' '}
                      <Link className="text-decoration-none" to={`/u/${article.author._id}`}>
                        {article.author.firstName} {article.author.lastName}
                      </Link>
                      {' '} {moment(article.createdAt).fromNow()}
                    </small>
                    {me && article.author._id === me._id ? (
                      <button
                        className="btn btn-outline-danger btn-sm float-end"
                        onClick={() => onArticleDeleteClick(article.slug)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                      </button>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          ))}
        
        </div>
      </div>
    </div>
  );
}
