import React from "react";
import { Box, Container, Grid, Paper } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { makeStyles } from "@mui/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const useStyles = makeStyles({
  userBtn: {
    padding: "10px 20px 10px 20px",
    border: "none",
    color: "white",
    fontWeight: "700",
    backgroundColor: "#DD502C",
    borderRadius: 5,
  },
  text1: {
    fontWeight: 700,
    fontSize: 15,
    color: "#444444",
  },
  text2: {
    fontWeight: 400,
    fontSize: 13,
    color: "#444444",
  },
  text3: {
    fontWeight: 700,
    fontSize: 15,
    color: "#33594A",
  },
  time: {
    fontWeight: 600,
    fontSize: 13,
    color: "#BBBBBB",
    display: "flex",
  },
});

const Notificaton = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Box sx={{ maxWidth: 800 }}>
        <Paper elevation={3} sx={{ backgroundColor: "#F5F4F4", p: 3 }}>
          <h2>Notifications</h2>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={4} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={2} sx={{ pr: 2 }}>
                  <DisabledByDefaultIcon
                    sx={{
                      color: "#C9C9C9",
                      fontSize: 35,
                      transition: ".2s",
                      "&:hover": {
                        color: "#d61a04",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <button className={classes.userBtn}>New User</button>
                  <p className={classes.text1}>
                    New Registration:Finibus et Malorum{" "}
                  </p>
                  <p className={classes.text2}>
                    Sed Ut perspicatis unde omis iste natus erro sit voluptatem
                    accusantium doloremque .
                  </p>
                  <p className={classes.text3}>Allen Deu</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <div className={classes.time}>
                <span style={{ marginTop: 10, marginRight: 5 }}>
                  <AccessTimeIcon />
                </span>
                <p>1 Apr 2022 at 12:03 pm</p>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={4} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={2} sx={{ pr: 2 }}>
                  <DisabledByDefaultIcon
                    sx={{
                      color: "#C9C9C9",
                      fontSize: 35,
                      transition: ".2s",
                      "&:hover": {
                        color: "#d61a04",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <button className={classes.userBtn}>New User</button>
                  <p className={classes.text1}>
                    New Registration:Finibus et Malorum{" "}
                  </p>
                  <p className={classes.text2}>
                    Sed Ut perspicatis unde omis iste natus erro sit voluptatem
                    accusantium doloremque .
                  </p>
                  <p className={classes.text3}>Allen Deu</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <div className={classes.time}>
                <span style={{ marginTop: 10, marginRight: 5 }}>
                  <AccessTimeIcon />
                </span>
                <p>1 Apr 2022 at 12:03 pm</p>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Notificaton;
