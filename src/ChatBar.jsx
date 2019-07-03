import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const value = this.refs.text.value;
      const username = this.refs.userName.defaultValue;
      this.props.addMessage(value, username);
    }
  }

  render() {
    // console.log(this.props.data);
    const name = this.props.data.currentUser.name;


    return (
      <footer className='chatbar'>
        <input className='chatbar-username' ref='userName' defaultValue={name} placeholder='Your name here' />
        <input className='chatbar-message' ref='text' onKeyPress={this.handleKeyPress} placeholder='Type your heart out' />
      </footer>
    );
  }
}

export default ChatBar;