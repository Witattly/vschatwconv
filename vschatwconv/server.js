CONV_USERNAME = "########-####-####-####-############";
CONV_PASSWORD = "###########";
CONV_WorkspaceID = "########-####-####-####-############";

const WebSocket = require('ws');
const request = require('request');
const wss = new WebSocket.Server({ port: 8080 });
const target =  "https://"+CONV_USERNAME+":"+CONV_PASSWORD+
		"@gateway.watsonplatform.net/conversation/api/v1/workspaces/"+CONV_WorkspaceID+"/message"+"?version=2016-07-11";

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
	request.post({"url": target, "json":JSON.parse(message.trim())},
		     function (error, response, body) { ws.send(JSON.stringify(body));});
    });
});
