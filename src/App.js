import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import Header from "./components/Header/Header";
import { Button, CircularProgress, Grid } from "@mui/material";
import SearchBar from "./components/SearchBar/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import { useEffect, useState } from "react";
import { app, firestore } from "./firebase/config";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";
import ViewJobModal from "./components/Job/ViewJobModal";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJob, setViewJob] = useState({});

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setCustomSearch(false);
      const req = await firestore
        .collection("jobs")
        .orderBy("postedOn", "desc")
        .get();
      const tempJobs = req.docs.map((job) => ({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      }));
      setJobs(tempJobs);
      setLoading(false);
    } catch (error) {
      console.log("Inside: fetchJobs");
      console.log(error.message);
      console.log(error.stack);
    }
  };

  const fetchJobsCustom = async (jobSearch) => {
    try {
      setLoading(true);
      setCustomSearch(true);
      console.log("JobSearch: ", jobSearch);
      const req = await firestore
        .collection("jobs")
        .orderBy("postedOn", "desc")
        .where("type", "==", jobSearch.type)
        .where("location", "==", jobSearch.location)
        .get();
      const tempJobs = req.docs.map((job) => ({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      }));
      setJobs(tempJobs);
      setLoading(false);
    } catch (error) {
      console.log("Inside: customfetchJobs");
      console.log(error.message);
      console.log(error.stack);
    }
  };

  const postJob = async (jobdetails) => {
    try {
      await firestore.collection("jobs").add({
        ...jobdetails,
        postedOn: app.firestore.FieldValue.serverTimestamp(),
      });
      await fetchJobs();
    } catch (error) {
      console.log("Inside: postJobs");
      console.log(error.message);
      console.log(error.stack);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header openJobModal={() => setShowJobModal(true)} />
      <NewJobModal
        postJob={postJob}
        showJobModal={showJobModal}
        closeJobModal={() => setShowJobModal(false)}
      />
      <ViewJobModal job={viewJob} closeJobModal={() => setViewJob({})} />
      <Box mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <SearchBar fetchJobsCustom={fetchJobsCustom} />
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <>
                {customSearch && (
                  <Box my={2} display="flex" justifyContent="flex-end">
                    <Button onClick={fetchJobs}>
                      <Close size={20} />
                      Custom Search
                    </Button>
                  </Box>
                )}

                {jobs.map((job) => (
                  <JobCard open={() => setViewJob(job)} key={job.id} {...job} />
                ))}
              </>
            )}
          </Grid>
        </Grid>{" "}
      </Box>
    </ThemeProvider>
  );
}

export default App;
