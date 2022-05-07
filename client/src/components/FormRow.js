

const FormRow = ({ value, name, labelText, type, handleChange }) => {
  return (
    <label className="form-label">
      {labelText || "name"}
      <input
        type={type}
        value={value}
        className="form-input"
        onChange={handleChange}
        name={name}

      ></input>
    </label>
  );
};

export default FormRow;
