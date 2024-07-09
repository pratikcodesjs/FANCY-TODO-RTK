import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteTodo, addTodo, updateTodo, checkTodo } from '../features/todo/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(state => state.todos)
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState(null)
  const submitHandler = (e) => {
    e.preventDefault()
    if(selected){
      dispatch(updateTodo({selected, input}))
      setInput('')
      setSelected(null)
    } else {
    if (input.trim() !== '') { 
      dispatch(addTodo(input))
      setInput('')
    }}
  }

  return (
    <>
    <form onSubmit={submitHandler} className="addForm">
      <input
        type='text'
        placeholder='Enter a task name'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type='submit'>{(!selected) ? 'Add': 'Update'}</button>
    </form>
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Action</th>
            <th>Edit</th>
            <th>Mark Done</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.taskName}</td>
              {(!todo.status) ? <td style={{ color: 'red' }}>Pending</td> : <td style={{ color: 'green' }}>Completed</td>}
              <td>
                <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
              </td>
              <td>
                <button onClick={() =>  {
                  setInput(todo.taskName)
                  setSelected(todo.id)
                }} onChange={(e) => setInput(e.target.value)}>
                  Edit
                </button>
              </td>
              <td className='checkbox'><input type='checkbox' onClick={() => dispatch(checkTodo(todo.id))}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default TodoList;
