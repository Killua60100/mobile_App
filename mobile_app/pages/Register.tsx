import { StyleSheet, Text, View } from 'react-native';

export default function register({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Register </Text>
      <button title="se connecter" onPress={() : void  => {navigation.navigate("login")}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});