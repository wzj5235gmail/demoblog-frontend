import { addTag } from "../apis/Apis";

const { useEffect, useState } = require("react");

export const AddNewTag = () => {
  const [newTag, setNewTag] = useState('');
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth({
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
  }, []);

  const handleNewTagChange = (event) => {
    setNewTag(event.target.value);
  }

  const handleAddNewTag = async () => {
    if (!localStorage.getItem('accessToken')) {
      alert('Please login!');
    } else {
      try {
        await addTag({ name: newTag }, auth);
        window.location.reload();
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    }
  }

  return (
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder="Add new Tag" aria-label="Add new Tag" aria-describedby="button-addon1" onChange={handleNewTagChange} />
      <button className="btn btn-outline-success" type="button" id="button-addon1" onClick={handleAddNewTag}>Add</button>
    </div>
  )
}