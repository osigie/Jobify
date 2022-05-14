import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/AppContext";
import { FormRow, Alert, Select } from "../../components/index";

const AddJobs = () => {
  const {
    isAlert,
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    isEditing,
    displayAlert,
    handleChangeFunc,
    clearValues,
    createJob,
    editJob
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company || !position || !jobLocation) {
      displayAlert();
      return;
    }

    if(isEditing){
        editJob()
        return 
    }

    createJob()
  };

  const handleChange = (e) => {
    // console.log(e);
    //    const name = e.target.name
    //    const value = e.target.value
    handleChangeFunc(e);
  };
  //   const handleJobInput = (e) => {};

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3> {isEditing ? "Edit Job" : "Add Job"}</h3>
        {isAlert && <Alert />}
        <div className="form-center">
          <FormRow
            labelText={"Position"}
            type={"text"}
            value={position}
            className=""
            handleChange={handleChange}
            name={"position"}
          />
          <FormRow
            labelText={"Company"}
            type={"text"}
            value={company}
            className=""
            handleChange={handleChange}
            name={"company"}
          />
          <FormRow
            labelText={"Job Location"}
            type={"text"}
            value={jobLocation}
            className=""
            handleChange={handleChange}
            name={"jobLocation"}
          />
          <Select
            data={jobTypeOptions}
            value={jobType}
            labelText={"Job Type"}
            handleChangeSelect={handleChange}
            name={"jobType"}
          />
          <div className="btn-container">
            <button type="submit" className="btn btn-block submit-btn" disabled = {isLoading}>
              submit
            </button>

            <button
              type="submit"
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJobs;
