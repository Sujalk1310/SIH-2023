import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    const { searchQuery, onSearch } = this.props;

    return (
      <div className='py-5'>
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={onSearch}
        />
      </div>
    );
  }
}

export default SearchBar;
