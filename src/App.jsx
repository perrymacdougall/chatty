import React, {Component} from 'react';
import data from "../messages.js";
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

const wsClient = new WebSocket('ws://0.0.0.0:3001');

class Navbar extends Component {
  constructor(props) {
    super()
  }

  text = () => {
    let result = (this.props.data.numberOfUsers === 1) ? "user" : "users";
    return result;
  }

  render() {
    return (
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>Chatty</a>
        <span className='navbar-users'>{this.props.data.numberOfUsers} {this.text()} online</span>
      </nav>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfUsers: 1,
      previousUser: {name: 'Bob'},
      currentUser: {name: 'Bob'},
      messages: []
    }
    // WebSocket connection
    this.socket = wsClient;
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }

    console.log('componentDidMount <App />');

    this.socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.type === "postEntry") {
        this.setState({
          numberOfUsers: parsedData.clients
        })
      } else {
        const messages = this.state.messages.concat(parsedData);

        this.setState((prevState, props) => ({
          messages
        }));
      }
    }
  }

  addMessage = (value, username, type) => {
    const newMessageId = this.state.messages.length + 1;
    const newMessage = {id: newMessageId, type: type, username: username, content: value};

    this.socket.send(JSON.stringify(newMessage));
  }

  nameChange = (name, type, oldName) => {
    // Changes previousUser and currentUser
    this.setState((prevState, props) => ({
      previousUser: prevState.currentUser,
      currentUser: {name: name}
    }), () => {
          // Creates new notification based on state change
          const newNotification = {type: type, username: name, oldName: this.state.previousUser.name};
          console.log(newNotification);
          this.socket.send(JSON.stringify(newNotification));
        }
    );
  };

  render() {
    return (
      <div className='container'>
        <Navbar data={this.state} />
        <MessageList data={this.state}  />
        <ChatBar data={this.state} addMessage={this.addMessage} nameChange={this.nameChange} previousUser={this.state.previousUser}/>
      </div>
    );
  }
}

export default App;
