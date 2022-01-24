import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Alert, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../img/logo.png";

const Login = () => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...userData };
    newData[field] = value;
    setUserData(newData);
  };

  const handleLoginSubmit = (e) => {
    const { email, password } = userData;

    e.preventDefault();

    if (email && password) {
      fetch("https://safe-journey-75946.herokuapp.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user?.token) {
            window.location.replace("/dashboard");
            localStorage.setItem("userInfo", JSON.stringify(data));
          } else {
            setError(data.error);
          }
        });
    }
  };

  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo")
      ? JSON.parse(window.localStorage.getItem("userInfo"))
      : null;
    if (userInfo?.user?.token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              fontSize: 30,
              fontWeight: 600,
              pt: 5,
              pl: 4,
              mb: 3,
              mt: 10,
              ml: 5,
            }}
          >
            <img src={logo} alt="" />
          </Box>

          {/* login form */}

          <Box sx={{ ml: 5, pl: 5 }}>
            <form onSubmit={handleLoginSubmit}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  mb: 1,
                  color: "#78746D",
                  ml: 1,
                }}
              >
                Email
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type={"email"}
                onBlur={handleOnBlur}
                name="email"
                sx={{ width: "75%", borderRadius: 32 }}
                size="small"
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  mb: 1,
                  color: "#78746D",
                  ml: 1,
                  mt: 1,
                }}
              >
                Password
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                onBlur={handleOnBlur}
                name="password"
                type={"password"}
                sx={{ width: "75%" }}
                size="small"
              />
              <Box sx={{ display: "flex" }}>
                <Grid md={6}>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        mb: 1,
                        color: "#78746D",
                        pl: 1,
                        mt: 1,
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  </Link>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ backgroundcolor: "#33594A", marginLeft: 1 }}
                  >
                    Log in
                  </Button>
                  {error && (
                    <Alert sx={{ mt: 4 }} severity="error">
                      {error}
                    </Alert>
                  )}
                </Grid>
                <Grid md={6} sx={{ mt: 2, ml: 3 }}></Grid>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 15,
                  fontWeight: 600,
                  mb: 1,
                  color: "#DD502C",
                  ml: 1,
                  mt: 8,
                }}
              >
                Not Register?
              </Typography>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 15,
                    fontWeight: 400,
                    mb: 1,
                    color: "#78746D",
                    ml: 1,
                    mt: 1,
                  }}
                >
                  If you have not already registered,
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 15,
                    fontWeight: 400,
                    mb: 1,
                    color: "#78746D",
                    ml: 1,
                    mt: 1,
                  }}
                >
                  please register first
                </Typography>
              </Link>
            </form>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ background: "#FFEDE1", height: "100vh" }}
        >
          <Grid xs={12} sx={{ mt: 20, ml: 10 }}>
            <img src={logo} alt="" style={{ width: 216, height: 64 }} />
          </Grid>
          <Grid xs={12} sx={{}}>
            <Typography
              variant="h6"
              sx={{
                fontSize: 30,
                fontWeight: 400,
                mb: 1,
                color: "#DD502C",
                ml: 10,
                mt: 1,
              }}
            >
              Welcome Back !
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: 15,
                fontWeight: 600,
                mb: 1,
                color: "#948A83",
                ml: 10,
                mt: 1,
              }}
            >
              Please login to enter the admin panel.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
