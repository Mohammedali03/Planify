import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: 'your_pusher_key',
  cluster: 'mt1',
  forceTLS: true,
  authEndpoint: 'http://localhost:8000/api/broadcasting/auth', // if using private channels
  auth: {
    headers: {
      Authorization: `Bearer ${yourToken}` // from Sanctum or Passport
    }
  }
});

export const listenToNotifications = (userId, callback) => {
  echo.private(`App.Models.User.${userId}`)
    .notification((notification) => {
      callback(notification);
    });
};
