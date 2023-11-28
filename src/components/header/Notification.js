import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Notification.css";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 200) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' ...show less'}
      </span>
    </p>
  );
};

function NotificationList() {




  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestNotifications() {
      try {
        const response = await axios.get('http://localhost:5000/notification/get');
        const latestNotificationsData = response.data;
        setNotifications(latestNotificationsData.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }

    fetchLatestNotifications();
  }, []);

  const dismissNotification = (notificationId) => {
    // Filter out the dismissed notification
    const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
    setNotifications(updatedNotifications);
  };

  const dismissAllNotifications = () => {
    // Remove all notifications
    setNotifications([]);
  };

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      {loading ? (
        <div>Loading...</div>
      ) : notifications.length > 0 ? (
        <div>
          <ul className="notification-list_content">
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                <div class="notification-list notification-list--unread">
                  <div class="notification-list_content">
                    <div class="notification-list_feature-img">
                    {notification.image ? (
                        <img src={notification.image} alt="Feature image" />
                      ) : (
                        <div className="image-not-found"></div>
                      )}
                    </div>
                    <div class="notification-list_detail">
                      <p><b>{notification.title}</b></p>
                      <p class="text-muted">{notification.subject}</p>
                      <p class="text-muted"><small>{notification.date}</small></p>
                    </div>
                    
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No notifications found.</p>
      )}
    </div>
  );
}



export default NotificationList;








