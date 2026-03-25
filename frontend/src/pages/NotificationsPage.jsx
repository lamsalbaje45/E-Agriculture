import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function NotificationsPage() {
  const { socket, refreshNotifications } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    const response = await api.get("/notifications");
    setNotifications(response.data);
    await refreshNotifications();
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const onNotification = (notification) => {
      setNotifications((current) => [notification, ...current]);
    };

    socket.on("notification:new", onNotification);
    return () => socket.off("notification:new", onNotification);
  }, [socket]);

  const markRead = async (id) => {
    await api.put(`/notifications/${id}/read`);
    loadNotifications();
  };

  const unreadCount = notifications.filter((notification) => !notification.is_read).length;

  return (
    <div className="space-y-4">
      <div className="glass rounded-[2rem] p-6 shadow-panel">
        <h1 className="font-display text-3xl text-bark sm:text-4xl">Notifications</h1>
        <p className="mt-3 text-bark/72">
          You have <span className="font-semibold text-bark">{unreadCount}</span> unread notification{unreadCount === 1 ? "" : "s"}.
        </p>
      </div>
      {notifications.map((notification) => (
        <div key={notification.id} className="glass rounded-[2rem] p-6 shadow-panel">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-bark">{notification.title}</h2>
              <p className="mt-2 text-bark/70">{notification.body}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-bark/50">{notification.type}</p>
            </div>
            {!notification.is_read && (
              <button className="w-full rounded-2xl bg-bark px-4 py-3 font-semibold text-sand sm:w-auto" onClick={() => markRead(notification.id)}>
                Mark as read
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
