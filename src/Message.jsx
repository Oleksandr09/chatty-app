import React, {Component} from 'react';

class Message extends Component {
    render() {
        if (this.props.type === "incoming-message"){
            return(
                <div className="message">
                    <span className="message-username">{this.props.username}</span>
                    <span className="message-content">{this.props.content}</span>
                </div>
            )
        } else if (this.props.type === "incoming-notification") {
            return (
                <div className="message system">
                    <span className="message-content" key={this.props.key}>{this.props.content}</span>
                </div>
            )
        }
    }
}

export default Message;