import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function ArticlePage() {
  const { articleSlug } = useParams();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const [article, setArticle] = useState();

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`/api/articles/${articleSlug}`);
      const json = await res.json();
      if (res.ok) {
        setArticle(json.data.article);
      } else {
        setError(json.error)
      }
      setLoading(false);
    }
    fetchArticle()
  }, [articleSlug])

  if (error) return <p>Not Found</p>
  if (loading) return <Loader />

  return (
    <div className="row">
      <div className="col">
        <h2>{article.title}</h2>
        <MDEditor.Markdown source={article.text} />
      </div>
    </div>
  );
}