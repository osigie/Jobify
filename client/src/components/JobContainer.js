import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import Loading from "./Loading";
import SingleJob from "./SingleJob";
import Wrapper from "../assets/wrappers/JobsContainer";

const JobContainer = () => {
  const {
    getAllJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchType,
    searchStatus,
    sort,
  } = useAppContext();

  useEffect(() => {
    getAllJobs();
  }, [search, searchType, searchStatus, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2> No jobs to display....</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <SingleJob job={job} key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobContainer;
