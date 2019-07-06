import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const value = this.refs.text.value;
      const username = this.refs.userName.value;
      const type = "postMessage";
      this.props.addMessage(value, username, type);
    }
  }

  changeUserName = (e) => {
    if (e.key === 'Enter') {
      const newName = this.refs.userName.value;
      if ( this.props.data.currentUser.name !== newName) {
        const type = "postNotification";
        const oldName = this.props.previousUser.name;
        this.props.nameChange(newName, type, oldName);
      }
    }
  }

  render() {
    const name = this.props.data.currentUser.name;

    return (
      <footer className='chatbar'>
        <input className='chatbar-username' ref='userName' defaultValue={name} onKeyPress={this.changeUserName} placeholder='Your name here' />
        <input className='chatbar-message' ref='text' onKeyPress={this.handleKeyPress} placeholder='Type your heart out' />
      </footer>
    );
  }
}

export default ChatBar;