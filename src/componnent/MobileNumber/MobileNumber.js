import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MessageIcon from "@mui/icons-material/Message";
import { Typography } from "@mui/material";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Alert from "@mui/material/Alert";

const ariaLabel = { "aria-label": "description" };

const MobileNumber = () => {
  const [countryCode, setCountryCode] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = (e) => {
    fetch("https://safe-journey-75946.herokuapp.com/users/send-otp", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        countryCode: countryCode,
        number: number,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setError(true);
        setMessage(data.error);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ margin: "0 auto", mr: 2, mt: 12 }}>
          <MessageIcon fontSize="large" sx={{ color: "#33594A" }} />
        </Grid>

        <Grid item xs={12} md={6} sx={{ margin: "0 auto", mr: 16 }}>
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontSize: 32, fontWeight: 600, color: "#424851" }}
          >
            Mobile Verification
          </Typography>
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontSize: 18, mt: 1, fontWeight: 600, color: "#949494" }}
          >
            Click Button For Get The OTP
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 3, width: 300 }}>
              {message}
            </Alert>
          )}
          <Grid item xs={12} md={6} sx={{ ml: 12 }}>
            <Button
              variant="contained"
              sx={{ mt: 5, borderRadius: 28, p: 2, backgroundColor: "#33594A" }}
              color="success"
              onClick={handleSubmit}
            >
              <ArrowForwardIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MobileNumber;
