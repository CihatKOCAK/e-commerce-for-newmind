const FormInput = ({ type, name, placeholder, value, onChange, required }) => {
  const styles = {
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
  };

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
