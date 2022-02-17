import React from "react";
import Routes from "./Routes";
import {CrudProvider} from "@crud/react";
import {AlertDialog, ConfirmDialog, NotifySnackbar, ProgressIndicator, PromptDialog} from "react-material-crud";
import {$crud} from "./factories/CrudFactory";
import {persistor, store} from "./store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import './App.css';
import './scss/style.scss';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";

export function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CrudProvider crud={$crud}>
                        <ProgressIndicator/>
                        <Routes/>
                        <NotifySnackbar autoHideDuration={2000}/>
                        <AlertDialog/>
                        <PromptDialog/>
                        <ConfirmDialog/>
                    </CrudProvider>
                </MuiPickersUtilsProvider>
            </PersistGate>
        </Provider>
    );
}
