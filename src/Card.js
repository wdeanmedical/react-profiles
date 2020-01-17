
import React, { Component } from 'react';
import './style.css';

class Card extends Component {

  state = {
    editable: false,
  }

  handleEditClick = () => {
    const { updateEmail } = this.props;
    const { editable } = this.state;
    if (!editable) {
      this.setState({ editable: true })
    } else {
      this.setState({ editable: false })
    }
  }

  render() {
    const { user, updateEmail } = this.props;
    const { editable } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <img
            src="https://wdeanmedical.com/edit.png"
            className="edit-icon"
            onClick={() => this.handleEditClick()}
          />
          <div className="username">{user.name.first} {user.name.last}</div>
        </div>
        <img className="user-image" src={user.picture.large} />
        {editable &&
          <input
            type="text"
            value={user.email}
            className="email-text"
            onChange={e => updateEmail(e.target.value)}
          />
        }
        {!editable &&
          <div className="body-text">{user.email}</div>
        }
        <div className="body-text">{user.phone}</div>
        <div className="body-text city-country">{user.location.city}, {user.location.state}</div>
      </div>
    )
  }
}

export default Card;