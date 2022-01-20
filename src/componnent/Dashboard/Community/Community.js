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
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";

import Popper from "@mui/material/Popper";

import {
  faEllipsisV,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddLeader from "../AddLeader/AddLeader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F4F4",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Community = () => {
  const element = <FontAwesomeIcon icon={faEllipsisV} />;
  const trash = <FontAwesomeIcon icon={faTrash} />;
  const plus = <FontAwesomeIcon icon={faPlus} />;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [leaderList, setLeaderList] = useState([]);

  const userInfo = window.localStorage.getItem("userInfo")
    ? JSON.parse(window.localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    fetch(`https://safe-journey-75946.herokuapp.com/users/administrators`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.user.token}`, //requerd
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLeaderList(data.user);
      });
  }, [userInfo.user.token]);

  return (
    <Box>
      <Box>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            textTransform: "capitalize",
            mr: 2,
            mb: 3,
            backgroundColor: "#33594A",
            ":hover": {
              backgroundColor: "#33594A",
            },
          }}
        >
          {plus} <span style={{ marginLeft: 10 }}>Add a Leader</span>
        </Button>
        <AddLeader open={open} handleClose={handleClose}></AddLeader>
      </Box>
      <TableContainer component={Paper}>
        <Box sx={{ backgroundColor: "#F5F4F4" }}>
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
              Community Leader
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
              Total {leaderList?.length} Leader
            </Button>
          </Box>
        </Box>
        <Table
          sx={{ minWidth: 700, backgroundColor: "#F5F4F4" }}
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
            {leaderList?.map((row) => (
              <StyledTableRow key={row.name}>
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
                <StyledTableCell>
                  <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                      <div>
                        <Button
                          sx={{ color: "#33594A" }}
                          {...bindToggle(popupState)}
                        >
                          {element}
                        </Button>
                        <Popper {...bindPopper(popupState)} transition>
                          {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                              <Paper sx={{ mr: 10 }}>
                                <Button
                                  sx={{
                                    color: "#DD502C",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {trash}{" "}
                                  <span style={{ marginLeft: 10 }}>Remove</span>
                                </Button>
                              </Paper>
                            </Fade>
                          )}
                        </Popper>
                      </div>
                    )}
                  </PopupState>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Community;
