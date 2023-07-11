import { useEffect, useState } from "react"
import { getArticleById, getCategories, getTags } from "../apis/Apis";
import EditorComponent from "../components/EditorComponent";
import { ContentState, EditorState, convertFromHTML } from "draft-js";


export const ArticleUpdate = ({ match }) => {
  const { articleId } = match.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    const getArticle = async () => {
      if (!localStorage.getItem('accessToken')) {
        window.location.pathname = '/';
      }
      try {
        const article = await getArticleById(articleId);
        setTitle(article.article.title);
        setContent(article.article.content);
        setCategories(await getCategories());
        setTags(await getTags());
      } catch (error) {
        console.log(error.message);
      }
    }
    getArticle();
    const blocksFromHtml = convertFromHTML(content);
    const state = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap,
    );
    setEditorState(EditorState.createWithContent(state));
  }, [articleId, content])

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleTagChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedValues);
  }

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <input type="text" name="title" placeholder="Title" onChange={handleTitleChange} className="form-control mb-3" style={{ fontSize: '1.5rem' }} value={title}/>
      {Object.keys(categories).length !== 0 && (
        <div className="input-group mb-3">
          <label className="input-group-text" for="category">Category</label>
          <select className="form-select" id="category" name="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value=''>Choose...</option>
            {categories.categories.map((category) => {
              return <option value={category._id} key={category._id}>{category.name}</option>
            })}
          </select>
        </div>
      )}
      <div className="input-group mb-3">
        <label className="input-group-text" for="tags">Tags </label>
        <select className="form-select" multiple aria-label="size 3 multiple select example" id="tags" onChange={handleTagChange}>
          {tags.map((tag) => {
            return <option value={tag._id} key={tag._id}>{tag.name}</option>
          })}
        </select>
      </div>
      <EditorComponent
        editorState={editorState}
        title={title}
        selectedCategory={selectedCategory}
        selectedOptions={selectedOptions}
        isUpdate={true}
        articleId={articleId}
      />
    </div>
  )
}


















// import { useEffect, useState } from "react"
// import { getArticleById, updateArticleById, getCategories, getTags } from "../apis/Apis";
// import { convertFromHTML } from "draft-js";

// export const ArticleUpdate = ({ match }) => {
//   const { articleId } = match.params;
//   const [articleTitle, setArticleTitle] = useState('');
//   const [articleContent, setArticleContent] = useState('');
//   const [categories, setCategories] = useState({});
//   const [tags, setTags] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   useEffect(() => {
//     const getArticle = async () => {
//       const article = await getArticleById(articleId);
//       setArticleTitle(article.article.title);
//       setArticleContent(article.article.content);
//       setCategories(await getCategories());
//       setTags(await getTags());
//     }
//     getArticle();
//   }, [articleId])

//   const handleSubmit = async () => {
//     await updateArticleById(articleId, {
//       title: articleTitle,
//       content: articleContent,
//       categoryId: selectedCategory,
//       tagIds: selectedOptions,
//     });
//     window.location.pathname = '/articleDetail/' + articleId;
//   }

//   const handleTitleChange = (e) => {
//     setArticleTitle(e.target.value);
//   }

//   const handleContentChange = (e) => {
//     setArticleContent(e.target.value);
//   }

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   }

//   const handleTagChange = (e) => {
//     const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
//     setSelectedOptions(selectedValues);
//   }

//   return (
//     <div>
//       <input type="text" name="title" value={articleTitle} onChange={handleTitleChange} />
//       <input type="text" name="content" value={articleContent} onChange={handleContentChange} />
//       <label for="category">Category </label>
//       {Object.keys(categories).length === 0 ? (<select></select>) :
//         <div>
//           <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange}>
//             <option value=''></option>
//             {categories.categories.map((category) => {
//               return <option value={category._id} key={category._id}>{category.name}</option>
//             })}
//           </select>
//         </div>
//       }
//       <label for="tags">Tags </label>
//       <select multiple id="tags" name="tags" value={selectedOptions} onChange={handleTagChange}>
//         {tags.map((tag) => {
//           return <option value={tag._id} key={tag._id}>{tag.name}</option>
//         })}
//       </select>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>

//   )

// }