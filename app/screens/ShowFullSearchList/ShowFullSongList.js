import { StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native'
import React, { useMemo, useState } from 'react'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import Theme from '../../theme/Theme';
import { ButtonGroup, Icon } from '@rneui/themed';
import { Image } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setCurrentTrackList, setSelectedSongIndex } from '../../slices/musicPlayer/musicPlayer';

const ShowFullSongList = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const storeSongList = useAppSelector(state => state.player.lastSearchList.songList);
    const showListType = useAppSelector(state => state.player.lastSearchList.showListType);

    //#########################################
    const [songList, setSongList] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    useMemo(() => {
        if (showListType === 'song') {
            setSongList(storeSongList);
        }
        setSelectedType(showListType);
    }, [showListType, storeSongList]);

    const goBack = () => {
        navigation.goBack()
    }

    const goToMusicPlayer = (data, index) => {
        console.log("goToMusicPlayer :: index = ", index);
        // Assuming dispatch and navigation are properly set up
        dispatch(setSelectedSongIndex(index));  // Dispatch action to set selected song index

        // Assuming songsListTemp is defined elsewhere
        dispatch(setCurrentTrackList(storeSongList));  // Dispatch action to set current track list

        // Navigate to MusicPlayer screen with additional data
        navigation.navigate("MusicPlayer", {
            data: { ...data, cameFrom: "ShowFullSearchList" }
        });
    }

    const SongListRender = ({ data, index }) => {
        return (
            <TouchableOpacity
                onPress={() => goToMusicPlayer(data, index)}
            >
                <View style={styles.listItem}>
                    <View style={[styles.row]}>
                        <Image style={styles.image} source={{ uri: data.image[2].url }} />
                        <View style={styles.textLayout}>
                            <Text style={styles.title} numberOfLines={1}>{data.name}</Text>
                            <Text style={styles.subTitle} numberOfLines={1}>{`${data.label}`}</Text>
                        </View>
                    </View>
                    <View style={[styles.iconLayout, styles.row]}>
                        <Icon
                            name="download" // favorite
                            type="material"
                            iconStyle={styles.downloadIcon}
                            size={styles.heartIcon.fontSize}
                            onPress={() => { }}
                        />
                        <Icon
                            name="play"
                            type="fontisto"
                            iconStyle={styles.moreIcon}
                            size={styles.moreIcon.fontSize}
                            onPress={() => { }}
                        />

                    </View>
                </View>
            </TouchableOpacity>
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
                    onPress={() => goBack()}
                />
                <Icon
                    name="settings"
                    type="material"
                    color={styles.settingsIcon.color}
                    size={styles.settingsIcon.fontSize}
                />
            </View>
            <View style={styles.listView}>
                {
                    selectedType === "song" &&
                    <VirtualizedList
                        data={songList}
                        initialNumToRender={4}
                        renderItem={({ item, index }) => <SongListRender data={item} index={index} />}  // Fixed renderItem prop                        keyExtractor={item => item.key}
                        getItemCount={() => songList.length}
                        getItem={(data, index) => data[index]}
                        horizontal={false} // Enable horizontal scrolling
                        contentContainerStyle={styles.contentContainer}
                        ListFooterComponent={() => <Footer />}
                        showsVerticalScrollIndicator={false}
                    />
                }
            </View>
        </View>
    )
}

export default ShowFullSongList

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
        marginRight: 5

    },
    bottumAlbumSubTitle: {
        fontSize: Theme.H5,
        color: Theme.TW4,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    },
    bottumAlbum: {
        backgroundColor: Theme.BGB2,
        width: responsiveScreenWidth(25),
        borderRadius: 10,
        marginRight: 10
    },
    contentContainer: {
        padding: 0,
        margin: 0
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 10
    },
    listView: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },
    listItem: {
        backgroundColor: Theme.BGB2,
        width: responsiveScreenWidth(90),
        marginVertical: 5,
        padding: 5,
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    textLayout: {
        marginHorizontal: 10,
        overflow:"hidden",
        width: responsiveScreenWidth(40),
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
        justifyContent: "space-around",
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
    downloadIcon: {
        fontSize: Theme.IH5,
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
        top: responsiveScreenHeight(22),
        width: responsiveScreenWidth(90),
        height: responsiveScreenHeight(30),
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
    popUpHeading: {
        fontSize: Theme.H2,
        color: Theme.BGB1,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 15
    },
    popUpTitle: {
        fontSize: Theme.H3,
        color: Theme.BGB1,
        margin: 10
    }
})