import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <main className='messages'>
          <Message data={this.props.data} previousUser={this.props.data.previousUser}/>
      </main>
    );
  }
}

export default MessageList;