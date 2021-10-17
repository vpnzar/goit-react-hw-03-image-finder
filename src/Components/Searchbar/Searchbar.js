import React, { Component } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    queryImg: '',
  };
  handleSearchChange = e => {
    this.setState({ queryImg: e.target.value.toLowerCase() });
  };

  handleSearchSubmit = e => {
    e.preventDefault();

    if (this.state.queryImg.trim() === '') {
      toast.info('RIGHT SOMETHING');
      return;
    }

    this.props.onSubmit(this.state.queryImg);
    this.setState({ queryImg: '' });
    return;
  };

  render() {
    return (
      <header className={s.SearchBar}>
        <form className={s.SearchForm} onSubmit={this.handleSearchSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            onChange={this.handleSearchChange}
            value={this.state.queryImg}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleSearchSubmit: PropTypes.func,
};

export default Searchbar;
