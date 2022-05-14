import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useAppContext } from "../context/AppContext";
import JobInfo from "./JobInfo";

const SingleJob = ({
  createdAt,
  company,
  position,
  _id,
  status,
  jobLocation,
  jobType,
}) => {
  const { setEditJob, setDeleteJob } = useAppContext();
  let date = moment(createdAt).format("MMM Do YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon"> {company.charAt(0)} </div>
        <div className="info">
          <h5>{company}</h5>
          <p>{position} </p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow/>} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt/>} text={date} />
          <JobInfo icon={<FaBriefcase/>} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>

  
        <footer>
          <Link
            to="/add-jobs"
            className="btn edit-btn"
            onClick={() => {
              setEditJob(_id);
            }}
          >
            Edit
          </Link>
          <button
            type="submit"
            className="btn delete-btn"
            onClick={() => {
              setDeleteJob(_id);
            }}
          >
            Delete
          </button>
        </footer>
      </div>
    </Wrapper>
  );
};

export default SingleJob;
