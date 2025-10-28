// frontend/services/api.js
const BASE_URL = 'http://127.0.0.1:8000';

export async function generateQuiz(url, options = {}) {
  const qUrl = `${BASE_URL}/generate_quiz?url=${encodeURIComponent(url)}`;
  const resp = await fetch(qUrl, { method: 'POST' });
  if (!resp.ok) throw new Error('API error: ' + (await resp.text()));
  return resp.json();
}

export async function getHistory() {
  const resp = await fetch(`${BASE_URL}/history`);
  if (!resp.ok) throw new Error('API error: ' + (await resp.text()));
  return resp.json();
}

export async function getQuizById(id) {
  const resp = await fetch(`${BASE_URL}/quiz/${id}`);
  if (!resp.ok) throw new Error('API error: ' + (await resp.text()));
  return resp.json();
}
