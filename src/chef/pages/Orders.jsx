import React from "react";
import clsx from "clsx";
import {Container, CssBaseline, Grid, makeStyles, Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {height: 140,},
    screen: {width:"100%"}
}));

export default function Dashboard (){
    const classes = useStyles();

    return (
        <div className={classes.screen}>
            <CssBaseline/>
            <main>
                <Container maxWidth="lg">
                    <Grid container className={"p-2-all p-2"}>
                        <Grid item xs={12} md={12}>
                                <h3 style={{textAlign: "center"}}>Orders</h3>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
