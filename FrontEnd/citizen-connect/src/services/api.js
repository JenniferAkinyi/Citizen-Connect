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
export const fetchPolls = async () => {
  const response = await api.get('polls/all');
  return response.data;
}
