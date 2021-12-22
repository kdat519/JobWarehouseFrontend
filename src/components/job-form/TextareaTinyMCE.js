import { Editor } from "@tinymce/tinymce-react";
import { useFormikContext } from "formik";
import React, { useRef, useState } from "react";

const mimicBoostrap = (editor) => {
  const invalid = () =>
    editor.isDirty() &&
    editor.getContent({ format: "text" }).trim().length === 0;

  editor.on("init", () => {
    editor.getContainer().style.borderRadius = "4px";
    editor.getContainer().style.transition =
      "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out";
  });

  const invalidEffect = () => {
    if (invalid()) {
      editor.getContainer().style.boxShadow =
        "0 0 0 0.25rem rgba(220, 53, 69, 0.25)";
      editor.getContainer().style.borderColor = "#dc3545";
    } else {
      editor.getContainer().style.boxShadow =
        "0 0 0 .2rem rgba(0, 123, 255, .25)";
      editor.getContainer().style.borderColor = "#80bdff";
    }
  };

  editor.on("focus", () => invalidEffect());
  editor.on("keyup", () => invalidEffect());
  editor.on("blur", () => {
    editor.getContainer().style.boxShadow = "";
    editor.getContainer().style.borderColor = invalid() ? "#dc3545" : "";
  });
};

const TextareaTinyMCE = ({ name, label }) => {
  const { initialValues, handleChange, errors, values } = useFormikContext();
  const editorRef = useRef();
  const [touched, setTouched] = useState(false);
  return (
    <div className="row mb-2">
      <div className="col">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <Editor
          apiKey="up56sg6htn5p09a2x4ut7hzguy5p1i7qba1ulc3y0wwxoauz"
          onInit={(_, editor) => {
            editorRef.current = editor;
          }}
          initialValue={initialValues[name]}
          value={values[name]}
          onEditorChange={(value) => {
            setTouched(true);
            handleChange(name)(value);
          }}
          init={{
            height: 300,
            menubar: false,
            branding: false,
            plugins: ["advlist autolink lists link paste"],
            toolbar:
              "undo redo | " +
              "bold italic | bullist numlist outdent indent | " +
              "removeformat",
            content_css:
              "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
            content_style:
              "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');" +
              "body { font-family: Inter; margin: 1rem }",
            setup: mimicBoostrap,
          }}
        />
        <div
          className={
            "invalid-feedback " + (touched && errors[name] ? "d-block" : "")
          }
        >
          <i className="bi bi-exclamation-circle"></i> {errors[name]}
        </div>
      </div>
    </div>
  );
};

export default TextareaTinyMCE;
