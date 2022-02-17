import {createSlice} from '@reduxjs/toolkit';
import {$crud} from "../factories/CrudFactory";
import {LOGIN_TOKEN} from "../constants";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const {setUser} = UserSlice.actions;
export const makeLogin = params => async dispatch => {
    const {data} = await $crud.post("login", params);
    if (data.type === LOGIN_TOKEN) {
        localStorage.setItem("login_token", data.token);
        dispatch(setUser(data.user));
        return data.user;
    }
};

export const makeLogout = params => async dispatch => {
    await $crud.post("logout");
    localStorage.removeItem("login_token");
    dispatch(setUser({}));
};

export const retrieve = params => async dispatch => {
    try {
        const {data: {user}} = await $crud.get("retrieve/admin/user", params);
        dispatch(setUser(user));
        return user;
    } catch (e) {
        dispatch(setUser({}));
    }
}
export const hasRole = params => state => {
    return state.user && state.user.user.role && state.user.user.role.slug === params;
};
export const selectUser = state => state.user.user;
export default UserSlice.reducer;
