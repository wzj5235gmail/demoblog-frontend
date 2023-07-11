import { useEffect, useState } from "react";
import { createComment, deleteArticleById, getArticleById, likeArticleById } from "../apis/Apis";
import { CommentCard } from "../components/CommentCard";
import Alert from 'react-bootstrap/Alert';


export const ArticleDetail = ({ match }) => {
  const { articleId } = match.params;

  const [comment, setComment] = useState('');
  const [article, setArticle] = useState({});
  const [auth, setAuth] = useState();
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    const load = async () => {
      try {
        setArticle(await getArticleById(articleId));
        setAuth({
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    load();
  }, [articleId])

  const handleCommentChange = (event) => {
    event.preventDefault();
    setComment(event.target.value);
  }

  const handleDeleteArticle = async () => {
    if (!localStorage.getItem('accessToken')) {
      setShowAlert(true);
    } else {
      try {
        await deleteArticleById(articleId, auth);
        window.location.pathname = '/';
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  const handleUpdateArticle = () => {
    !localStorage.getItem('accessToken') ? setShowAlert(true) : window.location.pathname = '/articleUpdate/' + articleId;
  }

  const handleLikeArticle = async () => {
    try {
      await likeArticleById(articleId, auth);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleCreateComment = async () => {
    if (!localStorage.getItem('accessToken')) {
      setShowAlert(true);
    } else {
      try {
        await createComment({
          articleId,
          content: comment
        }, auth);
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  }



  return (
    <div className="article-detail row">
      <div className="col-lg-2"></div>
      <div className="col-lg-8">
        {showAlert && (
          <div class="floating-alert-container">
            <Alert variant='danger' onClose={() => setShowAlert(false)} dismissible>Please Login!</Alert>
          </div>
        )}
        <button onClick={() => window.history.back()} className="mb-5 btn btn-outline-secondary">Back</button>
        {Object.keys(article).length === 0 ? (
          <p>loading...</p>
        ) : (<>
          <h2 className="title mb-5">{article.article.title}</h2>
          <p className="author text-secondary mb-2 text-end">Author / {article.article.author.username}</p>
          <p className="category text-end mb-2 text-secondary">Category / {article.article.category.name}</p>
          <p className="category text-end mb-5 text-secondary">Tags /
            {article.article.tags.map((tag) => {
              return <span key={tag._id}> {tag.name} </span>
            })}
          </p>
          <div className="content mb-5" dangerouslySetInnerHTML={{ __html: article.article.content }} />
          <div className="text-end text-secondary mb-5">
            <div>
              Published at: {new Date(article.article.createdAt).toLocaleDateString()}
            </div>
            <div>
              Last Updated at: {new Date(article.article.updatedAt).toLocaleDateString()}
            </div>
          </div>
          <div className="text-end text-secondary mb-5">
            <span className="views">Views: {article.article.views}</span> |
            <span className="likes"> Likes: {article.article.likes}</span>
          </div>
          <div className="text-center mb-5">
            {localStorage.getItem('accessToken') && localStorage.getItem('username') === 'admin' && (
              <div className="d-inline">
                <button className="update btn btn-primary me-2" onClick={handleUpdateArticle}>Update</button>
                <button className="delete btn btn-danger me-2" onClick={handleDeleteArticle}>Delete</button>
              </div>
            )}
            {localStorage.getItem('accessToken') && (
              <button className="like btn btn-warning" onClick={handleLikeArticle}>Like</button>
            )}
          </div>

          {/* Comment Submit */}
          {localStorage.getItem('accessToken') && (
            <div>
              <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" onChange={handleCommentChange}></textarea>
                <label for="floatingTextarea">Leave a comment...</label>
              </div>
              <div className="text-end mb-5">
                <button className="btn btn-danger" onClick={handleCreateComment}>Make comment</button>
              </div>
            </div>
          )}

          {/* Comment Display */}
          <h4 className="mb-3">Comments</h4>
          {article.article.comments.length === 0 ? (
            <div className="mb-5 text-secondary">No Comment!</div>
          ) : (
            <div className="mb-5">
              {article.article.comments.map((comment) => {
                return (
                  <CommentCard comment={comment} auth={auth} />
                )
              })}
            </div>
          )}
        </>)}
      </div>



    </div>
  )
}