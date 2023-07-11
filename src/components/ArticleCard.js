import { deleteArticleById } from "../apis/Apis"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";


export const ArticleCard = (props) => {

  const [auth, setAuth] = useState();
  const [plainContent, setPlainContent] = useState('');

  useEffect(() => {
    setAuth({
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
    setPlainContent(htmlToPlainText(props.article.content));
  }, [props.article.content])

  const handleDelete = async () => {
    if (!localStorage.getItem('accessToken')) {
      alert('Please login!');
    } else {
      try {
        await deleteArticleById(props.article._id, auth);
        window.location.reload();
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    }
  }

  const htmlToPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  return (
    <div className="article-card card mb-5">
      <div className="card-body">
        <h2 className="title card-title mb-3 display-6"><a href={'/articleDetail/' + props.article._id} className="title-href text-danger text-decoration-none">{props.article.title}</a></h2>
        <div className="d-flex justify-content-between mb-3 lead">
          <div className="author card-text text-secondary">Author / {props.article.author.username}</div>
          <div className="createTime card-text text-secondary">
            {new Date(props.article.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="content card-text mb-3">
          {plainContent.split(' ').length > 100 ? plainContent.split(' ').slice(0, 100).join(' ') + '...' : plainContent}
        </div>
        <p className="stats card-text text-end text-secondary lead mb-3">
          <span>Views: {props.article.views}</span> | <span>Likes: {props.article.likes}</span>
        </p>
        {localStorage.getItem('accessToken') && localStorage.getItem('username') === 'admin' && (
          <button className="btn btn-danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        )}
      </div>
    </div>
  )
}