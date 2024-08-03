import { StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, Image } from '@rneui/base'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import Theme from '../../theme/Theme'
import { useNavigation } from '@react-navigation/native'
import MusicInfo from '../MusicInfo/MusicInfo'
import { useGetPlayListWithId } from '../../services/jiosaavn/jiosaavn'
import { useAppSelector } from '../../hooks'
import Loader2 from '../../components/loader/loader'
import { setCurrentTrackList, setSelectedSongIndex } from '../../slices/musicPlayer/musicPlayer'
import { useDispatch } from 'react-redux'

const AlbumScreen = (props) => {
  const selectedAlbumListObj = useAppSelector(state => state.player.selectedAlbumListObj);
  const dispatch = useDispatch();
  const [playListId, setPlayListId] = useState();
  const [songList, setSongList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const { selPlayListResults, selPlayListLoading, selPlayListError } = useGetPlayListWithId(playListId, selectedAlbumListObj.songCount);


  useEffect(() => {
    if (selectedAlbumListObj.type === "playlist") {
      setPlayListId(selectedAlbumListObj.id);
    }
  }, [selectedAlbumListObj]);

  useEffect(() => {
    if (Array.isArray(selPlayListResults)) {
      setSongList(selPlayListResults);
      setIsLoading(false);
    }
  }, [selPlayListResults]);

  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack();
  }

  const goToMusicPlayer = (data, index) => {
    // Assuming dispatch and navigation are properly set up
    dispatch(setSelectedSongIndex(index));  // Dispatch action to set selected song index

    // Assuming songsListTemp is defined elsewhere
    dispatch(setCurrentTrackList(songList));  // Dispatch action to set current track list

    // Navigate to MusicPlayer screen with additional data
    navigation.navigate("MusicPlayer", {});
}

  const SongListItems = ({ data, index }) => {
    return (
      <TouchableOpacity onPress={() => goToMusicPlayer(data, index)}>
        <View style={[styles.listItem, styles.row]}>
          <Image style={styles.image} source={data.imageUri ? { uri: data?.imageUri } : require('../../assets/Images/Headphone.png')} />
          <View style={styles.textLayout}>
            <Text style={styles.title}>{data?.name}</Text>
            <Text style={styles.subTitle}>{data?.description}</Text>
            <Text style={styles.subTitle}>{data?.label} - {data?.language}</Text>
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
              name="play"
              type="font-awesome-5"
              iconStyle={styles.playIcon}
              size={styles.playIcon.fontSize}
              onPress={() => { }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
      <View style={styles.albumLayout}>
        <View style={{ alignItems: "center" }}>
          <Image style={styles.albumImage} source={selectedAlbumListObj?.imageUri ? { uri: selectedAlbumListObj?.imageUri } : require("../../assets/Images/album3.jpg")} />
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View>
            <Text style={styles.albumHeading}>{selectedAlbumListObj?.name}</Text>
            <Text style={styles.albumDescription}>{selectedAlbumListObj?.description}</Text>
            <Text style={styles.albumSubHeading}>{selectedAlbumListObj?.language} - {selectedAlbumListObj.type}</Text>
            <Text>Count : {"200"}</Text>
          </View>
          <View style={styles.row}>
            <Icon
              name="favorite-border" // favorite
              type="material"
              iconStyle={styles.albumHeartIcon}
              size={styles.albumHeartIcon.fontSize}
              onPress={() => { }}
            />
            <Icon
              name="play"
              type="font-awesome-5"
              iconStyle={styles.albumPlayIcon}
              size={styles.albumPlayIcon.fontSize}
              onPress={() => { }}
            />
          </View>
        </View>
      </View>
      <View style={styles.listView}>
        {
          isLoading ? <View style={{flex:1, justifyContent:"center", alignItems:"center"}}><Loader2 /></View> : <VirtualizedList
            data={songList}
            keyExtractor={item => item.id}
            initialNumToRender={4}
            renderItem={({ item, index }) => <SongListItems data={item} index={index} />}  // Fixed renderItem prop                        keyExtractor={item => item.key}
            getItemCount={() => songList.length}
            getItem={(data, index) => data[index]}
            horizontal={false} // Enable horizontal scrolling
            contentContainerStyle={styles.contentContainer}
            ListFooterComponent={() => <Footer />}
            showsVerticalScrollIndicator={false}
          />
        }


      </View>
      <MusicInfo />

    </View>

  )
}

export default AlbumScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Theme.BGB1,
    padding: 20
  },
  albumLayout: {
    justifyContent: "center",
    margin: 10
  },
  albumImage: {
    height: responsiveScreenHeight(20),
    width: responsiveScreenHeight(20),
    borderRadius: 10,
    marginBottom: 10
  },
  albumHeading: {
    color: Theme.TW1,
    alignSelf: "flex-start",
    fontSize: Theme.H1
  },
  albumDescription: {
    color: Theme.BGW5,
    alignSelf: "flex-start",
    fontSize: Theme.H3,
    fontWeight: "300"
  },
  albumSubHeading: {
    color: Theme.BGW5,
    alignSelf: "flex-start",
    fontSize: Theme.H4,
    fontWeight: "300"
  },
  albumPlayIcon: {
    fontSize: Theme.IH5,
    color: Theme.PB1
  },
  albumHeartIcon: {
    fontSize: Theme.IH3,
    color: Theme.PB1,
    marginHorizontal: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
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
  listItem: {
    backgroundColor: Theme.BGB2,
    width: responsiveScreenWidth(90),
    marginVertical: 5,
    padding: 5,
    borderRadius: 10,
    alignSelf:"center"
  },
  listView:{
    height:responsiveScreenHeight(56)
  },
  iconLayout: {
    justifyContent: "space-evenly",
    width: responsiveScreenWidth(22),
    alignItems: "center"
  },
  playIcon: {
    fontSize: Theme.IH7,
    color: Theme.PB2
  },
  heartIcon: {
    fontSize: Theme.IH6,
    color: Theme.PB2
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
  image: {
    height: 60,
    width: 60,
    borderRadius: 10
  },
})