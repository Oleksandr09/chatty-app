import React, {Component} from 'react';

class ChatBar extends Component {

    render() {
        return(
            <footer className="chatbar">
                <input className="chatbar-username" defaultValue={this.props.currentUser.name || "Your name (optional)"}  />
                <input className="chatbar-message" 
                       placeholder="Type a message and hit ENTER"
                       onKeyDown={this.props.handleSubmit} 
                       onKeyUp={this.props.clearInput} />
                       
            </footer>
        )
    }
}

export default ChatBar;