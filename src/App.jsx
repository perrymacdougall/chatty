import React, {Component} from 'react';
import messages from "../messages.js";

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>Chatty</a>
      </nav>
    );
  }
}

class Message extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = messages;
    this.name = currentUser.name;
    console.log(this.name);
  }

  render() {
    return (
      <div className='message'>
        <span className='message-username'>{this.name}</span>
        <span className='message-content'>{/*this.messages.messages.content*/}</span>
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <main className='messages'>
        <Message />
      </main>
    );
  }
}

class Footer extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = messages;
    this.name = currentUser.name;
    console.log(this.name);
  }

  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' defaultValue={this.name} placeholder='Your name here' />
        <input className='chatbar-message' placeholder='Type your heart out' />
      </footer>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      messages
    }
  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  render() {

    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='container'>
          <Navbar />
          <Main />
          <Footer />
        </div>
      );
    }
  }
}

export default App;
