import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        idCounter: 3,
        currentUser: {name: "Bob"},
        messages: [
          {
            type: "incomingMessage",
            content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
            username: "Anonymous2",
            id: 1
          },
          {
            type: "incomingMessage",
            content: "This isn't funny. You're not funny",
            username: "nomnom",
            id: 2
          }
        ]
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleSubmit(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      this.createMessage(event.target);
    } else {
      console.log("Nope");
    }
  }

  createMessage(str) {
    const id = this.state.idCounter + 1;
    const content = str.value;
    const username = this.state.currentUser.name;
    const newMessage = {
      id: id,
      content: content,
      username: username
    }
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages, idCounter: id})
  }

  clearInput(event) {
      if(event.keyCode == 13) {
        event.target.value = "";
      }
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a className="navbar-brand" href="/">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} handleSubmit={this.handleSubmit} clearInput={this.clearInput} />
      </div>
    )
  }
}
export default App;
