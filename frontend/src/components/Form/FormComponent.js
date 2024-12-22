import FormInput from "./FormInput";

const FormComponent = ({ title,fields, onSubmit, buttonText, error }) => {
  const styles = {
    container: {
      maxWidth: "500px",
      margin: "50px auto",
      padding: "60px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#61dafb",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    error: {
      color: "red",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.container}>
      <h2>{title}</h2>
      {fields.map((field, index) => (
        <div key={index} style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px 0",
        }}>
        <label style={{
          textAlign: "left",
          marginBottom: "5px",
        }}>{field.placeholder+": "}</label>
        <FormInput key={index} {...field} />
        </div>
      ))}
      {error && <p style={styles.error}>{error}</p>}
      <button style={styles.button} onClick={onSubmit}>
        {buttonText}
      </button>
    </div>
  );
};

export default FormComponent;
