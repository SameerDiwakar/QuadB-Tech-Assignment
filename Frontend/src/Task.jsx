import { useState, useEffect, useContext } from 'react';
import { FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import WeatherList from './Store/WeatherList';
import { UserContext } from './UserContext'; 

function Task() {
  const [todo, setTodo] = useState("");
  const [city, setCity] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  const { userId } = useContext(UserContext); 

  useEffect(() => {
    let todoString = localStorage.getItem(`todos_${userId}`) || localStorage.getItem('todos_default');
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, [userId]);

  const saveToLS = () => {
    localStorage.setItem(`todos_${userId || 'default'}`, JSON.stringify(todos));
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
      <div className="container mx-auto my-5 p-5 bg-pink-100 rounded-lg shadow-lg">
        <div className="addTodo mb-5">
          <h2 className="text-2xl font-bold mb-3 text-pink-700 flex items-center gap-2">
            🌸 Add a To-Do
          </h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter task"
              className="flex-1 rounded-lg px-4 py-2 border-2 border-pink-500 outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            />
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
              placeholder="Enter city or state"
              className="flex-1 rounded-lg px-4 py-2 border-2 border-pink-500 outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length === 0 || city.length === 0}
              className="bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700 disabled:bg-gray-400 transition-all transform hover:scale-105"
            >
              💾 Save
            </button>
          </div>
        </div>
        <div className="todos">
          <h2 className="text-2xl font-bold mb-3 text-pink-700 flex items-center gap-2">
            📝 Your To-Do's
          </h2>
          {todos.length === 0 && (
            <p className="text-gray-500">No To-Do's to display 😔</p>
          )}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-3 ">
                <div className="flex items-center gap-3">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <div className={item.isCompleted ? "line-through text-gray-500" : "text-gray-800"}>
                    {item.todo} <span className="text-pink-600">({item.city})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="text-pink-600 hover:text-pink-800 transition-all transform hover:scale-110"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="text-red-600 hover:text-red-800 transition-all transform hover:scale-110"
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