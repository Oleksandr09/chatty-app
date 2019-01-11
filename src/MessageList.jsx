import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const messageArr = this.props.messages;
        const messageItem = messageArr.map((message) => 
            <Message username={message.username} content={message.content} key={message.id} type={message.type} color={message.color} />
        );
        return(
            <main className="messages">
                {messageItem}
            </main>
        )
    }
}

export default MessageList;