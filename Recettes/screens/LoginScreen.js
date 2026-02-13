import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert } from 'react-native';
import { loginUser } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (err) {
      Alert.alert('Erreur', err.message || 'Email ou mot de passe incorrect');
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={{ marginBottom:10, borderWidth:1, padding:8 }}
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Mot de passe" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={{ marginBottom:10, borderWidth:1, padding:8 }}
      />
      <Button title="Se connecter" onPress={handleLogin} />

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text>Pas encore de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: 'blue', marginTop: 5 }}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
