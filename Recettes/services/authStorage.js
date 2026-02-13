import * as SecureStore from 'expo-secure-store';
//Secure store est bien pour le mobile.
//Pour le web gardr CookieHttpOnly
const TOKEN_KEY = 'jwt_token';

// Stocker token (mobile)
export const saveToken = async (token) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

// Récupérer token (mobile)
export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

// Supprimer token (mobile)
export const removeToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
