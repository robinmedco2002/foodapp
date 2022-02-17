import React, {useState} from "react";
import {Button, Grid, Link, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {makeLogin, selectUser} from "../../Slices/UserSlice";
import {Redirect, useHistory} from "react-router-dom";
import _ from "lodash";

const useStyles = makeStyles(() => ({
    login: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    paper: {
        width: "550px",
        height: "400px"
    }
}));

export default function Login() {
    const classes = useStyles();
    const isAuthenticated = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [params, setParams] = useState([]);
    const login = async () => {
        try {
            const user = await dispatch(makeLogin(params));
            if (user?.role.slug === "super-admin")
                history.push("/admin/dashboard");
            else if (user?.role.slug === "chef")
                history.push("/chef/dashboard");

        } catch (e) {
            console.log(e);
        }
    };
    const paramChange = (e) => {
        const {name, value} = e.target;
        setParams(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const loginToken = localStorage.getItem("login_token");
    if (!(_.isEmpty(isAuthenticated)) && loginToken) {
        return <Redirect to='/admin/dashboard'/>;
    }
    return (
        <Grid container>
            <Grid item xs={12} md={12} className={classes.login}>
                <Paper elevation={0} className={classes.paper} component="form" onSubmit={e => {
                    e.preventDefault();
                    login();
                }}>
                    <Grid item xs={12} className="p-5 p-5-all">
                        <Grid item style={{textAlign: "center"}}>
                            <Typography component="h1" variant="h5">
                                Sign in your account
                            </Typography>
                        </Grid>
                        <Grid item className="mt-3">
                            <Typography>Mobile</Typography>
                            <TextField
                                placeholder="Enter Mobile"
                                variant="outlined"
                                fullWidth
                                name="mobile"
                                value={params?.mobile}
                                onChange={paramChange}
                            />
                        </Grid>
                        <Grid item className="mt-3">
                            <Typography>Password</Typography>
                            <TextField
                                placeholder="Enter Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                name="password"
                                value={params?.password}
                                onChange={paramChange}
                            />
                        </Grid>
                        <Grid item container className="mt-3">
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item className="mt-3">
                            <Button
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}