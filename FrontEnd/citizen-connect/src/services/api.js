import axios from "axios";

const API_URL = "http://localhost:5000/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const register = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response;
};
export const login = async (email, password) => {
  const response = await api.post("/users/login", {
    email: email,
    password: password,
  });
  return response;
};
export const fetchUsers = async () => {
  const response = await api.get("/users/allusers");
  return response.data.details;
};
export const requestPasswordReset = async (data) => {
  const response = await api.post("/users/request-password-reset", data);
  return response;
};
export const resetPassword = async (data) => {
  const response = await api.put(`/users/reset-password`, data);
  return response;
};
export const fetchIncidents = async () => {
  const response = await api.get("/incidents/allincidents");
  return response.data.details;
};
export const reportIncident = async (incidentData) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/incidents/report", incidentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const fetchIncidentById = async (incidentId) => {
  const response = await api.get(`/incidents/${incidentId}`);
  return response.data;
};
export const fetchPolls = async () => {
  const response = await api.get("/polls/allpolls");
  return response.data.details;
};
export const createPoll = async (pollData) => {
  const response = await api.post("/polls/createpoll", pollData);
  return response.data;
};
export const deletePoll = async (pollId) => {
  const response = await api.delete(`/polls/${pollId}`);
  return response;
};
export const pollVote = async (voteData) => {
  const response = await api.get("/votes/all", voteData);
  return response.data;
};
export const castVote = async (voteData) => {
  const response = await api.post("/votes/vote", voteData);
  return response.data;
};
export const updateVote = async (voteData) => {
  const response = await api.patch("/votes/updatevote", voteData);

  return response.data;
};
export const fetchUserVotes = async (userId) => {
  const response = await api.get(`/votes/user/${userId}`);
  return response.data;
};
