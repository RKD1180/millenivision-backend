import React from "react";
import { Box, Button, Container, Grid, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { getLocalStorage } from "../../Hooks/useStorage";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = getLocalStorage("userInfo");

  return (
    <Container maxWidth="md">
      <Box sx={{ maxWidth: 800 }}>
        <Paper elevation={3} sx={{ backgroundColor: "#F5F4F4", p: 3 }}>
          <Grid
            container
            spacing={2}
            sx={{ borderBottom: "1px solid #A8A8A8" }}
          >
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={4} sx={{ pr: 2 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={user?.user?.pic}
                    sx={{ width: 124, height: 124 }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <h2>
                    {user?.user?.first_name}{" "}
                    {user?.user?.last_name === "null"
                      ? ""
                      : user?.user?.last_name}
                  </h2>
                  <p style={{ color: "#7C7C7C" }}>{user?.user?.email}</p>
                  <p style={{ color: "#1999DC" }}>
                    {user?.user?.isAdmin === true ? "Admin" : "User"}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Link
                to="/dashboard/changepassword"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ color: "black" }}
                >
                  Change Password
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid>
            <h2 style={{ color: "#555555" }}>Account</h2>
            <Box>
              <form>
                <Box sx={{ display: "flex" }}>
                  <h4 style={{ color: "#848484" }}>Username</h4>
                  <TextField
                    id="outlined-basic"
                    value={`${user?.user?.first_name} ${
                      user?.user?.last_name === "null"
                        ? ""
                        : user?.user?.last_name
                    }`}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      ml: 7,
                      mt: 1.5,
                      width: "75%",
                      "&:active": {
                        borderColor: "black",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <h4 style={{ color: "#848484" }}>Email</h4>
                  <TextField
                    id="outlined-basic"
                    value={user?.user?.email}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      ml: 11,
                      mt: 1.5,
                      width: "75%",
                      "&:active": {
                        borderColor: "black",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <h4 style={{ color: "#848484" }}>Phone Number</h4>
                  <TextField
                    id="outlined-basic"
                    value={user?.user?.phone}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      ml: 2.5,
                      mt: 1.5,
                      width: "75%",
                      "&:active": {
                        borderColor: "black",
                      },
                    }}
                  />
                </Box>
              </form>
            </Box>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
