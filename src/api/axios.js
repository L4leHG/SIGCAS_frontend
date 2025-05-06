import axios from 'axios'

const api = axios.create({
  baseURL: 'https://github.com/L4leHG/SIGCAS_backend.git', // cambia esto por tu URL real
  withCredentials: true, // 🔐 para enviar cookies automáticamente
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api