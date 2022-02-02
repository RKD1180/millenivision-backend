import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MessageIcon from "@mui/icons-material/Message";
import { Typography } from "@mui/material";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const ariaLabel = { "aria-label": "description" };

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = () => {
    const userInfo = localStorage?.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    fetch("https://safe-journey-75946.herokuapp.com/admin-otp-verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo?.user?.token}`,
      },
      body: JSON.stringify({ otp }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          setMessage(data.error);
        } else {
          navigate("/dashboard");
        }
      });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ margin: "0 auto", mr: 2, mt: 12 }}>
          <MessageIcon fontSize="large" sx={{ color: "#33594A" }} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ margin: "0 auto", mr: 10 }}>
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontSize: 32, fontWeight: 600, color: "#424851", mr: 2 }}
          >
            Enter OTP
          </Typography>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              fontSize: 15,
              mt: 2,
              mr: 2,
              fontWeight: 400,
              color: "#949494",
              paddingRight: 53,
            }}
          >
            We have sent you access code Via SMS for mobile verification
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ margin: "0 auto", mr: 4 }}>
          <Grid item xs={12} md={6}>
            <Input
              sx={{ mt: 3, width: 90 }}
              placeholder="55555"
              inputProps={ariaLabel}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Grid>
          {error && (
            <Alert severity="error" sx={{ mt: 3, width: 300, ml: -5 }}>
              {message}
            </Alert>
          )}
          <Grid item xs={12} md={6} sx={{ ml: 1 }}>
            <Button
              variant="contained"
              sx={{ mt: 5, borderRadius: 28, p: 2, backgroundColor: "#33594A" }}
              color="success"
              onClick={handleSubmit}
            >
              <ArrowForwardIcon />
            </Button>

            <Typography
              variant="h4"
              component="h4"
              sx={{
                fontSize: 15,
                mt: 2,
                ml: -5,
                fontWeight: 400,
                color: "#949494",
              }}
            >
              Didn’t Receive the OTP?
            </Typography>
            <Button
              variant="text"
              sx={{ ml: -3, fontSize: 15, fontWeight: 600 }}
              color="success"
            >
              Resend Code
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Otp;
