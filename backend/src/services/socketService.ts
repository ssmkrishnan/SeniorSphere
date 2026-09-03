import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';

class SocketService {
  private wss: WebSocketServer | null = null;
  private clients: Set<WebSocket> = new Set();

  public init(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });

    this.wss.on('connection', (ws: WebSocket) => {
      this.clients.add(ws);
      console.log(`[WebSocket] Client connected. Total active connections: ${this.clients.size}`);

      ws.send(
        JSON.stringify({
          event: 'CONNECTED',
          message: 'Connected to SeniorSphere Emergency Dispatcher.'
        })
      );

      ws.on('close', () => {
        this.clients.delete(ws);
        console.log(`[WebSocket] Client disconnected. Remaining: ${this.clients.size}`);
      });

      ws.on('error', (err) => {
        console.error('[WebSocket] Error:', err);
      });
    });
  }

  public broadcast(event: string, payload: any) {
    const message = JSON.stringify({ event, data: payload, timestamp: new Date().toISOString() });
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}

export const socketService = new SocketService();
