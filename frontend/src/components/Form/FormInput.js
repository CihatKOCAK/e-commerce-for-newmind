const FormInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
  options,
}) => {
  const styles = {
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    select: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      backgroundColor: "#fff",
    },
  };
  // Eğer type "select" ise dropdown göster, değilse input göster
  if (type === "select") {
    return (
      <select
        style={styles.select}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
    );
  }

  return (
    <input
      style={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default FormInput;
