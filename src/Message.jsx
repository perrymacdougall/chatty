import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super();
  }

  render() {
    const messageList = this.props.data.messages;

    const messageListItems = messageList.map((item) => {
      return <ul key={item.id}>
                <li className='message-username'>{item.username}</li>
                <li className='message-content'>{item.content}</li>
             </ul>
    });

    return (
      <div className='message'>
        {messageListItems}
      </div>
    );
  }
}

export default Message;