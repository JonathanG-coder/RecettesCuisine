import axios from 'axios';
import * as SecureStore from './authStorage';
import { Platform } from 'react-native';


const API_URL = Platform.OS === 'web' ? process.env.BACKEND_URL_WEB : process.env.BACKEND_URL_MOBILE;

// -- Login --
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true } // pour cookie HTTPOnly côté web
    );

    // Si le backend renvoie aussi un token (pour mobile)
    if (res.data.token) {
      await SecureStore.saveToken(res.data.token);
    }

    return res.data.user; // retourne les infos utilisateur
  } catch (err) {
    throw err.response?.data || { message: 'Erreur serveur' };
  }
};

// -- Register --
export const registerUser = async ({ name, email, password, confirmPassword }) => {
  try {
    const res = await axios.post(
      `${API_URL}/register`,
      { name, email, password, confirmPassword },
      { withCredentials: true } // cookie côté web
    );

    // Si token renvoyé pour mobile
    if (res.data.token) {
      await SecureStore.saveToken(res.data.token);
    }

    return res.data.user || null;
  } catch (err) {
    throw err.response?.data || { message: 'Erreur serveur' };
  }
};

// -- Logout --
export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true }); // cookie côté web
    await SecureStore.removeToken(); // supprime le token mobile
  } catch (err) {
    console.log('Erreur logout:', err);
  }
};
