import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, TouchableOpacity } from "react-native";
import { registerUser } from "../services/authService";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
    }

    try {
      await registerUser({ name, email, password, confirmPassword });
      Alert.alert("Succès", "Compte créé avec succès !");
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Erreur", err.message || "Erreur serveur");
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <TextInput placeholder="Nom" value={name} onChangeText={setName} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} autoCapitalize="none"/>
      <TextInput placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Confirmer mot de passe" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />

      <Button title="S'inscrire" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>J'ai déjà un compte</Text>
      </TouchableOpacity>
    </View>
  );
}
