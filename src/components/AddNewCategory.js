import { addCategory } from "../apis/Apis";

const { useEffect, useState } = require("react");

export const AddNewCategory = () => {
  const [newCategory, setNewCategory] = useState('');
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth({
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
  }, []);

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  }

  const handleAddNewCategory = async () => {
    if (!localStorage.getItem('accessToken')) {
      alert('Please login!');
    } else {
      try {
        await addCategory({ name: newCategory }, auth);
        window.location.reload();
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    }
  }

  return (
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder="Add new category" aria-label="Add new category" aria-describedby="button-addon1" onChange={handleNewCategoryChange} />
      <button className="btn btn-outline-success" type="button" id="button-addon1" onClick={handleAddNewCategory}>Add</button>
    </div>
  )
}