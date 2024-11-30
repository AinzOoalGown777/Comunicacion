const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');
    
    ws.on('message', (message) => {
        console.log('Mensaje recibido: ' + message);
        // Reenviar el mensaje a todos los clientes excepto el emisor
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

console.log('Servidor WebSocket en el puerto 8080');
