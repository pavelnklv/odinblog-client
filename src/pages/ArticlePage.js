import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function ArticlePage() {
  const { articleSlug } = useParams();
  const [loading, setLoading] = useState(true)
  const [article, setArticle] = useState();

  useEffect(() => {
    fetch(`/api/articles/${articleSlug}`)
      .then(res => res.json())
      .then(json => {
        setArticle(json.data.article)
        setLoading(false)
      })
  }, [articleSlug])

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