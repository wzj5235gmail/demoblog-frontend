import { useEffect, useState } from "react"
import { getCategories, getTags } from "../apis/Apis";
import EditorComponent from "../components/EditorComponent";
import { EditorState } from "draft-js";
import { AddNewCategory } from "../components/AddNewCategory";
import { AddNewTag } from "../components/AddNewTag";


export const ArticleNew = () => {

  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    const load = async () => {
      if (!localStorage.getItem('accessToken')) {
        window.location.pathname = '/';
      }
      try {
        setCategories(await getCategories());
        setTags(await getTags());
        setEditorState(EditorState.createEmpty());
      } catch (error) {
        console.log(error.message);
      }
    }
    load();
  }, []);

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
      <input type="text" name="title" placeholder="Title" onChange={handleTitleChange} className="form-control mb-3" style={{ fontSize: '1.5rem' }} />

      {/* Categories */}
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
      <AddNewCategory />


      {/* Tags */}
      <div className="input-group mb-3">
        <label className="input-group-text" for="tags">Tags </label>
        <select className="form-select" multiple aria-label="multiple select example" id="tags" onChange={handleTagChange} style={{height: '4.5rem'}}>
          {tags.map((tag) => {
            return <option value={tag._id} key={tag._id}>{tag.name}</option>
          })}
        </select>
      </div>
      <AddNewTag />

      <EditorComponent
        title={title}
        selectedCategory={selectedCategory}
        selectedOptions={selectedOptions}
        editorState={editorState}
        isUpdate={false}
      />
    </div>
  )
}