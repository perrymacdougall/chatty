import React, {Component} from 'react';
// import messages from "../messages.js";

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>Chatty</a>
      </nav>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <main className='messages'>

      </main>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Your name here' />
        <input className='chatbar-message' placeholder='Type your heart out' />
      </footer>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Navbar />
        <Main />
        <Footer />
      </div>
    );
  }
}
export default App;
