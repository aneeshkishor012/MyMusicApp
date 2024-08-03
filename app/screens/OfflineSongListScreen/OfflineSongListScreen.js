import { Image, Modal, StyleSheet, Text, View, VirtualizedList } from 'react-native'
import React, { useState } from 'react'
import Theme from '../../theme/Theme'
import { color, Icon } from '@rneui/base'
import { Button, ButtonGroup, Overlay } from '@rneui/themed'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import MusicInfo from '../MusicInfo/MusicInfo'


const OfflineSongListScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const DATA = [];

  const getItem = (data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`
  });

  const getItemCount = (data) => 50;

  const ModalPopup = () => {
    return (
      <Overlay
        isVisible={visible} 
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.modalView}
      >
        <View >
          <Text style={styles.popUpHeading}>Selected Song Name</Text>
          <Text style={styles.popUpTitle} onPress={toggleOverlay}>
            Play later
          </Text>
          <Text style={styles.popUpTitle} onPress={toggleOverlay}>
            Add to queue
          </Text>
          <Text style={styles.popUpTitle} onPress={toggleOverlay}>
            Add to playlist
          </Text>
          <Text style={styles.popUpTitle} onPress={toggleOverlay}>
            Delete
          </Text>
          <Text style={styles.popUpTitle} onPress={toggleOverlay}>
            Share
          </Text>
        </View>
      </Overlay>
    )
  }
  const SongListItems = () => {
    return (
      <View style={[styles.listItem, styles.row]}>
        <Image style={styles.image} source={require("../../assets/Images/album1.jpg")} />
        <View style={styles.textLayout}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.subTitle}>Sub Title</Text>
        </View>
        <View style={[styles.iconLayout, styles.row]}>
          <Icon
            name="favorite-border" // favorite
            type="material"
            iconStyle={styles.heartIcon}
            size={styles.heartIcon.fontSize}
            onPress={() => { }}
          />
          <Icon
            name="more-v-a"
            type="fontisto"
            iconStyle={styles.moreIcon}
            size={styles.moreIcon.fontSize}
            onPress={() => toggleOverlay()} />

        </View>
      </View>
    )
  }

  const Footer = () => {
    return (
      <View style={styles.footerLayout}>
        <Text style={styles.footerText}>no more</Text>
      </View>
    )
  }
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
      <Text style={styles.mainHeading}>Offline...</Text>
      <ButtonGroup
        buttons={['Songs', 'Playlist', 'Album', 'Artist']}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        selectedButtonStyle={styles.selectedButtonStyle}
        selectedTextStyle={styles.groupBtn.color}
        containerStyle={[styles.groupBtn]}
        textStyle={{ color: styles.groupBtn.color }}
      />
      <View style={styles.listView}>
        <VirtualizedList
          data={DATA}
          initialNumToRender={9}
          renderItem={({ item }) => <SongListItems title={item.title} />}
          keyExtractor={item => item.key}
          getItemCount={getItemCount}
          getItem={getItem}
          ListFooterComponent={() => <Footer />}
          showsVerticalScrollIndicator={false}
        />
        <ModalPopup />

      </View>
      <MusicInfo/>
    </View>
  )
}

export default OfflineSongListScreen

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
    color: Theme.TW1,
    marginVertical: 20
  },
  topIconsLayout: {
    justifyContent: "space-between",
    flexDirection: "row",
    // marginBottom: 10
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
  groupBtn: {
    marginBottom: 20,
    marginLeft: 0,
    marginTop: 0,
    backgroundColor: Theme.PB2,
    color: "white"
  },
  selectedButtonStyle: {
    backgroundColor: Theme.PB1,
    color: Theme.TW1
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10
  },
  listView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  listItem: {
    backgroundColor: Theme.BGB2,
    width: responsiveScreenWidth(90),
    marginVertical: 5,
    padding: 5,
    borderRadius: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  textLayout: {
    marginHorizontal: 10,
    width: responsiveScreenWidth(48),
  },
  title: {
    fontSize: Theme.H4,
    color: Theme.TW1,
    fontWeight: "800"
  },
  subTitle: {
    fontSize: Theme.H5,
    color: Theme.TW1
  },
  iconLayout: {
    justifyContent: "space-evenly",
    width: responsiveScreenWidth(22),
    alignItems: "center"
  },
  moreIcon: {
    fontSize: Theme.IH7,
    color: Theme.PB2
  },
  heartIcon: {
    fontSize: Theme.IH6,
    color: Theme.PB2
  },
  footerLayout: {
    height: responsiveScreenHeight(15),
    alignItems: "center"
  },
  footerText: {
    fontSize: Theme.H4,
    color: Theme.BGB5,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    top:responsiveScreenHeight(22),
    width:responsiveScreenWidth(90),
    height:responsiveScreenHeight(30),
    backgroundColor: Theme.BGW4,
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  popUpHeading:{
    fontSize: Theme.H2,
    color: Theme.BGB1,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15
  },
  popUpTitle:{
    fontSize: Theme.H3,
    color: Theme.BGB1,
    margin: 10
  }
})