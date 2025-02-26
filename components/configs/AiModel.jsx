const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const CodeGenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    export const GenAiCode = model.startChat({
      CodeGenerationConfig,
      history:[
        {
          role: "user",
          parts: [
            {text: "genrate todo app \nGenerate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:\nfiles:{\n  \"/App.js\": {\n    \"code\": \"import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}\"\n  }\n}\n  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,\"firebase\",\"@google/generative-ai\" ) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos.\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n   `,\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"projectTitle\": \"React To-Do App with Tailwind CSS\",\n  \"explanation\": \"This React to-do application is built with Tailwind CSS for styling and uses functional components to manage and display to-do items. It provides functionalities to add, delete, and mark tasks as completed. The application is structured with components separated into logical directories for better organization and maintainability. Emoji icons are used to enhance the user experience.\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"import React, { useState, useEffect } from 'react';\\nimport TodoList from './components/TodoList';\\nimport TodoForm from './components/TodoForm';\\nimport { CheckCircle, Plus, Trash2, Edit, X } from 'lucide-react';\\n\\nfunction App() {\\n  const [todos, setTodos] = useState(() => {\\n    const savedTodos = localStorage.getItem('todos');\\n    if (savedTodos) {\\n      return JSON.parse(savedTodos);\\n    } else {\\n      return [];\\n    }\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem('todos', JSON.stringify(todos));\\n  }, [todos]);\\n\\n  const addTodo = (text) => {\\n    const newTodo = { id: Date.now(), text, completed: false };\\n    setTodos([...todos, newTodo]);\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));\\n  };\\n\\n  const deleteTodo = (id) => {\\n    setTodos(todos.filter(todo => todo.id !== id));\\n  };\\n\\n  const editTodo = (id, newText) => {\\n    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));\\n  };\\n\\n  return (\\n    <div className=\\\"container mx-auto p-4 md:p-8 lg:p-12 bg-gray-100 rounded-lg shadow-xl\\\">\\n      <h1 className=\\\"text-3xl font-bold text-center text-blue-600 mb-6\\\">My To-Do List 📝</h1>\\n      <TodoForm addTodo={addTodo} />\\n      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />\\n    </div>\\n  );\\n}\\n\\nexport default App;\\n\"\n    },\n    \"/components/TodoForm.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\n\\nfunction TodoForm({ addTodo }) {\\n  const [text, setText] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (text.trim()) {\\n      addTodo(text);\\n      setText('');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\\"flex items-center mb-4\\\">\\n      <input\\n        type=\\\"text\\\"\\n        value={text}\\n        onChange={(e) => setText(e.target.value)}\\n        placeholder=\\\"Add a new task...\\\" // Using placeholder attribute\\n        className=\\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\\"\\n      />\\n      <button type=\\\"submit\\\" className=\\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline\\\">\\n        <Plus className=\\\"inline-block mr-1\\\" /> Add\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default TodoForm;\\n\"\n    },\n    \"/components/TodoList.js\": {\n      \"code\": \"import React from 'react';\\nimport TodoItem from './TodoItem';\\n\\nfunction TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {\\n  return (\\n    <ul>\\n      {todos.map(todo => (\\n        <TodoItem\\n          key={todo.id}\\n          todo={todo}\\n          toggleComplete={toggleComplete}\\n          deleteTodo={deleteTodo}\\n          editTodo={editTodo}\\n        />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;\\n\"\n    },\n    \"/components/TodoItem.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { CheckCircle, Trash2, Edit, X } from 'lucide-react';\\n\\nfunction TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {\\n  const [isEditing, setIsEditing] = useState(false);\\n  const [editText, setEditText] = useState(todo.text);\\n\\n  const handleEdit = () => {\\n    editTodo(todo.id, editText);\\n    setIsEditing(false);\\n  };\\n\\n  return (\\n    <li className=\\\"flex items-center justify-between py-2 px-4 mb-2 bg-white rounded shadow hover:bg-gray-50 transition-colors duration-200\\\">\\n      {isEditing ? (\\n        <input\\n          type=\\\"text\\\"\\n          value={editText}\\n          onChange={(e) => setEditText(e.target.value)}\\n          onBlur={handleEdit}\\n          onKeyDown={(e) => {\\n            if (e.key === 'Enter') {\\n              handleEdit();\\n            }\\n            if (e.key === 'Escape') {\\n              setIsEditing(false);\\n              setEditText(todo.text);\\n            }\\n          }}\\n          className=\\\"flex-grow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2\\\"\\n          autoFocus\\n        />\\n      ) : (\\n        <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}\\n              onClick={() => toggleComplete(todo.id)}\\n        >\\n          {todo.text}\\n        </span>\\n      )}\\n      <div>\\n        <button onClick={() => toggleComplete(todo.id)} className=\\\"text-green-500 hover:text-green-700 mr-2 focus:outline-none\\\">\\n          <CheckCircle className=\\\"h-5 w-5\\\" />\\n        </button>\\n        <button onClick={() => setIsEditing(true)} className=\\\"text-blue-500 hover:text-blue-700 mr-2 focus:outline-none\\\">\\n          <Edit className=\\\"h-5 w-5\\\" />\\n        </button>\\n        <button onClick={() => deleteTodo(todo.id)} className=\\\"text-red-500 hover:text-red-700 focus:outline-none\\\">\\n          <Trash2 className=\\\"h-5 w-5\\\" />\\n        </button>\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;\\n\"\n    }\n  },\n  \"generatedFiles\": [\n    \"/App.js\",\n    \"/components/TodoForm.js\",\n    \"/components/TodoList.js\",\n    \"/components/TodoItem.js\"\n  ]\n}\n```"},
          ],
        },
      ],
    })

    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
