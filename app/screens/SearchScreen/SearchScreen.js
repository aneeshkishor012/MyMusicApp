import { StyleSheet, Text, View, Button, Image, FlatList, TouchableWithoutFeedback, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import Theme from '../../theme/Theme'
import { Icon, Input } from '@rneui/base';
import { useGetAlbumListOnSearch, useGetArtistListOnSearch, useGetPlayListOnSearch, useGetSongListOnSearch, useJioSaavnSearch } from "../../services/jiosaavn/jiosaavn"
import { jiosaavnSongList } from '../../data/jiosaavnSongList.js';
import { responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import debounce from 'lodash.debounce'; // Use lodash debounce for better performance
import { useNavigation } from '@react-navigation/native';
import MusicInfo from '../MusicInfo/MusicInfo.js';


const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState('');
  const [defaultSongsList, setDefaultSongsList] = useState(jiosaavnSongList ?? []);
  const [isTesting, setIsTesting] = useState(false);

  const navigation = useNavigation();

  const handleSearch = useMemo(
    () => debounce((text) => {
      const trimmedText = text.trim();
      if (trimmedText.length) {
        setQuery(trimmedText);
      }
    }, 500),
    []
  );

  const goBack = () => {
    navigation.goBack()
  }

  const goToSearchScreen = () => {
    navigation.navigate('SearchMainScreen');
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
          onPress={() => goBack()}
        />
        <Icon
          name="more-vert"
          type="material"
          color={styles.menuIcon.color}
          containerStyle={styles.menuIcon}
          size={styles.menuIcon.fontSize}
        />

      </View>

      <View>
        <Text onPress={() => { }} style={styles.searchHeader}>Search...</Text>
        <TouchableOpacity onPress={() => goToSearchScreen()}>
          <View style={styles.searchBar}>
            <Icon name="search" type="material" color="grey" containerStyle={{ marginHorizontal: 10 }} size={29} />
            <Text style={styles.searchBarText}>Search for songs, playlist, album...</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}

      >
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={[styles.cardLayout, { backgroundColor: "#8fbbf0" }]}>
            <Text style={styles.cardText}>
              Music
            </Text>
          </View>
          <View style={[styles.cardLayout, { backgroundColor: "#66e594" }]}>
            <Text style={styles.cardText}>
              Podcast
            </Text>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={[styles.cardLayout, { backgroundColor: "#ab9607" }]}>
            <Text style={styles.cardText}>
              Live Events
            </Text>
          </View>
          <View style={[styles.cardLayout, { backgroundColor: "#e66c00" }]}>
            <Text style={styles.cardText}>
              Made For You
            </Text>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={[styles.cardLayout, { backgroundColor: "#e6323a" }]}>
            <Text style={styles.cardText}>
              New Release
            </Text>
          </View>
          <View style={[styles.cardLayout, { backgroundColor: "#ba7dce" }]}>
            <Text style={styles.cardText}>
              Malayalam
            </Text>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={[styles.cardLayout, { backgroundColor: "#b88860" }]}>
            <Text style={styles.cardText}>
              Tamil
            </Text>
          </View>
          <View style={[styles.cardLayout, { backgroundColor: "#8e8d8a" }]}>
            <Text style={styles.cardText}>
              Hindi
            </Text>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={[styles.cardLayout, { backgroundColor: "#194a7a" }]}>
            <Text style={styles.cardText}>
              Kannada
            </Text>
          </View>
          <View style={[styles.cardLayout, { backgroundColor: "#79021c" }]}>
            <Text style={styles.cardText}>
              Motivation
            </Text>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={[styles.cardLayout, { backgroundColor: "#314026" }]}>
            <Text style={styles.cardText}>
              Love
            </Text>
          </View>
          <View style={[styles.cardLayout, { backgroundColor: "#104b51" }]}>
            <Text style={styles.cardText}>
              FriendShip
            </Text>
          </View>
        </View>
      </ScrollView>
      <MusicInfo />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Theme.BGB1,
    padding: 20
  },
  searchHeader: {
    color: Theme.TW1,
    alignSelf: "flex-start",
    fontSize: Theme.H1,
    fontWeight: "500"
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
  searchInput: {
    height: 50,
    color: Theme.TB6
  },
  searchBar: {
    // justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.BGW3,
    borderRadius: 10,
    height: 45,
    marginVertical: 10
  },
  searchBarText: {
    color: Theme.TB5,
    fontStyle: "italic",
    fontSize: Theme.H3
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  cardText: {
    color: Theme.TW1,
    fontSize: Theme.H3
  },
  cardLayout: {
    width: responsiveScreenWidth(43),
    backgroundColor: "grey",
    height: responsiveScreenHeight(10),
    padding: 10,
    borderRadius: 10,
    marginVertical: 10
  }
})