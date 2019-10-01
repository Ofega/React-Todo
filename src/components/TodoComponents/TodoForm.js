import React, { Component } from 'react';


export default class TodoForm extends Component {
    render() {
        return (
            <form className="todo-form">
                <input
                    type="text" 
                    placeholder="Enter your todo here" 
                    name="todo" 
                    value={this.props.newTask} 
                    onChange={this.props.handleInputChange}
                />

                <div className="todo-form-btns">
                    <button onClick={this.props.addTodo}>Add Todo</button>
                    <button onClick={this.props.clearCompleted}>Clear Completed</button>
                </div>
            </form>
        )
    }
}