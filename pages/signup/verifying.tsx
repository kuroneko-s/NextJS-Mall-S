import React from "react";
import { useForm } from "react-hook-form";
import { Container, ContentsContainer } from "styles/common";
import { Label, ErrorMessage, Input } from "./index.style";
import { server } from "@lib/common";
import { useRouter } from "next/router";

type Inputs = {
  verifying: string;
  email?: string;
};

type VerifyingResult = {
  ok: boolean;
  message: string;
  url?: string;
};

export default function Verigying() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    data.email =
      router.query?.email === undefined ? "" : router.query.email.toString();

    const json: VerifyingResult = await fetch(
      `${server}/api/signup/verifying`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

    console.log(json);

    router.replace(json.url ?? "/");
  };

  return (
    <Container>
      <ContentsContainer className="min-h-[71vh] flex flex-col items-center">
        <h1 className="font-semibold text-2xl my-4">이메일 검증</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-start w-1/4"
        >
          <Label htmlFor="verifying">인증번호</Label>
          <Input
            id="verifying"
            type="text"
            maxLength={6}
            {...register("verifying", {
              required: true,
              maxLength: 6,
            })}
          />
          {errors.verifying?.type === "maxLength" ? (
            <ErrorMessage>길이가 초과했습니다.</ErrorMessage>
          ) : null}
          <button
            type="submit"
            className="mt-2 bg-blue-400 w-full py-2 rounded-md text-lg font-bold text-white hover:bg-blue-500"
          >
            검증
          </button>
        </form>
      </ContentsContainer>
    </Container>
  );
}
