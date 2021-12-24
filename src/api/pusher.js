import Pusher from "pusher-js";

function getToken() {
  const token = JSON.parse(localStorage.getItem("auth"))?.access_token;
  if (token) {
    return token;
  }

  return "";
}

const t = getToken();

Pusher.logToConsole = false;
const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  app_id: process.env.REACT_APP_PUSHER_APP_ID,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  authEndpoint: process.env.REACT_APP_PUSHER_AUTH_ENDPOINT,
  // neu khong dien gi vao phan ten mien backend sever thi se mac dinh la ip cua localhost, code se hoan toan chay tren may local
  auth: {
    headers: {
      Authorization: "Bearer " + t,
    },
  },
});

export default pusher;
