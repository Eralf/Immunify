import React from 'react'; 
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const Screen_3 = ({ navigation, route }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>Screen 3</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#9999FF',
    padding: 10,
    margin: 5,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default Screen_3;

