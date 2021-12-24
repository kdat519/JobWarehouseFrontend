import axiosClient from './axiosClient';

const messageAPI = {
  showAll: (params) => {
    const url = "chat";
    return axiosClient.get(url, { params });
  },

  createChat: (params) => {
    const url = "chat/create";
    const formData = new FormData();
    formData.append("detail", params.detail);
    formData.append("status", "unseen");
    formData.append("receiver_id", String(params.receiver_id));
    return axiosClient.post(url, formData);
  },

  updateChat: (params) => {
    const url = "chat/update";
    const formData = new FormData();
    formData.append("status", params.status);
    formData.append("message_id", params.message_id);
    return axiosClient.post(url, formData);
  },

  showOneChat: (params) => {
    const url = "chat/message";
    return axiosClient.get(url, { params });
  },

  showChatBetween: (params) => {
    const url = "chat/between";
    return axiosClient.get(url, { params });
  },

  showLatestChat: (params) => {
    const url = "chat/lastest";
    return axiosClient.get(url, { params });
  },

  checkUnseen: (params) => {
    const url = "chat/between/count";
    return axiosClient.get(url, { params });
  },

  countUnseen: () => {
    const url = "chat/count/unseen";
    return axiosClient.get(url);
  }
}

export default messageAPI;
