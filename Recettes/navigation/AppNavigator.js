import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import des écrans
import DashboardScreen from '../screens/DashboardScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
// import CreateRecipeScreen from '../screens/CreateRecipeScreen';
// import EditRecipeScreen from '../screens/EditRecipeScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
// import CategoriesScreen from '../screens/CategoriesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: true, // affiche l'entête par défaut
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        {/* <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
        <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
