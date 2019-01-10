const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const express = require('express');
const http = require('http');
const uuid = require('uuid/v4');

const PORT = 3001;
const app = express();
const server = http.createServer(app);

    app.use(express.static('public'));
    server.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listen on ${ PORT }`));


const wss = new SocketServer({ server });


const messageDB = [];

wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

wss.broadcast = data => {
    wss.clients.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN){
            ws.send(data);
            console.log("Data is sent", data);
        }
    });
};

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', data => {
        const objData = JSON.parse(data);
        console.log('Got the message from the client', objData.content);

        switch (objData.type) {
            case 'post-message' :
                const objToBroadcast = {
                    id: uuid(),
                    content: objData.content,
                    username: objData.username,
                    type: "incoming-message"
                };
                messageDB.push(objToBroadcast);
                wss.broadcastJSON(objToBroadcast);
                break;
        
        
            case 'post-notification' :
                const notificationMessage = {
                    id: uuid(),
                    content: `User *${objData.previousUsername}* changed their name to *${objData.newUsername}*`,
                    type: "incoming-notification"
                };
                messageDB.push(notificationMessage);
                wss.broadcastJSON(notificationMessage);
                break;
            default:
            }

        
        
       
    });

    ws.on('close', () => console.log('Client disconnected'));
});