
import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame'
import './style.css';

class Card extends Component {

  state = {
    editable: false,
  }

  onAnimationFrame(time) {
    const progress = Math.round(time / this.props.durationMs * 100);
    this.bar.style.width = `${progress}%`;

    if (progress === 100) {
      this.props.endAnimation();
    }
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
        <div className="timer">
          <p>{this.props.message}</p>
          <div className="timer__bar" ref={node => this.bar = node}></div>
        </div>
      </div>
    )
  }
}

export default ReactAnimationFrame(Card, 10);