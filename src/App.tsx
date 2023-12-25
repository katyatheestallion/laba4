import { useState, useEffect } from "react"; 
import { List, ListItem } from "@chakra-ui/react";

interface Todo {
    id: string;
    text: string;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    useEffect(() => {
      const localStorageTodos = localStorage.getItem("todos");
      const data = localStorageTodos ? JSON.parse(localStorageTodos) : null;
      setTodos(!!data ? data : []);
    }, []);

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
      setNewTodo(event.currentTarget.value);
    }

    const handleAddTodo = () => { 
      const data = [...todos, {id:  Date.now().toString(), text: newTodo}];
      setTodos (data);
      localStorage.setItem("todos", JSON.stringify(data));
    };

    const handleRemoveTodo = (id: string) => {
      const data = todos.filter((todo) => todo.id !== id);
      setTodos (data);
      localStorage.setItem("todos", JSON.stringify(data));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <List>
                {todos.map((todo) => (
                    <ListItem key={todo.id}>
                        {todo.text}
                        <button onClick={() => handleRemoveTodo (todo.id)}>
                            Удалить
                        </button>
                    </ListItem>
                ))}
            </List>
            <input
                type="text"
                placeholder="Добавить задачу"
                onChange={handleOnChange}
            />
            <button
              onClick={handleAddTodo}
            >
              Добавить
            </button>
        </div>
    )
}

export default TodoList;