import React from "react";
import { useForm } from "react-hook-form";

interface IAppendBook {
  name: string;
}

export default function Book() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IAppendBook>();

  const onSubmit = (e: IAppendBook) => {
    console.log(e);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <button type="submit">Submit</button>
    </form>
  );
}
