import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../theme/Theme'
import { Avatar, Icon } from '@rneui/themed'
import { Button } from '@rneui/base'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import MusicInfo from '../MusicInfo/MusicInfo'

const Library = () => {

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
          color={styles.menuIcon.color}
          // containerStyle={styles.menuIcon}
          size={styles.menuIcon.fontSize}
        />
      </View>
      <Text style={styles.mainHeading}>Library...</Text>
      <View style={[styles.row, styles.profileLayout, { justifyContent: "space-between" }]}>
        <View style={styles.row}>
          <Avatar
            size={styles.avatar.size}
            rounded={styles.avatar.rounded}
            source={{ uri: imgUrl }}
          />
          <Text style={styles.profileName}>Aneesh Kishor K</Text>
        </View>
        <Button
          title={"Edit"}
          type='outline'
          buttonStyle={styles.editBtn}
          titleStyle={styles.editBtnTitle}
        />
      </View>
      <View style={styles.list}>
        <View style={[styles.row, styles.listItem]}>
          <View style={[styles.row]}>
            <Icon
              name='music'
              type='font-awesome'
              color={styles.icon.color}
              // containerStyle={styles.menuIcon}
              size={styles.icon.fontSize}
            />
            <Text style={styles.title}>Songs</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.count}>112</Text>
            <Icon
              name='chevron-right'
              type='font-awesome'
              color={styles.rightIcon.color}
              // containerStyle={styles.menuIcon}
              size={styles.rightIcon.fontSize}
            />
          </View>
        </View>
        <View style={[styles.row, styles.listItem]}>
          <View style={[styles.row]}>
            <Icon
              name='album'
              type='material-icons'
              color={styles.icon.color}
              size={styles.icon.fontSize}
            />
            <Text style={styles.title}>Albums</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.count}>112</Text>
            <Icon
              name='chevron-right'
              type='font-awesome'
              color={styles.rightIcon.color}
              // containerStyle={styles.menuIcon}
              size={styles.rightIcon.fontSize}
            />
          </View>
        </View>
        <View style={[styles.row, styles.listItem]}>
          <View style={[styles.row]}>
            <Icon
              Icon
              name='microphone'
              type='font-awesome'
              color={styles.icon.color}
              size={styles.icon.fontSize}
            />
            <Text style={styles.title}>Artist</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.count}>112</Text>
            <Icon
              name='chevron-right'
              type='font-awesome'
              color={styles.rightIcon.color}
              // containerStyle={styles.menuIcon}
              size={styles.rightIcon.fontSize}
            />
          </View>
        </View>
        <View style={[styles.row, styles.listItem]}>
          <View style={[styles.row]}>
            <Icon
              name='podcasts'
              type='material-icon'
              color={styles.icon.color}
              // containerStyle={styles.menuIcon}
              size={styles.icon.fontSize}
            />
            <Text style={styles.title}>Shows</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.count}>112</Text>
            <Icon
              name='chevron-right'
              type='font-awesome'
              color={styles.rightIcon.color}
              // containerStyle={styles.menuIcon}
              size={styles.rightIcon.fontSize}
            />
          </View>
        </View>
        <View style={[styles.row, styles.listItem]}>
          <View style={[styles.row]}>
            <Icon
              name='download'
              type='material-icon'
              color={styles.icon.color}
              // containerStyle={styles.menuIcon}
              size={styles.icon.fontSize}
            />
            <Text style={styles.title}>Download</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.count}>112</Text>
            <Icon
              name='chevron-right'
              type='font-awesome'
              color={styles.rightIcon.color}
              // containerStyle={styles.menuIcon}
              size={styles.rightIcon.fontSize}
            />
          </View>
        </View>
        <View style={[styles.row, styles.listItem]}>
          <View style={[styles.row]}>
            <Icon
              name='playlist-music-outline'
              type='material-community'
              color={styles.icon.color}
              // containerStyle={styles.menuIcon}
              size={styles.icon.fontSize}
            />
            <Text style={styles.title}>PlayList</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.count}>112</Text>
            <Icon
              name='chevron-right'
              type='font-awesome'
              color={styles.rightIcon.color}
              // containerStyle={styles.menuIcon}
              size={styles.rightIcon.fontSize}
            />
          </View>
        </View>
        <View style={[styles.row, styles.listItem]}>
          <View style={[styles.row]}>
            <Icon
              name='video-camera'
              type='font-awesome'
              color={styles.icon.color}
              // containerStyle={styles.menuIcon}
              size={styles.icon.fontSize}
            />
            <Text style={styles.title}>Video</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.count}>112</Text>
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
      <View style={styles.bottumLayout}>
        <Button
          buttonStyle={styles.suffleBtn}
        >
          <Icon
            name='shuffle'
            type='entype'
            color={styles.shuffleIcon.color}
            iconStyle={styles.shuffleIcon}
          />
          Shuffle All
        </Button>
      </View>
      <MusicInfo/>
    </View>
  )
}

export default Library

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: Theme.BGB1,
    padding: 20
  },
  mainHeading: {
    fontSize: Theme.H1,
    fontWeight: "500",
    color: Theme.TW1
  },
  settingsIcon: {
    fontSize: Theme.H1,
    color: Theme.BGW1
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  profileLayout: {
    marginVertical: 20
  },
  topIconsLayout: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20
  },
  backIcon: {
    fontSize: Theme.H1,
    color: Theme.TW4,
    borderColor: Theme.TW1,
    borderWidth: .5,
    borderRadius: 5
  },
  menuIcon: {
    fontSize: Theme.H1,
    color: Theme.TW4,
    borderColor: Theme.TW1,
    borderWidth: .5,
    borderRadius: 5
  },
  avatar: {
    size: 40,
    rounded: true
  },
  profileName: {
    fontSize: Theme.H3,
    color: Theme.BGW1,
    marginHorizontal: 10
  },
  editBtn: {
    borderColor: Theme.PB1
  },
  editBtnTitle: {
    color: Theme.PB1
  },
  list: {
    marginVertical: 10
  },
  listItem: {
    backgroundColor: Theme.BGB2,
    justifyContent: "space-between",
    height: responsiveScreenHeight(6),
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },
  icon: {
    fontSize: Theme.H1,
    color: Theme.TW4,
    borderColor: Theme.TW1,
    borderWidth: .5,
    borderRadius: 5
  },
  title: {
    fontSize: Theme.H3,
    color: Theme.BGW1,
    marginHorizontal: 20
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
  bottumLayout: {
    alignItems: "center",
    marginVertical: 20,
    height: responsiveScreenHeight(12)
  },
  suffleBtn: {
    backgroundColor: Theme.PB1
  },
  shuffleIcon:{
    color: Theme.BGW1,
    marginHorizontal: 5
  }
})