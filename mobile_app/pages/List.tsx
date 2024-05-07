import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getallplaygames, getGameCategories } from '../services/api/character/requeste';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const navigation = useNavigation();
  const [platformFilter, setPlatformFilter] = useState('all');
  const [showPlatformButtons, setShowPlatformButtons] = useState(false);
  const [showTrierButtons, setShowTrierButtons] = useState(false);
  const [categoriefilter, setcategoriefilter] = useState('all')
  const [isTitleSorted, setIsTitleSorted] = useState(false);
  const [isDateSorted, setIsDateSorted] = useState(false); 
  const [totalGamesFound, setTotalGamesFound] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const category = ['mmorpg', 'shooter', 'strategy', 'moba','racing', 'sports', 'social', 'sandbox',
  'open-world', 'survival', 'pvp', 'pve','pixel', 'voxel', 'zombie', 'turn-based',
  'first-person', 'third-Person', 'top-down','tank', 'space', 'sailing', 'side-scroller',
  'superhero', 'permadeath', 'card', 'battle-royale','mmo', 'mmofps', 'mmotps', '3d',
  '2d', 'anime', 'fantasy', 'sci-fi',  'fighting', 'action-rpg', 'action', 'military',
  'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'];

  useEffect(() => {
    getallplaygames()
      .then((data) => {
        if (data) {
          setGames(data.slice(0, 400));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getGameCategories()
      .then((data) => {
        if (data) {
          setCategories(data.slice(0, 100));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  const filterGamesByPlatform = (platform) => {
    setPlatformFilter(platform);
    setIsTitleSorted(false);
    setIsDateSorted(false);
    setTotalGamesFound(TotalGames(platform))
  };

  const handleGamePress = (game) => {
    navigation.navigate('details', { game });
  };
  
  const TotalGames = (platform) => {
    return games.filter((game) => platform === 'all' || game.platform.toLowerCase() === platform.toLowerCase()).length;
  };

  const filterGamesByCategory = (category) => {
    setcategoriefilter(category);
    setSelectedCategory(category);
    setShowCategories(false);
    setGames(games.filter((game) => categoriefilter === 'all' || game.genre.toLowerCase() === category.toLowerCase()));
  };

            // tirer par..    

 //alphabetique

 const sortGames = () => {
  if (isTitleSorted) {
    const shuffledGames = games.sort(() => Math.random() - 0.5);
    setGames(shuffledGames);
  } else {
    const sortedGames = [...games].sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      return titleA.localeCompare(titleB);
    });
    setGames(sortedGames);
  }

  setIsTitleSorted(!isTitleSorted);
  setIsDateSorted(false);
};


// date de publication

const sortGamesDate = () => {
  if (isDateSorted) {
    const shuffledGames = games.sort(() => Math.random() - 0.5);
    setGames(shuffledGames);
  } else {
    const sortedGames = [...games].sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateA - dateB;
    });
    setGames(sortedGames);
  }

  setIsDateSorted(!isDateSorted);
  setIsTitleSorted(false);
};

    
  return (
    <View style={styles.container}>

      <ScrollView>
        

        <TouchableOpacity onPress={() => setShowPlatformButtons(!showPlatformButtons)}>
          <Text style={styles.Button}>Plateformes</Text>
        </TouchableOpacity>

        {showPlatformButtons && (
          <View style={styles.ContainerButton}>

            <TouchableOpacity onPress={() => filterGamesByPlatform('pc (windows)')} style={styles.SousBoutton}>
              <Text>PC</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filterGamesByPlatform('web browser')} style={styles.SousBoutton}>
              <Text>Web</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filterGamesByPlatform('all')} style={styles.SousBoutton}>
              <Text>Tous</Text>
            </TouchableOpacity>

          </View>
        )}


        <TouchableOpacity onPress={() => setShowCategories(!showCategories)}>
          <Text style={styles.Button}>Catégories</Text>
        </TouchableOpacity>
        
        {showCategories && (
          <View style={styles.Button}>
            <Text>Liste des catégories :</Text>
            {category.map((category, index) => (
              <TouchableOpacity key={index} onPress={() => filterGamesByCategory(category)}>
                <Text style={styles.Button}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}



        <TouchableOpacity onPress={() => setShowTrierButtons(!showTrierButtons)}>
          <Text style={styles.Button}>Tirer par..</Text>
        </TouchableOpacity>

        {showTrierButtons && (
          <View style={styles.ContainerButton}>

            <TouchableOpacity onPress={sortGames} style={[styles.SousBoutton, isTitleSorted ? styles.ActiveSousboutton : null]}>
              <Text> Le Titre</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={sortGamesDate} style={[styles.SousBoutton, isDateSorted ? styles.ActiveSousboutton : null]}>
              <Text>le plus récent</Text>
            </TouchableOpacity>

          </View>
        
        )}
        
        <Text>{`Tout les jeux trouvé : ${totalGamesFound}`}</Text>

        {games
          .filter((game) => platformFilter === 'all' || game.platform.toLowerCase() === platformFilter)
          .map((game, index) => (
            <TouchableOpacity key={index} onPress={() => handleGamePress(game)}>
              <View style={styles.gameContainer}>

                <Image source={{ uri: game.thumbnail }} style={styles.image} />

                <View style={styles.textContainer}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                </View>

              </View>

            </TouchableOpacity>
          ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 20
  },

  gameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3d4c49',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    marginTop: 6,
  },

  image: {
    width: 70,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },

  textContainer: {
    flex: 1
  },

  gameTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },

// les bouttons

  ContainerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },

  Button: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center'
  },

  SousBoutton: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
  },

  ActiveSousboutton : {
    backgroundColor: '#A9A9A9',
    borderRadius: 4,
    padding: 10,
  },


})