import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>Home Screen</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Profile Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Login Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Announcements')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Announcements Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Appointment')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Appointment Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('VaccinationsCompleted')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Completed Appointments Screen
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('VaccinationsMissed')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Missed Appointments Screen
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('VaccinationsUpcoming')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Upcoming Appointments Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('VaccineDetails')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Vaccine Details Screen
        </Text>
      </TouchableOpacity>

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

export default HomeScreen;
