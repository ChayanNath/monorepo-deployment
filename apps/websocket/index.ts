import prisma from "db/client";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    message(ws, message) {
      prisma.user.create({
        data: {
          email: Math.random().toString(),
          name: Math.random().toString(),
        },
      });
      ws.send(message);
    },
  },
});
