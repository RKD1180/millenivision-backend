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

const Event = () => {
  const [eventList, setEventList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const userInfo = window.localStorage.getItem("userInfo")
    ? JSON.parse(window.localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://safe-journey-75946.herokuapp.com/api/events/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.user.token}`, //requerd
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEventList(data.event);
      });
    setIsLoading(false);
  }, [userInfo.user.token]);
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
            Event
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
            Total {eventList.length} Event
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
              Profile
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A" }}>
              Event Name
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A" }}>
              Community
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 69 }}>
              Email
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 8 }}>
              Total Event
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventList.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                <img
                  src={row.event_image}
                  style={{ height: 30, width: 30 }}
                  alt=""
                />
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#DD502C" }}>
                {row.event_name} <br />
                <span style={{ color: "#8D8D8D" }}>
                  {row.createdAt.slice(0, 10)}
                </span>
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#565555", pl: 4 }}>
                {row.list_of_communities.length}
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#565555" }}>
                test@example.com
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#565555" }}>
                {row?.join_people?.totalMember}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Event;
