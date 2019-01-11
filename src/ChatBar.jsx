import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };
        
        this._handleName = this._handleName.bind(this);
        this._updateTerm = this._updateTerm.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    render() {
        return(
            <footer className="chatbar">
                <input className="chatbar-username"
                       placeholder="Your name (optional)" 
                       value={this.props.currentUser.name}
                       onKeyDown={this._handleName}
                        />
                <input className="chatbar-message" 
                       placeholder="Type a message and hit ENTER"
                       value={this.state.term}
                       onChange={this._updateTerm}
                       onKeyDown={this._handleSubmit}
                       ref = "msg" />
            </footer>
        )
    }

   
    _handleName(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            if (event.target.value === "") {
                this.props._updateName("Anonymous");
            } else if (event.target.value !== "" && this.props.currentUser === "") {
                this.props._updateName(event.target.value);
            } else if (event.target.value !== "" && this.props.currentUser !== "") {
                this.props._sendNotification(event.target.value);
            }   
            this.refs["msg"].focus();
        }
    }

    _updateTerm(event) {
        this.setState({ term: event.target.value});
    }

    _handleSubmit(event) {
        if (event.keyCode == 13 && event.target.value.length != 0) {
          event.preventDefault();
          this.props.createMessage(this.state.term);
          this.setState({ term: ''});
        } 
    }
}

export default ChatBar;

