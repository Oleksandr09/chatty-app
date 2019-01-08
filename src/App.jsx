import React, {Component} from 'react';
// import NavBar from './NavBar.jsx'
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div>
      <nav className="navbar">
                <a className="navbar-brand" href="/">Chatty</a>
            </nav>
        <MessageList />
        <ChatBar />
      </div>
    )
  }
}
export default App;
