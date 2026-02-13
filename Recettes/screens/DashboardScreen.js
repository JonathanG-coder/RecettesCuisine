import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { logoutUser } from '../services/authService';
import { getToken } from '../services/authStorage';
import { getMe } from '../services/authService'; // service pour récupérer infos utilisateur

export default function DashboardScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les infos utilisateur au montage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();
        if (!token) {
          // Si pas de token, rediriger vers Login
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          return;
        }
        const userData = await getMe(token); // récupérer infos depuis backend
        setUser(userData);
      } catch (err) {
        console.log('Erreur fetchUser:', err);
        Alert.alert('Erreur', 'Impossible de récupérer vos informations');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    // Réinitialiser la navigation pour retourner sur Login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenue {user?.name || 'sur Recettes App'} !</Text>

      <Button
        title="Voir une recette"
        onPress={() => navigation.navigate('RecipeDetail')}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Se déconnecter" color="red" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },
});
