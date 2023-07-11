import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { deleteCommentById } from '../apis/Apis';

export const CommentCard = (props) => {

  const handleDeleteComment = async (id) => {
    if (!localStorage.getItem('accessToken')) {
      alert('Please login!');
    } else {
      try {
        await deleteCommentById(id, props.auth);
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div key={props.comment._id} className="card mb-2">
      <div className="card-body">
        <div className='d-flex justify-content-between mb-2'>
          <div className="comment-author card-text text-danger">
            <FontAwesomeIcon icon={faUser} className="me-2" />{props.comment.author.username} says:
          </div>
          <div className='text-end text-secondary d-flex'>
            {new Date(props.comment.createdAt).toLocaleString()}
          </div>
        </div>
        <p className="comment-content card-text">{props.comment.content}</p>
        {localStorage.getItem('accessToken') && localStorage.getItem('username') === 'admin' && (
          <div className='text-end'>
            <button className="btn btn-danger" onClick={() => handleDeleteComment(props.comment._id)}>Delete</button> 
          </div>
        )}
      </div>
    </div>
  )
}