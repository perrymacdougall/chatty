import React, {Component} from 'react';
import data from "../messages.js";
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>Chatty</a>
      </nav>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data
    }
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const newArrayOfMessages = this.state.data.messages.concat(newMessage);
      this.state.data.messages = newArrayOfMessages;
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ loading: false,
        data })
    }, 3000);
  }

  addMessage = (value, username) => {
    const newMessageId = this.state.data.messages.length + 1;
    const newMessage = {id: newMessageId, username: username, content: value};
    const newArrayOfMessages = this.state.data.messages.concat(newMessage);
    this.state.data.messages = newArrayOfMessages;

    this.setState({ loading: false,
      data });
  }

  render() {

    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='container'>
          <Navbar />
          <MessageList data={this.state.data}/>
          <ChatBar data={this.state.data} addMessage={this.addMessage}/>
        </div>
      );
    }
  }
}

export default App;
