import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

const Header = (props) => {
  return (
    <Box py={10} bgcolor="secondary.main" color="white">
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">Open Job Listing</Typography>
            <Button
              onClick={props.openJobModal}
              variant="contained"
              color="primary"
              disableElevation>
              Post a job
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
