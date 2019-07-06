import React, {Component} from 'react';
// import SocketServer from '../../chatty_server/server.js';
import data from "../messages.js";
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

const wsClient = new WebSocket('ws://0.0.0.0:3001');

class Navbar extends Component {
  constructor(props) {
    super()
  }

  // componentDidMount() {
  //   const users = this.props.data.numberOfUsers;

  //   if (users === 1) {
  //     const label = "user online";
  //   } else if (users !== 1) {
  //     const label = "users online";
  //   }
  // }

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
      // loading: true,
      numberOfUsers: 1,
      previousUser: {name: 'Bob'},
      currentUser: {name: 'Bob'},
      messages: []
    }
    // WebSocket connection
    this.socket = wsClient;
    this.nameChange = this.nameChange.bind(this);
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }

    console.log('componentDidMount <App />');
    // setTimeout(() => {
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const newArrayOfMessages = this.state.data.messages.concat(newMessage);
    //   this.state.data.messages = newArrayOfMessages;
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({ loading: false,
    //     data })
    // }, 3000);

    this.socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.type === "postEntry") {
        this.setState({
          numberOfUsers: parsedData.clients
        })
      } else {
        const messages = this.state.messages.concat(parsedData);
        // Change this
        this.setState((prevState, props) => ({
          messages,
          // previousUser: prevState.currentUser,
          // currentUser: {name: parsedData.username},
        }));
      }
    }
  }

  addMessage = (value, username, type) => {
    const newMessageId = this.state.messages.length + 1;
    const newMessage = {id: newMessageId, type: type, username: username, content: value};
    // const newArrayOfMessages = this.state.data.messages.concat(newMessage);
    // this.state.data.messages = newArrayOfMessages;

    // this.setState({ loading: false,
    //   data
    // });

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

    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='container'>
          <Navbar data={this.state} />
          <MessageList data={this.state}  />
          <ChatBar data={this.state} addMessage={this.addMessage} nameChange={this.nameChange} previousUser={this.state.previousUser}/>
        </div>
      );
    }
  }
}

export default App;
