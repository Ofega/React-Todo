import React from 'react';
import uuid from 'uuid';

import TodoList from './components/TodoComponents/TodoList';
import TodoForm from './components/TodoComponents/TodoForm';
import SearchForm from './components/SearchComponent/SearchForm';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      newTask: '',
      searchTerm: ''
    }
  }

  // TODO FUNCTIONALITY HANDLER FUNCTIONS
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
    }), () => {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    })
  }


  // SEARCH FUNCTIONALITY HANDLER FUNCTIONS
  handleSearchInputChange = (e) => {
    this.setState({
      ...this.state,
      searchTerm: e.target.value
    }, () => {
      this.setState(prevState => ({
        todos: prevState.todos.filter(item => {
          return item.task.includes(this.state.searchTerm)
        })
      }))
    })
  }

  handleSearchFormSubmit = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => {
        if(this.state.searchTerm === '') return item;
        return item.task.includes(this.state.searchTerm);
      })
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

          <SearchForm 
            searchTerm={this.state.searchTerm} 
            handleSearchInputChange={this.handleSearchInputChange}
            handleSearchFormSubmit={this.handleSearchFormSubmit}
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
