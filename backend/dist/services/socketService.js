import { WebSocketServer, WebSocket } from 'ws';
class SocketService {
    wss = null;
    clients = new Set();
    init(server) {
        this.wss = new WebSocketServer({ server, path: '/ws' });
        this.wss.on('connection', (ws) => {
            this.clients.add(ws);
            console.log(`[WebSocket] Client connected. Total active connections: ${this.clients.size}`);
            ws.send(JSON.stringify({
                event: 'CONNECTED',
                message: 'Connected to SeniorSphere Emergency Dispatcher.'
            }));
            ws.on('close', () => {
                this.clients.delete(ws);
                console.log(`[WebSocket] Client disconnected. Remaining: ${this.clients.size}`);
            });
            ws.on('error', (err) => {
                console.error('[WebSocket] Error:', err);
            });
        });
    }
    broadcast(event, payload) {
        const message = JSON.stringify({ event, data: payload, timestamp: new Date().toISOString() });
        for (const client of this.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    }
}
export const socketService = new SocketService();
