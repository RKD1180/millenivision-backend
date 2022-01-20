import React from "react";
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

import avatar from "../../../img/man.png";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    avatar,
    "American Sitcom",
    "50",
    "Shakilhasan055@gmail.com",
    "115"
  ),
  createData(
    avatar,
    "American Sitcom",
    "50",
    "Shakilhasan055@gmail.com",
    "115"
  ),
  createData(
    avatar,
    "American Sitcom",
    "50",
    "Shakilhasan055@gmail.com",
    "115"
  ),
  createData(
    avatar,
    "American Sitcom",
    "50",
    "Shakilhasan055@gmail.com",
    "115"
  ),
  createData(
    avatar,
    "American Sitcom",
    "50",
    "Shakilhasan055@gmail.com",
    "115"
  ),
];

const CommunityList = () => {
  return (
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
            Total 50 Community List
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
              Community Name
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 1 }}>
              Total Event
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 40 }}>
              Leader Email
            </StyledTableCell>
            <StyledTableCell style={{ color: "#33594A", paddingLeft: 1 }}>
              Total Member
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <img src={row.name} style={{ height: 40, width: 40 }} alt="" />
                <Box sx={{ mt: -5, ml: 3 }}>
                  <span style={{ marginLeft: 40, color: "#565555" }}>
                    {row.calories}{" "}
                  </span>
                  <br />
                  <span
                    style={{ color: "#8D8D8D", marginLeft: 40, fontSize: 12 }}
                  >
                    American Sitcom
                  </span>
                </Box>
              </StyledTableCell>

              <StyledTableCell sx={{ color: "#565555" }}>
                {row.fat}
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#565555" }}>
                {row.carbs}
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#565555" }}>
                {row.protein}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommunityList;
