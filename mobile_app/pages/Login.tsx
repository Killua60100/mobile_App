import { Button, StyleSheet, Text, View } from 'react-native';
import Card from '../components/card/card';

export default function login({ navigation }) {
  return (
    <View style={styles.container}>
      <Card />
      <Text>login </Text>
      <Button title="se connecter" onPress={() => navigation.navigate("register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});