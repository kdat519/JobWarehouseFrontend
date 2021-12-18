import axios from 'axios';
import axiosClient from './axiosClient';

const messageAPI = {
  showAll: (params) => {
    const url = "chat";
    return axiosClient.get(url, { params });
  },

  createChat: (params) => {
    const url = "chat/create";
    return axiosClient.post(url, { params });
  },

  updateChat: (params) => {
    const url = "chat/update";
    return axiosClient.post(url, { params });
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
  }
}

export default messageAPI;