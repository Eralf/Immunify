import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Screen_3 from './screens/Screen_3';

import LoginScreen from './screens/LoginScreen';
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import VaccinationsCompletedScreen from './screens/VaccinationsCompletedScreen';
import VaccinationsMissedScreen from './screens/VaccinationsMissedScreen';
import VaccinationsUpcomingScreen from './screens/VaccinationsUpcomingScreen';
import VaccineDetailsScreen from './screens/VaccineDetailsScreen';

import NavBar from './components/NavBar';

const Stack = createNativeStackNavigator();

export default function App() {
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
            title: 'Profile',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            animation:'fade'
          }}
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
            title: 'Announcements',
            headerTitleAlign: 'center',
            headerBackVisible: false,
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