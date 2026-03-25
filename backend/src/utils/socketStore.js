const onlineUsers = new Map();

export function registerSocket(userId, socketId) {
  onlineUsers.set(String(userId), socketId);
}

export function unregisterSocket(socketId) {
  for (const [userId, activeSocketId] of onlineUsers.entries()) {
    if (activeSocketId === socketId) {
      onlineUsers.delete(userId);
      break;
    }
  }
}

export function getSocketId(userId) {
  return onlineUsers.get(String(userId));
}
