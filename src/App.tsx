import { useState } from "react"; 
import { List, ListItem } from "@chakra-ui/react";

interface Todo {
    id: string;
    text: string;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
      setNewTodo(event.currentTarget.value);
    }

    const handleAddTodo = () => { 
      const data = [...todos, {id:  Date.now().toString(), text: newTodo}];
      setTodos (data);
    
    };

    const handleRemoveTodo = (id: string) => {
      setTodos (data=>data.filter((todo) => todo.id !== id));
      
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