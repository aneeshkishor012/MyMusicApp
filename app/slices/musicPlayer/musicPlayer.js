import { createSlice, current } from "@reduxjs/toolkit";

// function getSongListWithPlayListId(id){
//     const { selPlayListResults, selPlayListLoading, selPlayListError } = useGetPlayListWithId(id);

//     console.log("======================================================================================================");
//     console.log("selPlayListResults :: ",selPlayListResults);
//     console.log("======================================================================================================");
// }


const initialState = {
    isPlaying: false,
    selectedSongIndex: 0,
    currentTrackList: [],
    currentPlayingTrack: {},
    selectedAlbumListObj:{},
    selectedPlayListSongs: [],
    selectedAlbumType :"",
    lastSearchList: {
        songList: [],
        playList: [],
        albumList: [],
        artistList: [],
        showListType: ""
    }
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        isMusicPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setSelectedSongIndex: (state, action) => {
            state.selectedSongIndex = action.payload;
        },
        setCurrentTrackList: (state, action) => {
            state.currentTrackList = action.payload;
        },
        setCurrentPlayingTrack: (state, action) => {
            state.currentPlayingTrack = action.payload;
        },
        setCurrentPlayingTrack: (state, action) => {
            state.currentPlayingTrack = action.payload;
        },
        setLastSearch: (state, action) => {
            state.lastSearchList.showListType = action.payload?.showListType?.length ? action.payload?.showListType : "";
            state.lastSearchList.songList = Array.isArray(action.payload?.songList) ? action.payload.songList : [];
            state.lastSearchList.playList = Array.isArray(action.payload?.playList) ? action.payload.playList : [];
            state.lastSearchList.albumList = Array.isArray(action.payload?.albumList) ? action.payload.albumList : [];
            state.lastSearchList.artistList = Array.isArray(action.payload?.artistList) ? action.payload.artistList : [];
        },
        setSelectedPlayList:(state, action) => {
            state.selectedAlbumListObj = Object.keys(action.payload).length ? action.payload : {};
        }
    }
})

export const { isMusicPlaying, setSelectedSongIndex, setCurrentTrackList, setCurrentPlayingTrack, setLastSearch, setSelectedPlayList } = playerSlice.actions

export default playerSlice.reducer