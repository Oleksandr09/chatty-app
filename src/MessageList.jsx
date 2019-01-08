import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const messageArr = this.props.messages;
        const messageItem = messageArr.map((message) => 
            <Message username={message.username} content={message.content} key={message.id} />
        );
        return(
            <main className="messages">
                {messageItem}
            <div className="message system">
                
            </div>

            </main>
        )
    }
}

export default MessageList;