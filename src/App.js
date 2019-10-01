import React from 'react';
import uuid from 'uuid';

import TodoList from './components/TodoComponents/TodoList';
import TodoForm from './components/TodoComponents/TodoForm';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      newTask: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      newTask: e.target.value
    })
  }

  markCompleted = (e) => {
    e.persist();
    
    this.setState(prevState => ({
      todos: prevState.todos.map(item => {
        if (item.id === e.target.id) {
          return { 
            task: item.task, 
            id: item.id, 
            completed: true 
          };
        }

        return item;
      })
    }), () => {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    })
  }

  addTodo = (e) => {
    e.preventDefault();
    
    if(this.state.newTask !== '') {
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          task: this.state.newTask,
          id: uuid(),
          completed: false
        }],
        newTask: ''
      }), () => {
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
      })
    }
  }

  clearCompleted = (e) => {
    e.preventDefault();

    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.completed === false)
    }))
  }

  render() {
    return (
      <div className="app-container">
        <h2>Welcome to your Todo App!</h2>

        <div className="app-content">
          <TodoForm 
            newTask={this.state.newTask} 
            addTodo={this.addTodo} 
            clearCompleted={this.clearCompleted} 
            handleInputChange={this.handleInputChange}
          />

          <TodoList 
            todos={this.state.todos} 
            markCompleted={this.markCompleted} 
          />
        </div>
      </div>
    );
  }
}

export default App;
