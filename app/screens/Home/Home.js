import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Theme from "../../theme/Theme";
import { Avatar } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import Loader2 from "../../components/loader/loader";
import MusicInfo from "../MusicInfo/MusicInfo";
import { setSelectedSongIndex } from "../../slices/musicPlayer/musicPlayer";

const Home = () => {

    const navigation = useNavigation();

    const goToAlbumScreen = () => {
        // navigation.navigate("AlbumScreen")
        navigation.navigate("ShowFullSongList", { });
    }

    return (
        <View style={styles.mainView}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
                <Avatar
                    size={42}
                    rounded
                    title="AK"
                    containerStyle={{ backgroundColor: Theme.PB1 }}
                />
                <Text style={styles.mainHeading}>Good Morning</Text>
                <Icon name="user-alt" type="font-awesome-5" color="white" />
            </View>
            <View style={styles.quotelayout}>
                <Text style={styles.quote}>“Music is the language of the soul, and love is the melody that fills our hearts.”
                </Text>
                <Text style={styles.auther}> - Unknown</Text>
            </View>
            <View style={[styles.row, { justifyContent: "space-between", marginVertical: 10 }]}>
                <TouchableOpacity onPress={() => goToAlbumScreen()}>
                    <View style={styles.topAlbum}>
                        <Image style={styles.topAlbumImage} source={require("../../assets/Images/album1.jpg")} />
                        <View style={styles.topAlbumTitlelayout}>
                            <Text style={styles.albumTitle}>Linked Songs</Text>
                            <Text style={styles.albumSubTitle}>180 songs</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToAlbumScreen()}>
                    <View style={styles.topAlbum}>
                        <Image style={styles.topAlbumImage} source={require("../../assets/Images/album2.jpg")} />
                        <View style={styles.topAlbumTitlelayout}>
                            <Text style={styles.albumTitle}>Last Seach SongList</Text>
                            <Text style={styles.albumSubTitle}>SubTitle</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.row, { justifyContent: "space-between", marginVertical: 10 }]}>
                <TouchableOpacity onPress={() => goToAlbumScreen()}>
                    <View style={styles.topAlbum}>
                        <Image style={styles.topAlbumImage} source={require("../../assets/Images/album3.jpg")} />
                        <View style={styles.topAlbumTitlelayout}>
                            <Text style={styles.albumTitle}>Album Title1</Text>
                            <Text style={styles.albumSubTitle}>SubTitle</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToAlbumScreen()}>
                    <View style={styles.topAlbum}>
                        <Image style={styles.topAlbumImage} source={require("../../assets/Images/album4.jpeg")} />
                        <View style={styles.topAlbumTitlelayout}>
                            <Text style={styles.albumTitle}>Album Title1</Text>
                            <Text style={styles.albumSubTitle}>SubTitle</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <Loader2/>
            <ScrollView>
                <View>
                    <Text style={styles.bottumPlayListTitile}>Recently Played</Text>
                    <View style={styles.row}>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album1.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album2.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album3.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album4.jpeg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.bottumPlayListTitile}>Mostly Played</Text>
                    <View style={styles.row}>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album1.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album2.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album3.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album4.jpeg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.bottumPlayListTitile}>Last Played</Text>
                    <View style={styles.row}>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album1.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album2.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album3.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album4.jpeg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.bottumPlayListTitile}>Recently Played</Text>
                    <View style={styles.row}>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album1.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album2.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album3.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album4.jpeg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.bottumPlayListTitile}>Recently Played</Text>
                    <View style={styles.row}>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album1.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album2.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album3.jpg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                        <View style={styles.bottumAlbum}>
                            <Image style={styles.bottumAlbumImage} source={require("../../assets/Images/album4.jpeg")} />
                            <Text style={styles.bottumAlbumTitle}>96 Tamil</Text>
                            <Text style={styles.bottumAlbumSubTitle}>Languag - Artist</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <MusicInfo/>
        </View>
    );
};

export default Home;

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
    quotelayout:{
        height:responsiveScreenHeight(20), 
        backgroundColor:Theme.BGB2, 
        borderRadius: 10, 
        marginVertical: 20,
        padding: 10,
        justifyContent:"space-between"
    },
    quote: {
        fontSize: Theme.H3,
        fontWeight: "400",
        color: Theme.TW1,
        textAlign: "center",
        borderRadius: 10,
        marginRight: 10,
        marginTop: 30,
        paddingTop: 3,
        marginBottom: 20,
        fontStyle:"italic"
    },
    auther: {
        fontSize: Theme.H3,
        fontWeight: "400",
        color: Theme.TW1,
        textAlign: "right",
        borderRadius: 10,
        marginRight: 10,
        paddingTop: 3,
        bottom:20
    },
    firstLayout: {

    },
    row: {
        flexDirection: "row", alignItems: "center"
    },
    topAlbumTitlelayout: {
        marginLeft: 10
    },
    albumTitle: {
        fontSize: Theme.H4,
        color: Theme.TW4,
        width:responsiveScreenWidth(25)
    },
    albumSubTitle: {
        fontSize: Theme.H5,
        color: Theme.TW4
    },
    topAlbumLayout: {
        flexDirection: "row",
        // alignItems:"center",
        // textAlign:"center",
    },
    topAlbum: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: Theme.BGB2,
        borderRadius: 10,
        width: responsiveScreenWidth(43)
    },
    topAlbumImage: {
        height: 60,
        width: 60,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    bottumPlayListTitile: {
        fontSize: Theme.H3,
        color: Theme.TW4,
        marginTop: 10,
        marginBottom: 10
    },
    bottumAlbumImage: {
        height: 100,
        width: responsiveScreenWidth(25),
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
    }
});
