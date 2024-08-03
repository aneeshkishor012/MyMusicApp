import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Theme from '../../theme/Theme'
import { Button, Icon, Slider } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { hideIntroSlides } from '../../slices/appConfig/appConfig'
import { useAppSelector } from '../../hooks'
import { isMusicPlaying } from '../../slices/musicPlayer/musicPlayer'


const Introduction = () => {
  const hideIntro = useAppSelector((state) => state.appCofig.hideIntro);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const imageLink = "https://picsum.photos/seed/picsum/200/300";

  const description1 = "Modern music player focused on streaming from free source.";
  const description2 = "This app Needs Access to your External Storage to read your music.";
  const description3 = "Discover a world of music tailored to your tastes, anytime and free from interruptions";

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(hideIntroSlides(false));
    dispatch(isMusicPlaying(false));
    if (hideIntro) {
      navigation.navigate('App');
    }
  }, [])



  function launchApp() {
    dispatch(isMusicPlaying(true));
    dispatch(hideIntroSlides(true));
    navigation.navigate('App');
    setTimeout(()=>{
      setIndex(0);
    }, 500);
  }

  return (
    <View style={styles.mainlayout}>
      {
        index === 0 && <View>
          <Text style={styles.mainHeading}>WELCOME</Text>
          <View style={styles.imageLayout}>
            <Image
              source={require("../../assets/Images/Welcome-bro.png")}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.bottumlayout}>
            <Text style={styles.subHeading}>
              GETTING STARTED
            </Text>
            <Text style={styles.subTitle}>
              {description1}
            </Text>
            <View style={[styles.row, styles.buttonLayout]}>
              <Button
                radius={"sm"}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                onPress={() => setIndex((prev) => prev + 1)}
              >
                Start
                <Icon name="arrow-right" type='font-awesome-5' color={styles.buttonIconContainer.color} iconStyle={styles.buttonIconContainer} />
              </Button>
            </View>
          </View>
        </View>
      }
      {
        index === 1 && <View>
          <Text style={styles.mainHeading}>GRAND ACCESS</Text>
          <View style={styles.imageLayout}>
            <Image
              source={require("../../assets/Images/Filesearching-rafiki.png")}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.bottumlayout}>
            <Text style={styles.subHeading}>
              EXTERNAL STORAGE
            </Text>
            <Text style={styles.subTitle}>
              {description2}
            </Text>
            <View style={[styles.row, styles.buttonLayout]}>
              <Button
                radius={"sm"}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                onPress={() => setIndex((prev) => prev - 1)}
              >
                <Icon name="arrow-left" type="font-awesome-5" color="white" style={{ marginHorizontal: 5 }} />
                Back
              </Button>
              <Button
                radius={"sm"}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                onPress={() => setIndex((prev) => prev + 1)}
              >
                Allow
                <Icon name="unlock-alt" type='font-awesome-5' color="white" style={{ marginHorizontal: 5 }} />
              </Button>
            </View>
          </View>
        </View>
      }
      {
        index === 2 && <View>
          <Text style={styles.mainHeading}>READY</Text>
          <View style={styles.imageLayout}>
            <Image
              source={require("../../assets/Images/Boombox-bro.png")}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.bottumlayout}>
            <Text style={styles.subHeading}>
              LET'S GO
            </Text>
            <Text style={styles.subTitle}>
              {description3}
            </Text>
            <View style={[styles.row, styles.buttonLayout]}>
              <Button
                radius={"sm"}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                onPress={() => setIndex((prev) => prev - 1)}
              >
                <Icon name="arrow-left" type="font-awesome-5" color="white" style={{ marginHorizontal: 5 }} />
                Back
              </Button>
              <Button
                radius={"sm"}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                onPress={() => launchApp()}
              >
                Go to Home
                <Icon name="home" color="white" />
              </Button>
            </View>
          </View>
        </View>
      }
    </View>
  )
}

export default Introduction

const styles = StyleSheet.create({
  mainlayout: {
    flex: 1,
    padding: 20,
    // alignItems:"center",
    // justifyContent:"center",
    backgroundColor: Theme.BGB1
  },
  mainHeading: {
    color: Theme.TW1,
    fontSize: Theme.H1,
    fontWeight: "bold",
    fontFamily: 'Nunito-Black',
  },
  imageLayout: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  image: {
    height: 300,
    width: 300
  },
  subHeading: {
    fontSize: Theme.H2,
    color: Theme.TW5,
    marginTop: 20,
    fontWeight: "600"
  },
  subTitle: {
    fontSize: Theme.H4,
    color: Theme.TW5,
    textAlign: "right",
    marginTop: 20,
    marginBottom: 20
  },
  bottumlayout: {
    alignItems: "flex-end",
    margin: 20
  },
  buttonLayout: {
    marginTop: 120
  },
  buttonContainer: {
    backgroundColor: Theme.BGB1,
    marginTop: 20,
    marginLeft: 20
  },
  buttonStyle: {
    backgroundColor: Theme.PB1
  },
  row: {
    flexDirection: "row"
  },
  buttonIconContainer: {
    marginLeft: 10,
    fontSize: Theme.H4,
    color: Theme.BGW1
  }
})