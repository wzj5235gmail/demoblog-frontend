import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createArticle, updateArticleById } from '../apis/Apis';
import { stateToHTML } from 'draft-js-export-html';
import Alert from 'react-bootstrap/Alert';


const EditorComponent = (props) => {
  const [editorState, setEditorState] = useState();
  const [auth, setAuth] = useState();
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    setEditorState(props.editorState);
    setAuth({
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
  }, [props.editorState])

  const handleEditorChange = (newState) => {
    setEditorState(newState);
  };

  const handleContentSave = async () => {
    if (!localStorage.getItem('accessToken')) {
      setShowAlert(true);
    } else {
      try {
        const contentState = editorState.getCurrentContent();
        await createArticle({
          title: props.title,
          content: stateToHTML(contentState),
          categoryId: props.selectedCategory,
          tagIds: props.selectedOptions,
        }, auth);
        window.location.pathname = '/';
      } catch (error) {
        alert('Create failed: ' + error.response.data.error)
        console.log(error);
      }
    }
  };

  const handleContentUpdate = async () => {
    if (!localStorage.getItem('accessToken')) {
      setShowAlert(true);
    } else {
      try {
        const contentState = editorState.getCurrentContent();
        await updateArticleById(props.articleId, {
          title: props.title,
          content: stateToHTML(contentState),
          categoryId: props.selectedCategory,
          tagIds: props.selectedOptions,
        }, auth);
        window.location.pathname = '/articleDetail/' + props.articleId;
      } catch (error) {
        alert('Update failed: ' + error.response.data.error)
        console.log(error);
      }
    }
  }

  return (
    <div className='mb-5'>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder='Write your content...'
      />
      {showAlert && (
        <div class="floating-alert-container">
          <Alert variant='danger' onClose={() => setShowAlert(false)} dismissible>Please Login!</Alert>
        </div>
      )}
      <style>
        {`
          .editorClassName {
            border: 1px solid #ccc;
            padding: 8px;
          }
        `}
      </style>
      <div className='text-center mt-3'>
        {props.isUpdate ? (
          <button className='btn btn-success' onClick={handleContentUpdate}>Update</button>
        ) : (
          <button className='btn btn-success' onClick={handleContentSave}>Save</button>
        )}
      </div>

    </div>
  );
};

export default EditorComponent;
