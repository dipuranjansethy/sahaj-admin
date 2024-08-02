import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserActivity = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('https://sahajapi.vercel.app/notification/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching the notifications:', error);
      });
  }, []);

  return (
    <div style={styles.container}>
      {notifications.map(notification => (
        <div key={notification._id} style={styles.card}>
          <h2>User: {notification.userId.userName}</h2>
          <h3>Business: {notification.merchantId.businessName}</h3>
          <p>User Phone: {notification.userId.Mobile}</p>
          <p>Business Phone: {notification.merchantId.phoneNumber}</p>
          <p>Searched Query: {notification.query}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f7f7f7'
  },
  card: {
    border: '1px solid #ccc',
    padding: '16px',
    margin: '16px',
    borderRadius: '8px',
    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    width: '80%',
    maxWidth: '600px'
  }
};

export default UserActivity;
