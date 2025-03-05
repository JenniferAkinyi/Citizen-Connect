import axios from "axios";

const API_URL = "http://localhost:3000/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );
  return response;
};
export const login = async (email, password) => {
    const response = await api.post("/auth/login", {
    email: email,
    password: password,
    });
    return response;
}
export const fetchIncidents = async () => {
  const response = await api.get('/incidents/all');
  return response.data;
};
export const reportIncident = async (incidentData) => {
  const response = await api.post('/incidents/report', incidentData);
  return response;
};
export const fetchIncidentById = async (incidentId) => {
  const response = await api.get(`/incidents/${incidentId}`);
  return response.data;
};
export const fetchPolls = async () => {
  const response = await api.get('polls/all');
  return response.data;
}
export const createPoll = async (pollData) => {
  const response = await api.post('/polls/poll', pollData);
  return response;
}
export const deletePoll = async (pollId) => {
  const response = await api.delete(`/polls/${pollId}`);
  return response;
}
export const pollVote = async (voteData) => {
  const response = await api.get('/votes/all', voteData);
  return response.data;
}
export const addVote = async (voteData) => {
  const response = await api.post('/votes/vote', voteData);
  return response;
}
export const fetchUserVotes = async (userId) => {
  const response = await api.get(`/votes/user/${userId}`);
  return response.data;
};
