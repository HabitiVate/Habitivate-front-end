import { apiClient } from "./config";

export const apiGetTodos = async () => apiClient.get("/users/me/todos");

export const apiPostTodos = async (payload) =>
  apiClient.post("/todos", payload);

export const apiUpdateTodo = async (todoId, payload) =>
  apiClient.patch(`/todos/${todoId}`, payload);

export const apiDeleteTodo = async (todoId) =>
  apiClient.delete(`/todos/${todoId}`);

export const apiGetSingleTodo = async (todoId) =>
  apiClient.get(`/todos/${todoId}`);
