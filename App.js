import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreenTemporarily from './screens/HomeScreenTemporarily';
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
import RegisterScreen from './screens/LoginScreen2';
import EnterScreen from './screens/LoginScreen3';

import NavBar from './components/NavBar';
import { AppointmentsProvider } from './AppointmentsContext';
import { CompletedAppointmentsProvider } from './CompletedAppointmentsContext';
import { MissedAppointmentsProvider } from './MissedAppointmentsContext';
import { ProfilesProvider, useProfiles } from './ProfilesContext';
import { UserProvider, useUser } from './UserContext';
import { ChildProvider } from './ChildContext';
import { ViewAppointmentsProvider } from './ViewAppointmentsContext';
import { ViewChildProvider } from './ViewChildContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Login');

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          'NunitoSans-Light': require('./assets/fonts/NunitoSans_10pt-Light.ttf'),
          'NunitoSans-Regular': require('./assets/fonts/NunitoSans_10pt-Regular.ttf'),
          'NunitoSans-Medium': require('./assets/fonts/NunitoSans_10pt-Medium.ttf'),
          'NunitoSans-SemiBold': require('./assets/fonts/NunitoSans_10pt-SemiBold.ttf'),
          'NunitoSans-Bold': require('./assets/fonts/NunitoSans_10pt-Bold.ttf'),
          'NunitoSans-ExtraBold': require('./assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
          'NunitoSans-Black': require('./assets/fonts/NunitoSans_10pt-Black.ttf'),
          'NunitoSans-Italic': require('./assets/fonts/NunitoSans_10pt-Italic.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const screensWithoutNavBar = ['Login', 'RegisterScreen', 'EnterScreen'];

  return (
    <UserProvider initialUserID={'0'}>
      <ChildProvider initialChildID={'0'}>
        <ProfilesProvider>
          <ViewChildProvider>
            <AppointmentsProvider>
              <ViewAppointmentsProvider>
                <CompletedAppointmentsProvider>
                  <MissedAppointmentsProvider>
                    <NavigationContainer onStateChange={(state) => setCurrentScreen(state.routes[state.index].name)}>
                      <Stack.Navigator>
                        <Stack.Screen
                          name='Login'
                          component={LoginScreen}
                          options={{
                            title: '',
                            headerBackVisible: false,
                            animation: 'fade',
                          }}
                        />
                        <Stack.Screen
                          name='HomeTemporarily'
                          component={HomeScreenTemporarily}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                        />
                        <Stack.Screen
                          name='RegisterScreen'
                          component={RegisterScreen}
                          options={{
                            title: '',
                            headerBackVisible: false,
                            animation: 'fade',
                          }}
                          initialParams={{ profile: require('./profiles.json') }}
                        />
                        <Stack.Screen
                          name='EnterScreen'
                          component={EnterScreen}
                          options={{
                            title: '',
                            headerBackVisible: false,
                            animation: 'fade',
                          }}
                          initialParams={{ profile: require('./profiles.json') }}
                        />
                        <Stack.Screen
                          name='Profile'
                          component={ProfileScreen}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                          initialParams={{ profile: require('./profiles.json') }}
                        />
                        <Stack.Screen
                          name='Screen_3'
                          component={Screen_3}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                        />
                        <Stack.Screen
                          name='Announcements'
                          component={AnnouncementsScreen}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                        />
                        <Stack.Screen
                          name='Appointment'
                          component={AppointmentScreen}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                        />
                        <Stack.Screen
                          name='VaccinationsCompleted'
                          component={VaccinationsCompletedScreen}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                        />
                        <Stack.Screen
                          name='VaccinationsMissed'
                          component={VaccinationsMissedScreen}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                        />
                        <Stack.Screen
                          name='VaccinationsUpcoming'
                          component={VaccinationsUpcomingScreen}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                        />
                        <Stack.Screen
                          name='VaccinationsOnGoing'
                          component={VaccinationsOnGoingScreen}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                        />
                        <Stack.Screen
                          name='VaccineDetails'
                          component={VaccineDetailsScreen}
                          options={({ navigation }) => ({
                            title: 'Halo, Timothee',
                            headerBackVisible: false,
                            headerLeft: () => (
                              <Image
                                source={require('./assets/pfp/parentpfptemp.jpg')}
                                style={styles.profPict}
                              />
                            ),
                            headerRight: () => (
                              <View style={{ position: 'relative' }}>
                                <Fontisto
                                  name='bell-alt'
                                  size={24}
                                  color='black'
                                  onPress={() => navigation.navigate('Announcements')}
                                />
                                <View style={{ backgroundColor: '#FF0000', width: 10, height: 10, borderRadius: 10, position: 'absolute', right: 0 }}></View>
                              </View>
                            ),
                            animation: 'fade',
                          })}
                        />
                      </Stack.Navigator>
                      {!screensWithoutNavBar.includes(currentScreen) && <NavBar />}
                    </NavigationContainer>
                  </MissedAppointmentsProvider>
                </CompletedAppointmentsProvider>
              </ViewAppointmentsProvider>
            </AppointmentsProvider>
          </ViewChildProvider>
        </ProfilesProvider>
      </ChildProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  profPict: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});
