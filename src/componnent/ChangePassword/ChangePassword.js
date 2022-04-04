import React, { useState } from "react";
import { Container, Grid, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { getLocalStorage } from "../../Hooks/useStorage";
import Alert from "@mui/material/Alert";
import { setLocalStorageWithExpiry } from "./../../Hooks/useStorage";

const useStyles = makeStyles({
  label: {
    color: "#979797",
  },
});

const ChangePassword = () => {
  const classes = useStyles();
  const [userPassword, setUserPassword] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userInfo = getLocalStorage("userInfo");

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...userPassword };
    newData[field] = value;
    setUserPassword(newData);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    const { oldPassword, password, password2 } = userPassword;

    if (oldPassword && password && password2) {
      fetch("https://millenivision.herokuapp.com/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo?.user?.token}`,
        },
        body: JSON.stringify({
          oldPassword,
          password,
          password2,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user?._id) {
            setLocalStorageWithExpiry("userInfo", data?.user, 30);
            setSuccess(data?.message);
            window.location.reload();
          }
          if (data?.error) {
            setError(data?.error);
          }
        });
    }
  };
  return (
    <Container maxWidth="md">
      <Box sx={{ maxWidth: 800 }}>
        <Grid item xs={12} md={8} sx={{ textAlign: "center" }}>
          <h2>Change Password</h2>
          <form onSubmit={handlePassword}>
            <Grid item sx={{ textAlign: "left" }}>
              <p className={classes.label}>Old Password</p>
              <TextField
                id="outlined-basic"
                type={"password"}
                variant="outlined"
                size="small"
                name="oldPassword"
                onBlur={handleOnBlur}
                sx={{ width: "75%" }}
              />
            </Grid>
            <Grid item sx={{ textAlign: "left" }}>
              <p className={classes.label}>New Password</p>
              <TextField
                id="outlined-basic"
                type={"password"}
                variant="outlined"
                size="small"
                onBlur={handleOnBlur}
                name="password"
                sx={{ width: "75%" }}
              />
            </Grid>
            <Grid item sx={{ textAlign: "left" }}>
              <p className={classes.label}>Confirm New Password</p>
              <TextField
                id="outlined-basic"
                type={"password"}
                variant="outlined"
                size="small"
                onBlur={handleOnBlur}
                name="password2"
                sx={{ width: "75%" }}
              />
            </Grid>
            <Grid item sx={{ textAlign: "left", mt: 4 }}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "75%", backgroundColor: "#33594A" }}
                type="submit"
              >
                Update Password
              </Button>
            </Grid>
          </form>
          {error && (
            <Alert severity="error" sx={{ width: "75%", mt: 4 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ width: "75%", mt: 4 }}>
              {success}
            </Alert>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ChangePassword;
