import React, { useState } from "react";
import { StyledRegisterVideo } from "./styles";

// Custom Hook
function useForm(propsForm) {
  const [values, setValues] = useState(propsForm.initialValues);

  return {
    values,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setValues({
        ...values,
        [name]: value,
      })
    },
    clearForm() {
      setValues(propsForm.initialValues);
    }
  }
}

export default function RegisterVideo() {
  const registerForm = useForm({
    initialValues: { title: "", url: "" }
  })
  const [formVisible, setFormVisible] = useState(false);
  return (
    <StyledRegisterVideo>
      <button type="button" className="add-video" onClick={() => setFormVisible(true)}>
        +
      </button>
      {formVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFormVisible(false);
            registerForm.clearForm();
          }}
        >
          <div>
            <button
              className="close-modal"
              onClick={() => setFormVisible(false)}
            >
              X
            </button>
            <input 
              placeholder="Título do vídeo"
              name="title"
              value={registerForm.values.title}
              onChange={registerForm.handleChange} 
            />
            <input 
              placeholder="Url do vídeo" 
              name="url"
              value={registerForm.values.url}
              onChange={registerForm.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
