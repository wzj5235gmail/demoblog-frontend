import { useEffect, useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { getArticles, searchArticle } from '../apis/Apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


export const ArticlesList = ({ isSearch }) => {
  const { searchTerm } = useParams();
  const [articles, setArticles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        isSearch ? setArticles(await searchArticle(searchTerm)) : setArticles(await getArticles())
      } catch (error) {
        console.log(error.message);
      }
    }
    load();
  }, [isSearch, searchTerm]);

  const handleCreateArticle = () => {
    if (!localStorage.getItem('accessToken')) {
      setShowAlert(true);
    } else {
      window.location.pathname = '/newArticle';
    }
  }

  return (
    <div className='row'>
      <div className='col-lg-2'></div>
      <div className='col-lg-8'>
        <div className='articles-list'>
          {!isSearch ? (
            <div className='text-end'>
              <button className='btn btn-outline-danger mb-5' onClick={handleCreateArticle}>
                <FontAwesomeIcon icon={faPen} /> New Article
              </button>
            </div>
          ) : (
            <div className='mb-3'>
              <span className='text-danger'>{articles.length}</span> articles found:
            </div>
          )}
          {showAlert && (
            <div class="floating-alert-container">
              <Alert variant='danger' onClose={() => setShowAlert(false)} dismissible>Please Login!</Alert>
            </div>
          )}
          {articles.length !== 0 && (
            <div>
              {articles.map((article) => <ArticleCard article={article} key={article} />)}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}