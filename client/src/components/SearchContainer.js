import { useAppContext } from "../context/AppContext";
import { Select, FormRow } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChangeFunc,
    clearFilters,
    jobTypeOptions,
    statusOptions,
  } = useAppContext();

  const onChangeHandler = (e) => {
    if (isLoading) return;
    handleChangeFunc(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmitBtn = () => {
    clearFilters()
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            labelText="search"
            type="text"
            name="search"
            value={search}
            handleChange={onChangeHandler}
          />
          {/* search by status */}
          <Select
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChangeSelect={onChangeHandler}
            data={["all", ...statusOptions]}
          />
          {/* search by type */}
          <Select
            labelText="type"
            name="searchType"
            value={searchType}
            handleChangeSelect={onChangeHandler}
            data={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <Select
            name="sort"
            value={sort}
            handleChangeSelect={onChangeHandler}
            data={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmitBtn}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};



export default SearchContainer;
