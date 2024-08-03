import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useState } from 'react';
import { Icon } from '@rneui/base';
import Theme from '../../theme/Theme';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useAppSelector } from '../../hooks';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { Event, State, usePlaybackState, useTrackPlayerEvents } from 'react-native-track-player';

const MusicInfo = () => {
    const isMusicPlaying = useAppSelector((state) => state.player.isPlaying);
    const currentPlayingTrack = useAppSelector(state => state.player.currentPlayingTrack);
    const playBackState = usePlaybackState();
    const [track, setTrack] = useState(null);
    const navigation = useNavigation()

    const goAlbumPlayer = () => {
        navigation.navigate("PlayerComp");
    }

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        switch (event.type) {
            case Event.PlaybackTrackChanged:
                const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
                setTrack(playingTrack);
                break;
        }
    });

    const favAnimation = useRef(new Animated.Value(1)).current;
    const playAnimation = useRef(new Animated.Value(1)).current;
    const queueAnimation = useRef(new Animated.Value(1)).current;


    const handlePressInPay = () => {
        Animated.spring(playAnimation, {
            toValue: 1.8,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOutPay = () => {
        Animated.spring(playAnimation, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const togglePlayback = async (playback: State) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();

        if (currentTrack !== null) {
            // console.log(`playback :: ${playback}, State.Ready :: ${State.Ready}`);
            // console.log(`playback :: ${playback}, State.Ready :: ${State.Paused}`);
            if (playback === State.Paused || playback === State.Ready) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };
    const skipToNext = async () => {
        // songController("next");
        await TrackPlayer.skipToNext();
    };
    // Previous button
    const skipToPrev = async () => {
        // songController("prev");
        await TrackPlayer.skipToPrevious();
    };
    return (
        <View>
            {true && <TouchableOpacity
                onPress={() => goAlbumPlayer()}
            >
                <View style={[styles.musicPlayer, styles.row]}>
                    <Image style={styles.image} source={track?.imageUri ? { uri: track?.imageUri } : require('../../assets/Images/Headphone.png')} />
                    <View style={styles.textLayout}>
                        <Text style={styles.title}>{track?.name}</Text>
                        <Text style={styles.subTitle}>{track?.description}</Text>
                    </View>
                    <View style={[styles.iconLayout, styles.row]}>
                        <TouchableOpacity onPress={() => skipToPrev()}>
                            <Icon
                                name="chevron-left" // favorite
                                type="font-awesome"
                                iconStyle={styles.prevIcon}
                                size={styles.prevIcon.fontSize}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPressIn={handlePressInPay}
                            onPressOut={handlePressOutPay}
                            onPress={() => togglePlayback(playBackState)} style={{ transform: [{ scale: playAnimation }] }}
                        >
                            <Icon
                                name={playBackState === State.Playing ? "pause" : "play-arrow"} // pause playBackState === State.Playing ? "pause" : "play-arrow"
                                // type="font-awesome-5"
                                iconStyle={styles.playPauseIcon}
                                containerStyle={{ alignItems: "center", justifyContent: "center", height: 45, width: 45, backgroundColor: Theme.PB1, }}
                                size={styles.playPauseIcon.fontSize}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => skipToNext()}>
                            <Icon
                                name="chevron-right" // favorite
                                type="font-awesome"
                                iconStyle={styles.nextIcon}
                                size={styles.nextIcon.fontSize}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>}
        </View>
    )
}

export default MusicInfo

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 60,
        borderRadius: 10
    },
    musicPlayer: {
        backgroundColor: Theme.BGB5,
        width: responsiveScreenWidth(90),
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
        padding: 5,
        borderRadius: 10,
        zIndex: 10,
        justifyContent: "space-between"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    textLayout: {
        marginHorizontal: 10,
        width: responsiveScreenWidth(44),
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
    playIcon: {
        fontSize: Theme.IH5,
        color: Theme.PB2
    },
    playPauseIcon: {
        color: Theme.BGB4,
        fontSize: Theme.IH5,
        textAlign: "center",
        borderRadius: 50,
    },
    prevIcon: {
        color: Theme.PB1,
        alignSelf: "flex-start",
        fontSize: Theme.IH5
    },
    nextIcon: {
        color: Theme.PB1,
        alignSelf: "flex-start",
        fontSize: Theme.IH5
    },
});