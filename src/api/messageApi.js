import axiosClient from "./axiosClient";

const messageApi = {
  countUnseen: () => {
    const url = "chat/count/unseen";
    return axiosClient.get(url);
  }
}

export default messageApi;