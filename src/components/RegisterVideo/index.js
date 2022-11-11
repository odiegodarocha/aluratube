import React, { useState } from "react";
import { StyledRegisterVideo } from "./styles";
import { videoService } from "../../services/videoService";

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
      });
    },
    clearForm() {
      setValues(propsForm.initialValues);
    },
  };
}

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const service = videoService();
  const registerForm = useForm({
    initialValues: { title: "", url: "" },
  });
  const [formVisible, setFormVisible] = useState(false);
  return (
    <StyledRegisterVideo>
      <button
        type="button"
        className="add-video"
        onClick={() => setFormVisible(true)}
      >
        +
      </button>
      {formVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            
            service
              .getVideo()
              .insert({
                title: registerForm.values.title,
                url: registerForm.values.url,
                thumbnail: getThumbnail(registerForm.values.url),
                playlist: "jogos",
              })
              .then(() => {
                alert("Vídeo cadastrado com sucesso!");
              })
              .catch((err) => {
                alert("Não foi possível cadastrar o vídeo, tente novamente!");
              });

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
            {registerForm.values.url && (
              <img src={getThumbnail(registerForm.values.url)} />
            )}
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
