import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import { useFonts } from 'expo-font';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Screen_3 from './screens/Screen_3';

import LoginScreen from './screens/LoginScreen';
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import VaccinationsCompletedScreen from './screens/VaccinationsCompletedScreen';
import VaccinationsMissedScreen from './screens/VaccinationsMissedScreen';
import VaccinationsUpcomingScreen from './screens/VaccinationsUpcomingScreen';
import VaccinationsOnGoingScreen from './screens/VaccinationsOnGoingScreen';
import VaccineDetailsScreen from './screens/VaccineDetailsScreen';

import NavBar from './components/NavBar';

const Stack = createNativeStackNavigator();

var selectedProfile = 1;

var profiles_dir = './profiles.json';

export default function App() {
  let [fontsLoaded] = useFonts({
    'NunitoSans-Light': require('./assets/fonts/NunitoSans_10pt-Light.ttf'),
    'NunitoSans-Regular': require('./assets/fonts/NunitoSans_10pt-Regular.ttf'),
    'NunitoSans-Medium': require('./assets/fonts/NunitoSans_10pt-Medium.ttf'),
    'NunitoSans-SemiBold': require('./assets/fonts/NunitoSans_10pt-SemiBold.ttf'),
    'NunitoSans-Bold': require('./assets/fonts/NunitoSans_10pt-Bold.ttf'),
    'NunitoSans-ExtraBold': require('./assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
    'NunitoSans-Black': require('./assets/fonts/NunitoSans_10pt-Black.ttf'),
    'NunitoSans-Italic': require('./assets/fonts/NunitoSans_10pt-Italic.ttf'),
  });

  const profiles = require(profiles_dir);
  // console.log(profiles);
  // fetch(profiles_dir)
  //   .then(response => response.json())
  //   .then(profiles => {
  //     console.log(profiles);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching the JSON file:', error);
  // });


  return (
    <NavigationContainer>

      <Stack.Navigator >

        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation: 'fade', // other options: slide_from_right, left, slide_from_bottom, slide_from_top
          }}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            // header: (props) => (
            //   <View style={{ height: 60 }}>
                
            //   </View>
            // ),

            title: 'Profile',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade',
          }}
          initialParams={{ profile: profiles }}
        />
        <Stack.Screen
          name='Screen_3'
          component={Screen_3}
          options={{
            title: 'Screen 3',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade'
          }}
        />

        
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            title: 'Login',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade'
          }}
        />
        <Stack.Screen
          name='Announcements'
          component={AnnouncementsScreen}
          options={{
            title: '  Halo, Dominick',
            // headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <Image
                source={require('./assets/mainprofile-bg.png')}
                style={styles.profPict}
              />
            ), 
            
            animation:'fade'
          }}
        />
        <Stack.Screen
          name='Appointment'
          component={AppointmentScreen}
          options={{
            title: 'Appointment',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade'
          }}
        />
        <Stack.Screen
          name='VaccinationsCompleted'
          component={VaccinationsCompletedScreen}
          options={{
            title: 'Completed Vaccinations',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade'
          }}
        />
        <Stack.Screen
          name='VaccinationsMissed'
          component={VaccinationsMissedScreen}
          options={{
            title: 'Missed Vaccinations',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade'
          }}
        />
        <Stack.Screen
          name='VaccinationsUpcoming'
          component={VaccinationsUpcomingScreen}
          options={{
            title: 'Upcoming Vaccinations',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade'
          }}
        />
        <Stack.Screen
          name='VaccinationsOnGoing'
          component={VaccinationsOnGoingScreen}
          options={{
            title: 'OnGoing Vaccinations',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade'
          }}
        />
        <Stack.Screen
          name='VaccineDetails'
          component={VaccineDetailsScreen}
          options={{
            title: 'Vaccine Details',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade'
          }}
        />
      </Stack.Navigator>

      <NavBar/>

    </NavigationContainer>
  );
  
}
const styles = StyleSheet.create({
  profPict:{
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    marginRight: 10, 
    borderWidth:1, 
    borderColor:'black'
  }
})