import { Close as CloseIcon } from "@mui/icons-material";
import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { format } from "date-fns";
import React from "react";
import theme from "../../theme/theme";
const useStyles = makeStyles({
  info: {
    "& > *": {
      margin: "5px",
    },
  },
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
});

const ViewJobModal = (props) => {
  const classes = useStyles();
  return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {props.job.title} @ {props.job.companyName}
          <IconButton onClick={props.closeJobModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box className={classes.info} display="flex">
            <Typography style={{ margin: "5px" }} variant="body2">
              Posted on:
            </Typography>
            <Typography style={{ margin: "5px" }} variant="caption">
              {props.job.postedOn &&
                format(props.job.postedOn, "dd/MMM/yyyy HH:MM")}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography style={{ margin: "5px" }} variant="body2">
              Job type:
            </Typography>
            <Typography style={{ margin: "5px" }} variant="caption">
              {" "}
              {props.job.type}{" "}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography style={{ margin: "5px" }} variant="body2">
              Job location:
            </Typography>
            <Typography style={{ margin: "5px" }} variant="caption">
              {" "}
              {props.job.location}{" "}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography style={{ margin: "5px" }} variant="body2">
              Job description:
            </Typography>
            <Typography style={{ margin: "5px" }} variant="caption">
              {props.job.description}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography style={{ margin: "5px" }} variant="body2">
              Company Name:
            </Typography>
            <Typography style={{ margin: "5px" }} variant="caption">
              {props.job.companyName}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography style={{ margin: "5px" }} variant="body2">
              Company Url:
            </Typography>
            <Typography style={{ margin: "5px" }} variant="caption">
              {props.job.companyUrl}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography
              display="flex"
              alignItems="center"
              style={{ margin: "5px" }}
              variant="body2">
              Skills:
            </Typography>
            <Grid container alignItems="center">
              {props.job.skills &&
                props.job.skills.map((skill) => (
                  <Grid
                    item
                    key={skill}
                    m={theme.spacing(0.5)}
                    className={classes.skillChip}>
                    {skill}
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined"  href={props.job.link} target="_blank" >Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewJobModal;
