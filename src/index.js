import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import _ from 'lodash';
import './style.css';
import Card from './Card';

class App extends Component {
  state = {
    users: null,
    fiteredUsers: null,
    term: '',
    sortField: '',
  };

  componentWillMount() {
    axios.get('https://randomuser.me/api/?results=9').then(res => {
      this.setState({
        users: res.data.results,
        filteredUsers: res.data.results,
      })
      console.log('state.users', res.data.results)
    });
  }

  updateEmail = (userId, email) => {
    const { users, filteredUsers } = this.state
    users[users.findIndex(user => user.login.uuid === userId)].email = email;
    this.setState({ users })
    filteredUsers[filteredUsers.findIndex(user => user.login.uuid === userId)].email = email;
    this.setState({ filteredUsers })
  }



  renderUsers = () => {
    const { filteredUsers } = this.state
    if (filteredUsers) {
      return filteredUsers.map(user => {
        return (
          <Card
            key={user.login.uuid}
            user={user}
            updateEmail={(email) => this.updateEmail(user.login.uuid, email)}
          />
        )
      })
    }
  }

  onSearchTermChanged = term => {
    const debouncedFilterByCity =
      _.debounce(term => { this.filterByCity(term) }, 300)
    this.setState({ term })
    debouncedFilterByCity(term)
  }

  filterByCity = () => {
    const { users, term } = this.state
    const filteredUsers =
      users.filter(user => user.location.city.toLowerCase().includes(term))
    this.setState({ filteredUsers })
    this.handleSort()
  }

  handleSort = (sortField) => {
    if (sortField) {
      this.setState({ sortField })
    }
    const { filteredUsers, searchField } = this.state
    if (sortField) {
      filteredUsers.sort((a, b) => 
      a.location[sortField].localeCompare(b.location[sortField]))
    }
    this.setState({ filteredUsers })
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="search-bar">
            <input
              autoFocus
              value={this.state.term}
              onChange={e => this.onSearchTermChanged(e.target.value)}
              placeholder="Search By City..."
            />
          </div>
          <select
            onChange={e => this.handleSort(e.target.value)}
            className="sort-by"
          >
            <option value="">Sort by...</option>
            <option value="city">City</option>
            <option value="state">State</option>
          </select>
        </div>
        <div className="cards">
          {this.renderUsers()}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
