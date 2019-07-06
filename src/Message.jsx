import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super();
  }

  render() {
    const messageList = this.props.data.messages;
    const previousUser = this.props.previousUser;
    // console.log(previousUser);
    const messageListItems = messageList.map((item) => {
      if (item.type === "postMessage") {
        return <ul key={item.id}>
                  <li className='message-username'>{item.username}</li>
                  <li className='message-content'>{item.content}</li>
               </ul>
      } else if (item.type === "postNotification") {
        // console.log(previousUser, item.oldName);
        return <ul key={item.id}>
                  <li className='message-username'>{item.oldName}'s name is now {item.username}</li>
               </ul>
      }
    });

    return (
      <div className='message'>
        {messageListItems}
      </div>
    );
  }
}

export default Message;