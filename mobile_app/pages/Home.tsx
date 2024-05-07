import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { getallplaygames } from '../services/api/character/requeste'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
  const [games, setGames] = useState([])
  const navigation = useNavigation()
  
  useEffect(() => {
    getallplaygames()
      .then((data) => {
        if (data) {
          setGames(data.slice(0, 10))
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleGamePress = (game) => {
    navigation.navigate('details', { game })
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue !</Text>
      <ScrollView>
        {games.map((game, index) => (
          <TouchableOpacity key={index} onPress={() => handleGamePress(game)}>
            <View style={styles.gameContainer}>
              <Image source={{ uri: game.thumbnail }} style={styles.thumbnail} />
              <View style={styles.textContainer}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.shortDescription}>{game.short_description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 20
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  gameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3d4c49',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  gameTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  shortDescription: {
    color: '#FFFFFF'
  }
})