import React, {Component} from 'react';

class Message extends Component {
    render() {
        let contentValue = this.props.content;
        let match = contentValue.match('^https?:\/\/.*\.(?:png|jpg|gif)$');
        let currentColor = this.props.color;
        if (this.props.type === "incoming-message" && !match) {
            return(
                <div className="message">
                    <span className="message-username" style={{color: currentColor}}>{this.props.username}</span>
                    <span className="message-content">{this.props.content}</span>
                </div>
            )
        } else if (this.props.type === "incoming-message" && match) {
            return(
                <div className="message">
                    <span className="message-username" style={{color:this.props.color}}>{this.props.username}</span>
                    <div className="message-content">
                        <img src={this.props.content} />
                    </div>
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