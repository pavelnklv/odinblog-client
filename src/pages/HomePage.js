// import {} from 'react';
import useArticles from '../hooks/useArticles';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { loading, error, articles } = useArticles('?limit=6&sort=-createdAt');

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
                      <Link className="text-decoration-none" to={`/users/${article.author._id}`}>
                        {article.author.firstName} {article.author.lastName}
                      </Link>
                      {' '} at {article.createdAt}
                    </small>
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
