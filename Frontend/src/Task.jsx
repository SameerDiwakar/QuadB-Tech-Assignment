import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import WeatherList from './WeatherList';

function Task() {
  const [todo, setTodo] = useState("");
  const [city, setCity] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    setCity(t[0].city);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, city, isCompleted: false }]);
    setTodo("");
    setCity("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <div className="container mx-auto my-5 p-5 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold text-indigo-700 mb-5">iTask - Get Things Done</h1>
        <div className="addTodo mb-5">
          <h2 className="text-xl font-semibold mb-3">Add a To-Do</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter task"
              className="flex-1 rounded-lg px-4 py-2 border-2 border-indigo-500 outline-none"
            />
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
              placeholder="Enter city or state"
              className="flex-1 rounded-lg px-4 py-2 border-2 border-indigo-500 outline-none"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length === 0 || city.length === 0}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Save
            </button>
          </div>
        </div>
        <div className="todos">
          <h2 className="text-xl font-semibold mb-3">Your To-Do's</h2>
          {todos.length === 0 && <p className="text-gray-500">No To-Do's to display</p>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between items-center bg-white p-3 rounded-lg shadow-md mb-3">
                <div className="flex items-center gap-3">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="w-5 h-5"
                  />
                  <div className={item.isCompleted ? "line-through text-gray-500" : "text-gray-800"}>
                    {item.todo} <span className="text-indigo-600">({item.city})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
        <WeatherList tasks={todos} />
      </div>
    </>
  );
}

export default Task;