import api from '../api/axios'

export async function loginUser(email, password) {
  try {
    const response = await api.post('/api/token/', {
      email,
      password,
    })
    // Podés guardar la sesión
    const { username: name, roles } = response.data
    localStorage.setItem('user', JSON.stringify({ name, roles }))
    return { success: true, data: response.data }
  } catch (error) {
    const msg =
      error?.response?.data?.detail ||
      'Error desconocido al iniciar sesión'
    return { success: false, message: msg }
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

export async function buscarPredio(npn) {
  try {
    const response = await api.get('/catastro/detalle_predios/', {
      params: { numero_predial_nacional: npn },
    });
    return response.data;
  } catch (error) {
    console.error('Error al buscar predio:', error);
    throw error;
  }
}