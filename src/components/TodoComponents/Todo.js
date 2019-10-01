import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {

    render() {
        return (
            <li 
                onClick={this.props.markCompleted} 
                id={this.props.id} 
                className={`todo-item ${this.props.completed ? 'completed' : ''}`}>
                    
                {this.props.task}
                
            </li>
        )
    }
}