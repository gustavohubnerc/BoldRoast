import { useState } from "react";

export default function useForm(emptyForm) {

  const [form, setForm] = useState(emptyForm);

  function changeForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return { form, changeForm };
}