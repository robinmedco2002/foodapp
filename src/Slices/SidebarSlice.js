import {createSlice} from '@reduxjs/toolkit';

export const SidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        sidebarShow: 'responsive'
    },
    reducers: {
        set: (state, action) => {
            state.sidebarShow = action.payload;
        },
    },
});

export const showSidebar = params => async dispatch => {
    dispatch(set(params));
};
export const selectSidebar = state => state.sidebar.sidebarShow;

export const {set} = SidebarSlice.actions;
export default SidebarSlice.reducer;
