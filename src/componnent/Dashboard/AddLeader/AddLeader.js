import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";

import { Divider } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "133rem",
//   left: "41%",
//   transform: "translate(-50%, -50%)",
//   width: 450,
//   bgcolor: "background.paper",
//   borderRadius: 2,
//   boxShadow: 24,
//   p: 4,
//   marginTop: 165,
// };

const AddLeader = ({ open, handleClose }) => {
  const [userList, setUserList] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [inputUser, setInputUser] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = window.localStorage.getItem("userInfo")
    ? JSON.parse(window.localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://safe-journey-75946.herokuapp.com/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserList(data.user));

    setIsLoading(false);
  }, [userInfo?.user?.token, isLoading]);

  const handleMakeAdmin = (email) => {
    fetch(`https://safe-journey-75946.herokuapp.com/users/makeAdmin/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo?.user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setSuccess(true);
        }
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://safe-journey-75946.herokuapp.com/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.user.token}`, //requerd
      },
    })
      .then((res) => res.json())
      .then((data) => setSearchUser(data.user));

    setIsLoading(false);
  }, [userInfo?.user?.token, isLoading]);

  if (searchUser) {
    const filterUser = searchUser.filter(
      (user) => user.includes(user.name?.toString()) === inputUser.toString()
    );
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        // sx={{ border: "none", overflow: "scroll" }}
      >
        <Box style={{ padding: "30px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{ fontSize: 15, textTransform: "capitalize" }}
              variant="text"
            >
              Cancel
            </Button>
            <Typography
              variant="h6"
              sx={{ fontSize: 17, fontWeight: 600 }}
              component="h6"
            >
              Add Leader
            </Typography>
            <Button
              sx={{ fontSize: 15, textTransform: "capitalize" }}
              variant="text"
            >
              Confirm
            </Button>
          </Box>
          <Paper
            elevation={3}
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              mt: 2,
            }}
          >
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => setInputUser(e.target.value)}
            />
          </Paper>
          <Typography
            variant="h6"
            sx={{ fontSize: 12, fontWeight: 400, color: "#7D7D7D", mt: 2 }}
            component="h6"
          >
            SUGGESTED
          </Typography>
          {success && <Alert severity="success">Admin Make Successfully</Alert>}
          {userList.map((user) => (
            <>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Box sx={{ justifyContent: "flex-start", display: "flex" }}>
                  <img src={user.pic} height={40} width={40} alt="" />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#DD502C",
                      mt: 2,
                      ml: 2,
                    }}
                    component="h6"
                  >
                    {user.first_name} {user.last_name}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ borderRadius: 10, textTransform: "capitalize" }}
                    onClick={() => handleMakeAdmin(user.email)}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ mt: 1 }} />
            </>
          ))}
        </Box>
      </Dialog>
    </div>
  );
};

export default AddLeader;
