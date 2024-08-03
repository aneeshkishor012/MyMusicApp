import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    hideIntro: false
}

export const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        hideIntroSlides: (state, action) => {
            console.log("Store :: hideIntroSlides");
            state.hideIntro = action.payload;
        }
    }
})

export const { hideIntroSlides } = appConfigSlice.actions

export default appConfigSlice.reducer