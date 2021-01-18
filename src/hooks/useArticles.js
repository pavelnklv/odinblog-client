import { useEffect, useState } from 'react';

export default function useArticles(query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`/api/articles/${query || ''}`)
      .then(res => res.json())
      .then(json => {
        setArticles(json.data.articles);
        setLoading(false);
      }, err => {
        setError(true)
        setLoading(false)
      })
  }, [query]);

  return { loading, error, articles };
}
