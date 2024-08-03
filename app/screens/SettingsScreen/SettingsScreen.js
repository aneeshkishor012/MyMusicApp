import { ScrollView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native'
import React, { useState } from 'react'
import Theme from '../../theme/Theme'
import { Avatar, CheckBox, Icon } from '@rneui/themed'
import { responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import MusicInfo from '../MusicInfo/MusicInfo'

const SettingsScreen = () => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const navigation = useNavigation()

  const goToIntro = () => {
    navigation.navigate("AppIntro");
  }

  const imgUrl = "https://instagram.fcok3-2.fna.fbcdn.net/v/t51.29350-15/132257591_438801283812315_6622486542637873841_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fcok3-2.fna.fbcdn.net&_nc_cat=103&_nc_ohc=dwlSOCDTxAwQ7kNvgFItZfB&edm=AFg4Q8wBAAAA&ccb=7-5&ig_cache_key=MjQ3MTI4NDU5Mzk0NTYyMDMwNg%3D%3D.2-ccb7-5&oh=00_AYDd2OR1Bx-2yHyWHrigwwnKoxirFEPeWHF-xQF3rKNE7g&oe=66981C0B&_nc_sid=0b30b7"

  return (
    <View style={styles.mainView}>
      <View style={styles.topIconsLayout}>
        <Icon
          name="keyboard-arrow-left"
          type="material"
          color={styles.backIcon.color}
          containerStyle={styles.backIcon}
          size={styles.backIcon.fontSize}
        />
        <Icon
          name="settings"
          type="material"
          color={styles.settingsIcon.color}
          // containerStyle={styles.menuIcon}
          size={styles.settingsIcon.fontSize}
        />
      </View>
      <Text style={styles.mainHeading}>Setting...</Text>
      <View style={[styles.row, styles.profileLayout]}>
        <View>
          <Text style={styles.profileHeading}>Aneesh Kishor K</Text>
          <Text style={styles.profileSubHeading}>aneeshkishor012@gmail.com</Text>
        </View>
        <Avatar
          size={styles.avatar.size}
          rounded={styles.avatar.rounded}
          source={{ uri: imgUrl }}
          containerStyle={{ backgroundColor: styles.avatar.backgroundColor }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.listItemTitle}>Profile</Text>
        {/* Edit Profile */}
        <View style={styles.listLayout1}>
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Edit Profile</Text>
            </View>
            <View style={[styles.row]}>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                // containerStyle={styles.menuIcon}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View>
          {/* <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Change Password</Text>
            </View>
            <View style={[styles.row]}>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                // containerStyle={styles.menuIcon}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View> */}
        </View>
        <Text style={styles.listItemTitle}>Music & Playlist</Text>
        <View style={styles.listLayout1}>
          {/* streaming Quality */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Streaming Quality</Text>
            </View>
            <View style={[styles.row]}>
              <Text style={styles.listItemRightText}>auto</Text>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View>
          {/* Display Language */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Display Language</Text>
            </View>
            <View style={[styles.row]}>
              <Text style={styles.listItemRightText}>English</Text>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                // containerStyle={styles.menuIcon}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View>
          {/* Artist Selection */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Artist Selection</Text>
            </View>
            <View style={[styles.row]}>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                // containerStyle={styles.menuIcon}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View>
          {/* Sleep Timer */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Sleep Timer</Text>
            </View>
            <View style={[styles.row]}>
              <Text style={styles.listItemRightText}>off</Text>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                // containerStyle={styles.menuIcon}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View>
          {/* Autoplay */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Autoplay</Text>
            </View>
            <View style={[styles.row]}>
              <CheckBox
                center
                checkedIcon="toggle-on"
                uncheckedIcon="toggle-off"
                checked={autoPlay}
                onPress={() => setAutoPlay((prev) => !prev)}
                containerStyle={{ backgroundColor: "transparent", margin: 0, padding: 0 }}
              />
            </View>
          </View>
          {/* Show Lirics */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Show Lirics</Text>
            </View>
            <View style={[styles.row]}>
              <CheckBox
                center
                checkedIcon="toggle-on"
                uncheckedIcon="toggle-off"
                checked={showLyrics}
                onPress={() => setShowLyrics((prev) => !prev)}
                containerStyle={{ backgroundColor: "transparent", margin: 0, padding: 0, color: "red" }}
                wrapperStyle={{ backgroundColor: "transparent", color: "red" }}
              />
            </View>
          </View>
        </View>
        <Text style={styles.listItemTitle}>Display</Text>
        <View style={styles.listLayout1}>
          {/* Dark Theme */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Dark Theme</Text>
            </View>
            <View style={[styles.row]}>
              <CheckBox
                center
                checkedIcon="toggle-on"
                uncheckedIcon="toggle-off"
                checked={isDarkTheme}
                onPress={() => setIsDarkTheme((prev) => !prev)}
                containerStyle={{ backgroundColor: "transparent", margin: 0, padding: 0, color: "red" }}
                wrapperStyle={{ backgroundColor: "transparent", color: "red" }}
              />
            </View>
          </View>
        </View>
        <Text style={styles.listItemTitle}>Choose Fav</Text>
        <View style={styles.listLayout1}>
          {/* Share */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Share</Text>
            </View>
            <View style={[styles.row]}>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                // containerStyle={styles.menuIcon}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View>
          {/* Contact Us */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Contact Us</Text>
            </View>
            <View style={[styles.row]}>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                // containerStyle={styles.menuIcon}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View>
          {/* Help & FAQ */}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Help & FAQ</Text>
            </View>
            <View style={[styles.row]}>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                // containerStyle={styles.menuIcon}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View>
          {/* Terms & Privacy*/}
          <View style={[styles.row, styles.listItem]}>
            <View style={[styles.row]}>
              <Text style={styles.title}>Help & FAQ</Text>
            </View>
            <View style={[styles.row]}>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color={styles.rightIcon.color}
                // containerStyle={styles.menuIcon}
                size={styles.rightIcon.fontSize}
              />
            </View>
          </View>
        </View>
        {/* Logout */}
        <View style={styles.listLayout1}>
          {/* Share */}
          <TouchableOpacity onPress={() => goToIntro()}>
            <View style={[styles.row, styles.listItem]}>
              <View style={[styles.row]}>
                <Text style={styles.title}>Log Out</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <MusicInfo />
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Theme.BGB1,
    padding: 20
  },
  mainHeading: {
    fontSize: Theme.H1,
    fontWeight: "500",
    color: Theme.TW1,
    marginVertical: 20
  },
  topIconsLayout: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  backIcon: {
    fontSize: Theme.H1,
    color: Theme.TW4,
    borderColor: Theme.TW1,
    borderWidth: .5,
    borderRadius: 5
  },
  settingsIcon: {
    fontSize: Theme.H1,
    color: Theme.TW4,
    borderColor: Theme.TW1,
    borderWidth: .5,
    borderRadius: 5
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  profileLayout: {
    justifyContent: "space-between",
    borderColor: Theme.BGB2,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10
  },
  avatar: {
    size: 55,
    rounded: true,
    backgroundColor: Theme.BGW6
  },
  profileHeading: {
    fontSize: Theme.H3,
    fontWeight: "500",
    color: Theme.TW1,
  },
  profileSubHeading: {
    fontSize: Theme.H4,
    color: Theme.TW5
  },
  listLayout1: {
    backgroundColor: Theme.BGB3,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  listItem: {
    backgroundColor: Theme.BGB2,
    justifyContent: "space-between",
    height: responsiveScreenHeight(6),
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center"
  },
  title: {
    fontSize: Theme.H3,
    color: Theme.BGW5
  },
  count: {
    fontSize: Theme.H3,
    color: Theme.BGW1,
    marginHorizontal: 20

  },
  rightIcon: {
    fontSize: Theme.H3,
    color: Theme.BGW1,
  },
  listItemTitle: {
    fontSize: Theme.H3,
    color: Theme.BGW5
  },
  listItemRightText: {
    fontSize: Theme.H4,
    color: Theme.BGW5,
    marginRight: 20
  }
})