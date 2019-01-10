import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props){
    super(props);
   
    this.state = {
        currentUser: {name: ""},
        messages: [],
    }
    this._updateName = this._updateName.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this._sendNotification = this._sendNotification.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    this.socket.onmessage = payload => {
      console.log('Got message from server');
      const json = JSON.parse(payload.data);
          this.setState({
            messages: [...this.state.messages, json]
          });
    };

    this.socket.onclose = () => {
      console.log('Disconnected from the WebSocket');
    };
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a className="navbar-brand" href="/">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} systemMessages={this.state.notifications} />
      <ChatBar currentUser={this.state.currentUser.name} createMessage={this.createMessage}  _updateName={this._updateName} _sendNotification={this._sendNotification} />
      </div>
    )
  }

  createMessage(str) {
    
    const content = str;
    const username = this.state.currentUser.name;
    const newMessage = {
      content: content,
      username: username,
      type: "post-message"
    }
    this.socket.send(JSON.stringify(newMessage));
    
  }

  _updateName(name) {
    this.setState({ currentUser: { name: name} })
  
  }
  _sendNotification(name) {
    console.log("Hello", name);
    const username = this.state.currentUser.name;
    const notification = {
      previousUsername: username,
      newUsername: name,
      type: "post-notification"
    }
    this.socket.send(JSON.stringify(notification));

    this.setState({ currentUser: { name: name} })
  }
}
export default App;
