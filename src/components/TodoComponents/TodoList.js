import React, { Component } from 'react';
import Todo from './Todo';


export default class TodoList extends Component {

    render() {
        return (
            <ol className="todo-list">
                {
                    this.props.todos.map(({ id, task, completed }) => <Todo 
                        key={id} 
                        id={id} 
                        task={task} 
                        completed={completed} 
                        markCompleted={this.props.markCompleted} 
                    />)
                }
            </ol>
        )
    }
}
