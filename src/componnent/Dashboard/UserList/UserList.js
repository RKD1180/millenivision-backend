import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundcolor: "#F5F4F4",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundcolor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserList = () => {
  const [usersList, setUserList] = useState([]);

  const userInfo = window.localStorage.getItem("userInfo")
    ? JSON.parse(window.localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    fetch(`https://safe-journey-75946.herokuapp.com/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data.user);
      });
  }, [userInfo.user.token]);
  const navigate = useNavigate()  
  const userInfobee = localStorage?.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
  useEffect(() => {
    if (!userInfobee?.user) {
      navigate('/')
    }
  }, [userInfobee?.user])
  return (
    <TableContainer component={Paper}>
      <Box sx={{ backgroundcolor: "#F5F4F4" }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: 19,
              color: "#33594A",
              pt: 3,
              pl: 2,
            }}
          >
            User List
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "black",
              textTransform: "capitalize",
              mr: 3,
              mt: -4,
              mb: 3,
            }}
            color="error"
          >
            Total {usersList.length} User
          </Button>
        </Box>
      </Box>
      <Table
        sx={{ minWidth: 700, backgroundcolor: "#F5F4F4" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ color: "#33594A" }}>
              User Profile
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A" }}>
              User Name
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 69 }}>
              Email
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 31 }}>
              Phone
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                <img src={row.pic} style={{ height: 30, width: 30 }} alt="" />
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#DD502C" }}>
                {row.first_name} {row.last_name}
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#565555" }}>
                {row.email}
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#565555" }}>
                {row.phone}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
