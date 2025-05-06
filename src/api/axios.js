import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8500', // cambia esto por tu URL real
  withCredentials: true, // 🔐 para enviar cookies automáticamente
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api