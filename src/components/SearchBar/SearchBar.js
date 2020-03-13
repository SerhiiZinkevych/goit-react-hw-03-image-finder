import styles from './SearchBar.module.css';
import PropTypes from 'prop-types';

import React, { Component } from 'react';

export default class SearchBar extends Component {
  state = {
    querry: '',
  };

  handleChange = e => {
    this.setState({
      querry: e.target.value,
    });
  };

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onFormSubmit(this.state.querry);
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.querry}
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
