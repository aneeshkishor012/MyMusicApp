import React, { useEffect } from "react";
//##################Screens##################
import Home from "../screens/Home/Home";
import AlbumScreen from "../screens/AlbumScreen/AlbumScreen"
import MusicPlayer from "../screens/MusicPlayer/MusicPlayer";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import JioSaavnMusicPlayer from "../screens/JioSaavnMusicPlayer/JioSaavnMusicPlayer";
import JiosaavnAlbumScreen from "../screens/JiosaavnAlbumScreen/JiosaavnAlbumScreen"
import Library from "../screens/Library/Library"
import OfflineSongListScreen from "../screens/OfflineSongListScreen/OfflineSongListScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen"
import LoginScreen from "../screens/LoginScreen/LoginScreen"
import TermsAndConditionScreen from "../screens/TermsAndConditionScreen/TermsAndConditionScreen";
import LandingScreen from "../screens/LandingScreen/LandingScreen";
import Intro from "../screens/Intro/Introduction"
//##################Navigators##################
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//##################Components##################
import { Button, Text, Icon } from '@rneui/base'
import { View } from "react-native";
import Theme from "../theme/Theme";
import SearchMainScreen from "../screens/SearchScreen/SearchMainScreen";
import ShowFullSearchList from "../screens/ShowFullSearchList/ShowFullSearchList";
import { setupPlayer } from "../services/musicPlayerServices";
import ShowFullSongList from "../screens/ShowFullSearchList/ShowFullSongList";
import PlayerComp from "../screens/MusicInfo/PlayerComp";
import ShowFullPlayList from "../screens/ShowFullSearchList/ShowFullPlayList";
//##################PlayerService##################

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabBarIconRender = (name, iconName, focused, IconSize, TextSize) => {
  return (
    <View>
      <Icon
        size={IconSize ?? 20}
        name={iconName}
        type="material"
        color={focused ? Theme.PB2 : "white"}
      />
      <Text
        style={{
          fontSize: TextSize ?? 15,
          fontWeight: focused ? "bold" : "100",
          color: focused ? Theme.PB2 : "white",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

// Spotify Screen
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIconRender("Search", "search", focused),
        }}
        component={SearchStack}
      />
      <Tab.Screen
        name="Library"
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIconRender("Library", "playlist-play", focused),
        }}
        component={Library}
      />
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIconRender("Home", "home", focused, 25),
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="OfflineSongListScreen"
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIconRender("Offline", "library-music", focused),
        }}
        component={OfflineSongListScreen}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIconRender("Settings", "settings", focused),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

function AppIntroStack() {

  return (
    <Stack.Navigator initialRouteName="AppIntro">
      <Stack.Screen
        name="AppIntro"
        component={Intro}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LogIn"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsAndConditionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="AppIntroStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="AppIntroStack" component={AppIntroStack} />
      <Stack.Screen name="App" component={BottomTabs} />
      {/* Search Screen */}
      <Stack.Screen
        name="SearchMainScreen"
        component={SearchMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowFullSearchList"
        component={ShowFullSearchList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowFullSongList"
        component={ShowFullSongList}
        options={{ headerShown: false }}
      />

      {/* HomeScreen */}
      <Stack.Screen
        name="AlbumScreen"
        component={AlbumScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MusicPlayer"
        component={MusicPlayer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayerComp"
        component={PlayerComp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowFullPlayList"
        component={ShowFullPlayList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {

  useEffect(() => {
    const setup = async () => {
      const isSetup = await setupPlayer();
      // console.log("isSetup :: ", isSetup);
      if (isSetup) {
        console.log("player is Ready");
        // only play new songs after selecting the song
        // it should not start new song if we Click on the PlayerComp
      }
    };

    setup();
  }, []);
  return (
    <NavigationContainer>

      <AppStack />
    </NavigationContainer>
  )
}


export default AppNavigator;
