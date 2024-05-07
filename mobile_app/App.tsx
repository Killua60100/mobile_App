import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GameDetailsScreen from './pages/details/[id]/details'

import login from './pages/Login'
import register from './pages/Register'
import home from './pages/Home'
import list from './pages/List'
import detail from './pages/details/[id]/details'

const AuthStack = createNativeStackNavigator()
const AppStack = createBottomTabNavigator()

export default function App() {
  const isLogged: false = true

  return (
    <NavigationContainer>
      {isLogged ? (
        <AppStack.Navigator>
          <AppStack.Screen name="Home" component={home} />
          <AppStack.Screen name="List" component={list} />
          <AppStack.Screen name="details" component={GameDetailsScreen} />

        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={login} />
          <AuthStack.Screen name="Register" component={register} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  )
}
