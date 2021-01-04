import React, { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/tasks/";
function App() {
  const [tasks, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editItem, setEditItem] = useState(null);

  const fetchData = () => {
    axios
      .get(baseUrl)
      .then((response) => setTask(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem == null) {
      axios
        .post(baseUrl, {
          title: title,
          description: description,
        })
        .then(() => fetchData())
        .catch((error) => console.log(error));
    } else {
      const url = baseUrl + editItem.id + "/";
      axios
        .put(url, {
          title: title,
          description: description,
        })
        .then(() => {
          fetchData();
        })
        .catch((error) => console.log(error))
        .then(() => setEditItem(null));
    }
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    const url = baseUrl + id;
    axios
      .delete(url)
      .then(() => fetchData())
      .catch((error) => console.log(error));
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditItem(task);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="Title"
        />
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="Description"
          cols="30"
          rows="10"
        ></textarea>
        <br />
        <button type="submit">{editItem ? "Edit Task" : "Add task"}</button>
      </form>
      <hr />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
