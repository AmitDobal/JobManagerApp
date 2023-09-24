import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Close as CloseIcon } from "@mui/icons-material";
import theme from "../../theme/theme";
import { useState } from "react";

const useStyle = makeStyles(() => ({
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const initState = {
  title: "",
  type: "Full time",
  location: "Remote",
  companyName: "",
  companyUrl: "",
  skills: [],
  link: "",
  description: "",
};

const NewJobModal = (props) => {
  const [jobDetails, setJobDetails] = useState(initState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // e.persist();
    setJobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) return;
    }
    if (!jobDetails.skills.length) return;
    setLoading(true);
    await props.postJob(jobDetails);
    closeModal();
  };

  const closeModal = () => {
    setJobDetails(initState);
    setLoading(false);
    props.closeJobModal();
  };

  const addRemoveSkills = (skill) => {
    if (!jobDetails.skills.includes(skill))
      setJobDetails((oldState) => ({
        ...oldState,
        skills: oldState.skills.concat(skill),
      }));
    else {
      setJobDetails((oldState) => ({
        ...oldState,
        skills: oldState.skills.filter((item) => item !== skill),
      }));
    }
  };

  const skills = [
    "javascript",
    "ReactJs",
    "Java",
    "NodeJs",
    "expressJs",
    "springboot",
  ];
  const classes = useStyle();
  return (
    <Dialog open={props.showJobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              autoComplete="off"
              name="title"
              value={jobDetails.title}
              placeholder="Job title *"
              disableUnderline
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="type"
              value={jobDetails.type}
              variant="filled"
              disableUnderline
              fullWidth>
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>{" "}
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              name="companyName"
              value={jobDetails.companyName}
              placeholder="Company name *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              name="companyUrl"
              value={jobDetails.companyUrl}
              placeholder="Company URL *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="location"
              value={jobDetails.location}
              variant="filled"
              disableUnderline
              fullWidth>
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="In-Office">In-Office</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              name="link"
              value={jobDetails.link}
              placeholder="Job Link *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              name="description"
              value={jobDetails.description}
              placeholder="Job Description *"
              disableUnderline
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography>Skills *</Typography>
            </Grid>
            <Grid item container xs={12}>
              {skills.map((skill) => (
                <Grid
                  onClick={() => addRemoveSkills(skill)}
                  key={skill}
                  className={`${classes.skillChip} ${
                    jobDetails.skills.includes(skill) && classes.included
                  }`}>
                  {skill}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          alignItems="center"
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between">
          <Typography variant="contained">* Required fields</Typography>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="contained"
            disableElevation>
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewJobModal;
