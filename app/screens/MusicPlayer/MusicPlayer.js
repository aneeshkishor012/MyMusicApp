import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { Icon, Image } from '@rneui/base'
import Theme from '../../theme/Theme'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import MusicInfo from '../MusicInfo/MusicInfo'
import { addTrack, setupPlayer } from "../../services/musicPlayerServices";
import TrackPlayer, { Event, State, Track, usePlaybackState, useProgress, useTrackPlayerEvents, } from "react-native-track-player";
import { useAppSelector } from '../../hooks'
import { setCurrentPlayingTrack, setSelectedSongIndex } from '../../slices/musicPlayer/musicPlayer'
import { useDispatch } from 'react-redux'
import { Slider } from '@rneui/themed'
import debounce from 'lodash.debounce'

const MusicPlayer = (props) => {
  const { type, list, cameFrom } = props.route?.params?.data ?? { type: null, list: null, cameFrom: null };
  const currentSongIndex = useAppSelector(state => state.player.selectedSongIndex);
  const currentTrackList = useAppSelector(state => state.player.currentTrackList);
  const playBackState = usePlaybackState();
  const dispatch = useDispatch();

  const { position, duration } = useProgress();
  const [isSliding, setIsSliding] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isQueue, setIsQueue] = useState(false)
  const [track, setTrack] = useState(null);
  const navigation = useNavigation();



  const onSlidingStart = () => {
    setIsSliding(true);
  };


  const onSlidingComplete = useMemo(
    () => debounce((value) => {
      TrackPlayer.seekTo(value);
      setIsSliding(false);
    }, 80),
    []
  );

  useEffect(() => {
    const setup = async () => {
      const isSetup = await setupPlayer();
      // console.log("isSetup :: ", isSetup);
      if (isSetup) {
        console.log("playSong(currentTrackList[currentSongIndex]) :: ", isSetup);
        // only play new songs after selecting the song
        // it should not start new song if we Click on the PlayerComp
        playSong(currentTrackList[currentSongIndex]);
      }
    };

    setup();

    console.log("currentSongIndex :: ", currentSongIndex);
    setTrack(currentTrackList[currentSongIndex]);
  }, []);

  const playSong = async () => {
    await TrackPlayer.reset(); // Clear previous tracks
    await addTrack(currentTrackList);
    // Skip to a specific track index:
    await TrackPlayer.skip(currentSongIndex);

    await TrackPlayer.play();
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        const index = currentTrackList.findIndex(track => track.id === playingTrack.id);
        dispatch(setSelectedSongIndex(index));
        dispatch(setCurrentPlayingTrack(currentTrackList[index]));
        setTrack(playingTrack);
        break;
    }
  });

  const skipToNext = async () => {
    // songController("next");
    await TrackPlayer.skipToNext();
  };
  // Previous button
  const skipToPrev = async () => {
    // songController("prev");
    await TrackPlayer.skipToPrevious();
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
  const handlePressFav = () => {
    Animated.spring(favAnimation, {
      toValue: 2,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutFav = () => {
    Animated.spring(favAnimation, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  const handlePressInQue = () => {
    Animated.spring(queueAnimation, {
      toValue: 2,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutQue = () => {
    Animated.spring(queueAnimation, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const goBack = () => {
    // if (cameFrom) {
    //   navigation.navigate(cameFrom);
    // } else {
    navigation.goBack();
    // }
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
        <View style={{ alignItems: "center", marginTop: responsiveScreenHeight(7) }}>
          <Image style={styles.albumImage} source={track?.imageUri  ? { uri: track?.imageUri } : require('../../assets/Images/Headphone.png')} />
        </View>
        <View style={styles.albumTexts}>
          <View>
            <Text style={styles.albumHeading}>{track?.name}</Text>
            <Text style={styles.albumDescription}>{`${track?.language}  ${track?.year}`}</Text>
            <Text style={styles.albumSubHeading}>{track?.description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.playerInfo}>
        <View style={{
          // padding: 20,
          width: responsiveScreenWidth(70),
          // justifyContent: 'center',
          // alignItems: 'stretch',
        }}>
          <Slider
            value={isSliding ? position : Math.min(position, duration)}
            minimumValue={0}
            maximumValue={duration}
            allowTouchTrack={true}
            trackStyle={{ height: 5, backgroundColor: 'transparent', color: "red" }}
            thumbStyle={{ height: 20, width: 20, backgroundColor: Theme.PB1 }}
            onValueChange={(value) => onSlidingComplete(value)}
          // onSlidingStart={onSlidingStart}
          // onSlidingComplete={onSlidingComplete}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {new Date(position * 1000).toISOString().substring(15, 19)}
          </Text>
          <Text style={styles.time}>
            {new Date((duration - position) * 1000).toISOString().substring(15, 19)}
          </Text>
        </View>

      </View>
      <View style={styles.mediaControlls}>

        <TouchableOpacity
          onPressIn={handlePressFav}
          onPressOut={handlePressOutFav}
          onPress={() => setIsFav((prev) => !prev)}
          style={{ transform: [{ scale: favAnimation }] }}
        >
          <Icon
            color={styles.favIcon.color}
            style={styles.favIcon}
            name={isFav ? "favorite" : "favorite-border"}
            size={30}
          />
        </TouchableOpacity>



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
            containerStyle={{ alignItems: "center", justifyContent: "center", height: 65, width: 65, backgroundColor: Theme.PB1, }}
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

        <TouchableOpacity
          onPressIn={handlePressInQue}
          onPressOut={handlePressOutQue}
          onPress={() => setIsQueue((prev) => !prev)}
          style={{ transform: [{ scale: queueAnimation }] }}
        >
          <Icon
            name={isQueue ? "repeat" : "repeat-one"} //repeat-one, repeat-off
            iconStyle={styles.playOrderIcon}
            size={styles.playOrderIcon.fontSize}
          />
        </TouchableOpacity>


      </View>
    </View>

  )
}

export default MusicPlayer

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
    height: responsiveScreenHeight(30),
    width: responsiveScreenHeight(30),
    borderRadius: 10,
    marginBottom: 10
  },
  albumTexts: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveScreenHeight(5)
  },
  albumHeading: {
    color: Theme.TW1,
    fontSize: Theme.H1,
    textAlign: "center"
  },
  albumDescription: {
    color: Theme.BGW5,
    fontSize: Theme.H3,
    textAlign: "center"
  },
  albumSubHeading: {
    color: Theme.BGW5,
    fontSize: Theme.H4,
    textAlign: "center"
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
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  timeContainer: {
    width: responsiveScreenWidth(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
  playerInfo: {
    // justifyContent: "center",
    alignItems: "center"
  },
  mediaControlls: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginTop: responsiveScreenHeight(5)
  },
  favIcon: {
    color: Theme.PB1,
    alignSelf: "flex-start",
    fontSize: Theme.IH5
  },
  prevIcon: {
    color: Theme.PB1,
    alignSelf: "flex-start",
    fontSize: Theme.IH5
  },
  playPauseIcon: {
    // color:Theme.BGW3,
    fontSize: Theme.IH3,
    textAlign: "center",
    borderRadius: 50,
    // alignSelf:"center"
  },
  nextIcon: {
    color: Theme.PB1,
    alignSelf: "flex-start",
    fontSize: Theme.IH5
  },
  playOrderIcon: {
    color: Theme.PB1,
    alignSelf: "flex-start",
    fontSize: Theme.IH5
  }
})