const Select = ({ data, value, handleChangeSelect, labelText, name }) => {
  return (
    <div className="form-row">
      <label className="form-label">
        {labelText || name}
        <select
          name={name}
          value={value}
          onChange={handleChangeSelect}
          className="form-select"
        >
          {data.map((each, index) => {
            return <option key={index}>{each}</option>;
          })}
        </select>
      </label>
    </div>
  );
};

export default Select;
