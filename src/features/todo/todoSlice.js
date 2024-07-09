import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    todos: [
    ]
}

const deleteItem = (state, action) => {
    state.todos = state.todos.filter((todo) => todo.id !== action.payload)
}
const updateItem  = (state, action) => {
    const { selected, input } = action.payload
    const todoUpdate = state.todos.find(todo => todo.id === selected)
    if (todoUpdate){
        todoUpdate.taskName = input
    }
}
const check = (state, action) => {
    const todoUpdate = state.todos.find(todo => todo.id === action.payload)
    if(todoUpdate){
        todoUpdate.status = true
    }
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid() ,
                taskName: action.payload,
                status: false
            }
            state.todos.push(todo)
        },
        deleteTodo: deleteItem,
        updateTodo: updateItem,
        checkTodo: check
    }
})

export const { addTodo, deleteTodo, updateTodo, checkTodo } = todoSlice.actions
export default todoSlice.reducer