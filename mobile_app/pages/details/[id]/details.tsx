import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { useRoute } from '@react-navigation/native'

const GameDetailsScreen = () => {
  const route = useRoute()
  const { game } = route.params || {}

  const handlePress = () => {
    if (game && game.freetogame_profile_url) {
      Linking.openURL(game.freetogame_profile_url)
    }
  }

  return (
    <View style={styles.container}>
      {game && (
        <>
          <Image source={{ uri: game.thumbnail }} style={styles.thumbnail} />
          <Text style={styles.title}>{game.title}</Text>
          <Text style={styles.shortDescription}>{game.short_description}</Text>
          <Text style={styles.genre}>Genre: {game.genre}</Text>
          <Text style={styles.platform}>Platform: {game.platform}</Text>
          <Text style={styles.publisher}>Publisher: {game.publisher}</Text>
          <Text style={styles.developer}>Developer: {game.developer}</Text>
          <Text style={styles.releaseDate}>Release Date: {game.release_date}</Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Visiter la page du jeu</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10
  },
  shortDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  genre: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5
  },
  platform: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5
  },
  publisher: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5
  },
  developer: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5
  },
  releaseDate: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default GameDetailsScreen