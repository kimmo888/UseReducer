import { useReducer, useState } from "react";


const types = {
    add : "add",
    delete : "delete",
    update : "update",
} // se crean los tipos de acciones como constantes

const initialTodos = [
    { id: 1, title: "Todo #1"},
    { id: 2, title: "Todo #2"},
    { id: 3, title: "Todo #3"},
    { id: 4, title: "Todo #4"},
] // se crea un array de todos iniciales

const reducer = (state, action) => {
    switch (action.type) {
        case types.delete:
            return state.filter(todo => todo.id !== action.id);
        case types.add:
            return [...state, action.title ];
        case types.update:
            return state.map(todo => todo.id === action.Todo.id ? action.Todo : todo);
        default:
            return state;
    }
}  // se crea el reducer que se encarga de las acciones de los types

const TodoApp = () => {

    const [todos, dispatch] = useReducer(reducer, initialTodos);
    const [text, setText] = useState(""); //para el input de texto

    const handleSubmit = (e) => {
        e.preventDefault(); // para que no se recargue la pagina
        const newTodo = { id: Math.random(), title: text }// se crea un nuevo, todo con un id aleatorio y el texto del input
        dispatch({
            type: types.add,
            title: newTodo,
        });
        setText(""); // se limpia el input
    } // se crea una function para el input de texto


    return (
        <div>
            <h2>Todo App</h2>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} >
                        {todo.title}
                        <button onClick={()=>dispatch({
                            type: types.delete,
                            id: todo.id
                        })} >
                            Delete
                        </button>
                        <button onClick={()=>dispatch({
                            type: types.update,
                            Todo: {...todo, title: text}
                        })} >
                            Update
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Todo"
                value={text}
                onChange={e => setText(e.target.value)}
                />
                <button >
                    Add
                </button>
            </form>
            <p>-------------------------End----------------------</p>
        </div>

    )
}

export default TodoApp