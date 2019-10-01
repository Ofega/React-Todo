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
        if (item.id !== e.target.id) {
          console.log(item);
          return item;
        }

        console.log(item);
        return { id: item.id, task: item.task, completed: true };
      })
    }))
  }

  addTodo = (e) => {
    e.preventDefault();

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

  clearCompleted = () => {

  }

  render() {
    return (
      <div>
        <h2>Welcome to your Todo App!</h2>
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
    );
  }
}

export default App;
