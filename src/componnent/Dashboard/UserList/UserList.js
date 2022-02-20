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
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import './UserList.css'
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
  const [inputUser, setInputUser] = useState("");
  const [totalUser, setTotalUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [searchUser, setSearchUser] = useState([]);

  // const userInfo = window.localStorage.getItem("userInfo")
  //   ? JSON.parse(window.localStorage.getItem("userInfo"))
  //   : null;
  const [pageCount, setPageCount] = useState(0);
  const limit = 10;
  const [page, setPage] = useState(1)

  useEffect(() => {
    setIsLoading(true);
    let seraching = inputUser || ''
      fetch(`https://millenivision.herokuapp.com/users/userList?search=${seraching}&&page=${page}&&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            setPageCount(Math.ceil(data?.count / limit));
            setTotalUser(data.totalUser)
            setUserList(data.user)
          }
        });
    setIsLoading(false);
  }, [isLoading, inputUser, page]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (searchUser?.length) {
  //     const searchFilter1 = searchUser.filter((s) =>
  //       s.first_name.toLowerCase().includes(inputUser.toLowerCase())
  //     );
  //     setUserList(searchFilter1);
  //     // console.log(searchFilter)
  //     setIsLoading(false);
  //   }
  // }, [inputUser, searchUser]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (searchUser?.length) {
  //     const searchFilter2 = searchUser.filter((s) =>
  //       s.last_name.toLowerCase().includes(inputUser.toLowerCase())
  //     );
  //     setUserList(searchFilter2);
  //     // console.log(searchFilter)
  //     setIsLoading(false);
  //   }
  // }, [inputUser, searchUser]);
  // useEffect(() => {
  //   setIsLoading(true);
  //   if (searchUser?.length) {
  //     const searchFilter3 = searchUser.filter((s) =>
  //       s.phone.toLowerCase().includes(inputUser.toLowerCase())
  //     );
  //     setUserList(searchFilter3);
  //     // console.log(searchFilter)
  //     setIsLoading(false);
  //   }
  // }, [inputUser, searchUser]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`https://safe-journey-75946.herokuapp.com/users/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${userInfo.user.token}`, //requerd
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSearchUser(data.user);
  //     });
  //   setIsLoading(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const navigate = useNavigate();
  const userInfobee = localStorage?.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  useEffect(() => {
    if (!userInfobee?.user) {
      navigate("/login");
    }
  }, [navigate, userInfobee?.user]);
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
            width: 500,
            mt: -6,
            ml: 15,
          }}
        >
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
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            mt: -2,
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
            Total {totalUser && totalUser} User
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
              First Name
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A" }}>
              Last Name
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 69 }}>
              Email
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 31 }}>
              Phone
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 31 }}>
              Location
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 31 }}>
              Gender
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 31 }}>
              Industry
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList.length === 0 ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", ml: 50, p: 2 }}
            >
              <CircularProgress color="success" />
            </Box>
          ) : (
            <>
              {usersList.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell sx={{ color: "#DD502C" }}>
                    {row.first_name}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "#DD502C" }}>
                    {row.last_name}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "#565555" }}>
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "#565555" }}>
                    {row.phone}
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

export default UserList;
