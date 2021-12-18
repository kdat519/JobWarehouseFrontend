import Pusher from 'pusher-js';

function getToken() {
  const token = JSON.parse(localStorage.getItem("auth"))?.access_token;
  if (token) {
    return token;
  }

  return '';
}

const t = getToken();

Pusher.logToConsole = false;
const pusher = new Pusher('a13024e4824fe0c8b79c', {
  app_id: "1315519",
  cluster: 'ap1',
  authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
  // neu khong dien gi vao phan ten mien backend sever thi se mac dinh la ip cua localhost, code se hoan toan chay tren may local
  auth: {
    headers: {
      Authorization: 'Bearer ' + t,
    }, // Day la token cua user 1 (Chay tren may cua Long)
  },
});

export default pusher;