import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Theme from '../../theme/Theme';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { Icon } from '@rneui/base';
import { Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import { useGetAlbumListOnSearch, useGetArtistListOnSearch, useGetPlayListOnSearch, useGetSongListOnSearch } from '../../services/jiosaavn/jiosaavn';
import songList from '../../data/searchData/songList';
import playList from '../../data/searchData/playList';
import albumList from '../../data/searchData/albumList';
import artistList from '../../data/searchData/artistList';
import { useDispatch } from 'react-redux';
import { setCurrentTrackList, setLastSearch, setSelectedPlayList, setSelectedSongIndex } from '../../slices/musicPlayer/musicPlayer';
import MusicInfo from '../MusicInfo/MusicInfo';

const SearchMainScreen = () => {
    //###########################TempDatas###############################
    const songsListTemp = songList;
    const playListTemp = playList;
    const albumListTemp = albumList;
    const artistListTemp = artistList;
    //###########################useDispatch, useAppSelect, and Naigation###############################
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //###########################useStates###############################
    const [searchText, setSearchText] = useState("");
    const [query, setQuery] = useState('');
    const [songListData, setSongListData] = useState([]);
    const [playListData, setPlayListData] = useState([]);
    const [songAlbumData, setAlbumListData] = useState([]);
    const [songArtistData, setSongArtistData] = useState([]);
    //###########################JIOSaavnHooks###############################
    const { searchSongList, searchSongListLoading, searchSongListError } = useGetSongListOnSearch(query);
    const { searchArtistList, searchArtistListLoading, searchArtistListError } = useGetArtistListOnSearch(query);
    const { searchAlbumList, searchAlbumListLoading, searchAlbumListError } = useGetAlbumListOnSearch(query);
    const { searchPlayList, searchPlayListLoading, searchPlayListError } = useGetPlayListOnSearch(query);

    useEffect(() => {
        if (searchSongList) {
            console.log("searchSongList :: ", JSON.stringify(searchSongList.length));
            setSongListData(searchSongList);
        }
        if (searchAlbumList) {
            console.log("searchAlbumList :: ", JSON.stringify(searchAlbumList.length));
            setAlbumListData(searchAlbumList);
        }
        if (searchArtistList) {
            console.log("searchArtistList :: ", JSON.stringify(searchArtistList.length));
            setSongArtistData(searchArtistList);
        }
        if (searchPlayList) {
            console.log("searchPlayList :: ", JSON.stringify(searchPlayList.length));
            setPlayListData(searchPlayList);
        }
        dispatch(setLastSearch({
            songList: searchSongList,
            playList: searchPlayList,
            albumList: searchAlbumList,
            artistList: searchArtistList
        }))
    }, [searchSongList, searchArtistList, searchAlbumList, searchPlayList]);

    const handleSearch = useMemo(
        () => debounce((text) => {
            const trimmedText = text.trim();
            if (trimmedText.length) {
                setQuery(trimmedText);
            }
        }, 700),
        []
    );

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText, handleSearch]);

    const goBack = () => {
        navigation.goBack()
    }

    const goToShowFullPlayList = (data) => {
        dispatch(setLastSearch({
            songList: songListData,
            playList: playListData,
            albumList: albumListTemp,
            artistList: artistListTemp,
            showListType: data.type
        }))

        navigation.navigate("ShowFullPlayList", { data });
    }
    const goToShowFullSongList = (data) => {
        dispatch(setLastSearch({
            songList: songListData,
            playList: playListData,
            albumList: albumListTemp,
            artistList: artistListTemp,
            showListType: data.type
        }))

        console.log("Set Data for the full List View");
        navigation.navigate("ShowFullSongList", { data });
    }
    const goToMusicPlayer = (data, index) => {
        dispatch(setSelectedSongIndex(index));
        dispatch(setCurrentTrackList(searchSongList));
        navigation.navigate("MusicPlayer", {
            data: { ...data, cameFrom: "SearchMainScreen" }
        });
    }
    const goToAlbumScreen = (data) => {
        dispatch(setSelectedPlayList(data));  // Dispatch action to set selected song index
        setTimeout(()=>{
            navigation.navigate("AlbumScreen", {});
        }, 500)
    }

    const SongListRender = ({ item, index }) => {
        // console.log("index :: ", index , item);
        return (
            <TouchableOpacity
                onPress={() => goToMusicPlayer(item, index)}
            >
                <View style={styles.bottumAlbum}>
                    <Image style={styles.bottumAlbumImage} source={{ uri: item?.image[2].url }} />
                    <Text
                        style={styles.bottumAlbumTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item?.name}
                    </Text>
                    <Text
                        style={styles.bottumAlbumSubTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {`${item?.label}`}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const PlayListRender = ({data, index}) => {
        return (
            <TouchableOpacity
                onPress={() => goToAlbumScreen(data)}
            >
                <View style={styles.bottumAlbum}>
                    <Image style={styles.bottumAlbumImage} source={{ uri: data?.image[2].url }} />
                    <Text
                        style={styles.bottumAlbumTitle}
                        numberOfLines={1}

                    >
                        {data?.name}
                    </Text>
                    <Text
                        style={styles.bottumAlbumSubTitle}
                        numberOfLines={1}
                    >
                        {`${data?.language}. ${data?.songCount} Songs`}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const AlbumListRender = (data) => {
        return (
            <TouchableOpacity
            // onPress={() => goToAlbumScreen(data)}
            >
                <View style={styles.bottumAlbum}>
                    <Image style={styles.bottumAlbumImage} source={{ uri: data.title.image[2].url }} />
                    <Text
                        style={styles.bottumAlbumTitle}
                        numberOfLines={1}

                    >
                        {data.title.name}
                    </Text>
                    <Text
                        style={styles.bottumAlbumSubTitle}
                        numberOfLines={1}
                    >
                        {`${data.title.language} . ${data.title.year}`}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const ArtistListRender = (data) => {
        return (
            <TouchableOpacity
            // onPress={() => goToAlbumScreen(data)}
            >
                <View style={styles.bottumAlbum}>
                    <Image style={styles.bottumAlbumImage} source={{ uri: data.title.image[2].url }} />
                    <Text
                        style={styles.bottumAlbumTitle}
                        numberOfLines={1}

                    >
                        {data.title.name}
                    </Text>
                    <Text
                        style={styles.bottumAlbumSubTitle}
                        numberOfLines={1}
                    >
                        {`${data.title.description}`}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const getItemCount = () => Math.min(songListData.length, 30);
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
            <Input
                inputContainerStyle={styles.searchInputContainer}
                inputStyle={styles.searchInput}
                placeholder="Search for songs, playList, albums, artists..."
                value={searchText}
                onChangeText={setSearchText}
                leftIcon={<Icon name="search" type="material" color="grey" containerStyle={{ marginHorizontal: 10 }} size={29} />}
                rightIcon={searchText.length !== 0 && <Icon name="cancel" type="material" color="grey" size={20} onPress={() => setSearchText('')} />}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {songListData.length ?
                    <View>
                        <Text style={styles.ListTitle}>{`Songs . ${songListData.length}`}</Text>
                        <VirtualizedList
                                    data={songListData}
                                    initialNumToRender={4}
                                    renderItem={({ item, index }) => <SongListRender item={item} index={index} />}
                                    keyExtractor={item => item?.id}
                                    getItemCount={getItemCount}
                                    getItem={(data, index) => data[index]}
                                    horizontal={true} // Enable horizontal scrolling
                                    contentContainerStyle={styles.contentContainer}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                        <Text
                            style={styles.moreText}
                            onPress={() => goToShowFullSongList({ type: "song", list: songsListTemp })}
                        >
                            more...
                        </Text>
                    </View> : <></>
                }
                {playListData.length ?
                    <View>
                        <Text style={styles.ListTitle}>{`PlayList . ${playListData.length}`}</Text>

                        <VirtualizedList
                            data={playListData}
                            initialNumToRender={4}
                            renderItem={({ item, index }) => <PlayListRender data={item} index={index}/>}
                            keyExtractor={item => item.key}
                            getItemCount={() => playListData.length}
                            getItem={(data, index) => data[index]}
                            horizontal={true} // Enable horizontal scrolling
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text
                            style={styles.moreText}
                            onPress={() => goToShowFullPlayList({ type: "playList", list: playListData })}
                        >
                            more...
                        </Text>
                    </View> : <></>
                }
                {
                    albumListTemp.length ? <View>
                        <Text style={styles.ListTitle}>{`Albums . ${albumListTemp.length}`}</Text>
                        <VirtualizedList
                            data={albumListTemp}
                            initialNumToRender={4}
                            renderItem={({ item }) => <AlbumListRender title={item} />}
                            keyExtractor={item => item.key}
                            getItemCount={() => albumListTemp.length}
                            getItem={(data, index) => data[index]}
                            horizontal={true} // Enable horizontal scrolling
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text
                            style={styles.moreText}
                        // onPress={() => goToShowFullSearchListScreen({ type: "album", list: albumListTemp })}
                        >
                            more...
                        </Text>
                    </View> : <></>
                }

                {
                    artistListTemp.length ? <View>
                        <Text style={styles.ListTitle}>{`Artists . ${artistListTemp.length}`}</Text>
                        <VirtualizedList
                            data={artistListTemp}
                            initialNumToRender={4}
                            renderItem={({ item }) => <ArtistListRender title={item} />}
                            keyExtractor={item => item.key}
                            getItemCount={() => artistListTemp.length}
                            getItem={(data, index) => data[index]}
                            horizontal={true} // Enable horizontal scrolling
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text
                            style={styles.moreText}
                        // onPress={() => goToShowFullSearchListScreen({ type: "artist", list: artistListTemp })}
                        >
                            more...
                        </Text>
                    </View> : <></>
                }


            </ScrollView>
            {/* <MusicInfo/> */}
        </View>
    )
}

export default SearchMainScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Theme.BGB1,
        padding: 20
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
    searchInputContainer: {
        borderColor: Theme.TB6,
        borderWidth: 1,
        width: responsiveWidth(90),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        top: 12,
        borderRadius: 10,
        backgroundColor: Theme.BGW1
    },
    searchInput: {
        height: 50,
        color: Theme.TB6
    },
    ListTitle: {
        color: Theme.TW1,
        alignSelf: "flex-start",
        fontSize: Theme.H1,
        fontWeight: "500",
        marginBottom: 20
    },
    bottumAlbumImage: {
        height: responsiveScreenWidth(23),
        width: responsiveScreenWidth(23),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    bottumAlbumTitle: {
        fontSize: Theme.H4,
        color: Theme.TW4,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        maxWidth: responsiveScreenWidth(23), // Adjust according to your design
    },
    bottumAlbumSubTitle: {
        fontSize: Theme.H5,
        color: Theme.TW4,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        maxWidth: responsiveScreenWidth(23), // Adjust according to your design
    },
    bottumAlbum: {
        backgroundColor: Theme.BGB2,
        borderRadius: 10,
        marginRight: 10
    },
    contentContainer: {
        padding: 0,
        margin: 0
    },
    moreText: {
        marginTop: 10,
        fontSize: Theme.H4,
        color: Theme.TW6,
        textAlign: "right"
    }
})