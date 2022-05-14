import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import Loading from "./Loading";
import SingleJob from "./SingleJob";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";

const JobContainer = () => {
  const {
    getAllJobs,
    jobs,
    isLoading,
    totalJobs,
    search,
    searchType,
    searchStatus,
    sort,
    numOfPages,
    page,
  } = useAppContext();

  useEffect(() => {
    getAllJobs();
  }, [search, searchType, searchStatus, sort, page]);

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
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobContainer;
