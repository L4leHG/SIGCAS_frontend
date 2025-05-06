import api from '../api/axios'

export async function loginUser(username, password) {
  try {
    const response = await api.post('/api/token/', {
      username,
      password,
    })
    return response.status === 200
  } catch (error) {
    console.error('Error al hacer login:', error)
    return false
  }
}

export async function logoutUser() {
  try {
    const response = await api.post('/api/logout/')
    return response.status === 200
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    return false
  }
}