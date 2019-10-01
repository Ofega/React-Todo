import React, { Component } from 'react';
import './Search.css';

export default class SearchForm extends Component {
    render() {
        return (
            <form className="search-form" onSubmit={this.props.handleSearchFormSubmit}>
                <input
                    type="text" 
                    placeholder="Search for your todos here" 
                    name="todo" 
                    value={this.props.SearchTerm} 
                    onChange={this.props.handleSearchInputChange}
                />
            </form>
        )
    }
}