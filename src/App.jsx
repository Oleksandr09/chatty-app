import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props){
    super(props);
   
    this.state = {
        currentUser: {name: ""},
        messages: [],
        numbers: 0,
        color: ""
        
    }
    this._updateName = this._updateName.bind(this);
    this._createMessage = this._createMessage.bind(this);
    this._sendNotification = this._sendNotification.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
      
      this.socket.onmessage = payload => {
        console.log('Got message from server');
        const json = JSON.parse(payload.data);

        switch (json.type) {
          case 'incoming-message':
          case 'incoming-notification':   
            this.setState({
              messages: [...this.state.messages, json]
            });
            console.log(this.state.messages);
            break;
          case 'initial-messages':
            this.setState({messages: json.messages, color: json.color });
            break;
          case 'active-users':
            this.setState({ numbers: json.userCount});
            console.log(this.state.numbers);
            break;
        default:
        }
            
      };

      this.socket.onclose = () => {
        console.log('Disconnected from the WebSocket');
      };
    }
  }
  render() {
    return (
      <div>
      <nav className="navbar">
        <a className="navbar-brand" href="/">Chatty</a>
        <span className="users">{this.state.numbers} users active</span>
      </nav>
      <MessageList messages={this.state.messages} systemMessages={this.state.notifications} />
      <ChatBar currentUser={this.state.currentUser.name} createMessage={this._createMessage}  _updateName={this._updateName} _sendNotification={this._sendNotification} />
      </div>
    )
  }

  _createMessage(str) {

    const content = str;
    const username = this.state.currentUser.name;
    const color = this.state.color;
    const newMessage = {
      content: content,
      username: username,
      type: "post-message",
      color: color
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  _updateName(name) {
    this.setState({ currentUser: { name: name} });
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
    this.setState({ currentUser: { name: name} });
  }
}
export default App;
