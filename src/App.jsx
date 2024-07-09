import TodoList from './components/TodoList'
import './App.css'
const App = () => {
  return (
    <div className="outerContainer">
      <div className="innerContainer">
      <TodoList />
      </div>
    </div>
  )
}

export default App