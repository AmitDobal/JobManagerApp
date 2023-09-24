import { Box, Button, CircularProgress, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./SearchBar.css";
import { useState } from "react";

const useStyles = makeStyles({
  wrapper: {
    background: "#fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    "& > *": {
      flex: 1,
      height: "45px",
      margin: "8px",
    },
  },
});

const SearchBar = (props) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [jobSearch, setJobSearch] = useState({
    type: "Full time",
    location: "Remote",
  });

  const handleChange = (e) => {
    // e.persist();
    setJobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const search = async () => {
    setLoading(true);
    await props.fetchJobsCustom(jobSearch);
    setLoading(false);
  };

  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
      <Select
        variant="filled"
        value={jobSearch.type}
        onChange={handleChange}
        name="type"
        disableUnderline>
        <MenuItem value="Full time">Full time</MenuItem>
        <MenuItem value="Part time">Part time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </Select>
      <Select
        variant="filled"
        value={jobSearch.location}
        onChange={handleChange}
        name="location"
        disableUnderline>
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="In-Office">In-Office</MenuItem>
      </Select>
      <Button
        onClick={search}
        style={{ margin: "8px" }}
        variant="contained"
        color="primary"
        disableElevation
        disabled={loading}>
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};

export default SearchBar;
