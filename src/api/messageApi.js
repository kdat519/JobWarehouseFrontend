import axiosClient from "./axiosClient";

const MessageApi = {
  countUnseen: () => {
    const url = "chat/count/unseen";
    return axiosClient.get(url);
  }
}

export default MessageApi;