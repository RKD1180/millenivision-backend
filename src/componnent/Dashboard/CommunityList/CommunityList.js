/* eslint-disable react-hooks/exhaustive-deps */
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
import CircularProgress from "@mui/material/CircularProgress";

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

const CommunityList = () => {
  const [pageCount, setPageCount] = useState(0);
  const limit = 10;
  const [page, setPage] = useState(1)
  const [eventList, setEventList] = useState([]);
  const [inputUser] = useState("");//setInputUser
  
  const [totalEvents, setTotalEvents] = useState("");
  const userInfo = window.localStorage.getItem("userInfo")
    ? JSON.parse(window.localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    let seraching = inputUser || ''
    fetch(`https://millenivision.herokuapp.com/api/community-events/allEvents?search=${seraching}&&page=${page}&&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.user.token}`, //requerd
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.communityEvent) {
          setPageCount(Math.ceil(data?.count / limit));
          setTotalEvents(data.totalEvents)
          setEventList(data.communityEvent);
        }
      });
  }, [userInfo.user.token]);
  const navigate = useNavigate();
  const userInfobee = localStorage?.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  useEffect(() => {
    if (!userInfobee?.user) {
      navigate("/login");
    }
  }, [userInfobee?.user]);
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
            Community List
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
            Total {totalEvents} Event
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
              Total Event
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A" }}>
              Community
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A" }}>
              Leader Email
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A" }}>
              Total Member
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventList.length === 0 ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", ml: 50, p: 2 }}
            >
              <CircularProgress color="success" />
            </Box>
          ) : (
            <>
              {eventList?.map((row) => (
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
                    {row?.list_of_communities?.length}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "#565555" }}>
                    {row?.user?.email}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "#565555" }}>
                    {row?.join_people?.length}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
      <div className="pagination">
        {/* {console.log(pageCount)} */}
        {
          [...Array(pageCount).keys()].map((number => <button key={number + 1}
            className={number + 1 === page ? 'activeSelect' : ''}
            onClick={() => setPage(number + 1)}
          >{number + 1}
          </button>))
        }
      </div>
    </TableContainer>
  );
};

export default CommunityList;
