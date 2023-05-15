import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, ContentsContainer } from "styles/common";
import { ErrorMessage, Input, Label } from "./index.style";
import { server } from "lib/common";
import { useRouter } from "next/router";
import Head from "next/head";

type Inputs = {
  email: string;
  password: string;
  passwordChecker: string;
};

type SignUpResult = {
  ok: boolean;
  message: string;
  url?: string;
};

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    if (data.password !== data.passwordChecker) {
      setError("passwordChecker", {
        type: "unMatch",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    const json: SignUpResult = await fetch(`${server}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (!json.ok) {
      setError("email", {
        type: "duplicated",
        message: json.message,
      });
    } else {
      router.push(json.url!);
    }
  };

  return (
    <Container>
      <Head>
        <title>회원가입 | 흑우냥이</title>
        {/* <meta /> */}
      </Head>
      <ContentsContainer className="min-h-[71vh] flex flex-col items-center">
        <h1 className="font-semibold text-2xl my-4">회원가입</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-start w-1/4"
        >
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="text"
            placeholder="example@gamil.com"
            {...register("email", {
              required: true,
              pattern: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/,
            })}
          />
          {errors.email && errors.email.type === "required" ? (
            <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
          ) : errors.email?.type === "pattern" ? (
            <ErrorMessage>이메일 형식을 지켜주세요.</ErrorMessage>
          ) : errors.email?.type === "duplicated" ? (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          ) : null}

          <Label htmlFor="password" className="mt-1">
            비밀번호
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && errors.password.type === "required" ? (
            <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
          ) : errors.password?.type === "minLength" ? (
            <ErrorMessage>비밀번호 길이는 8자 이상이여야 합니다.</ErrorMessage>
          ) : null}

          <Label htmlFor="passwordChecker">비밀번호 확인</Label>
          <Input
            id="passwordChecker"
            type="password"
            placeholder="password checker"
            {...register("passwordChecker", { required: true, minLength: 8 })}
            className="border-2"
          />
          {errors.passwordChecker &&
          errors.passwordChecker.type === "required" ? (
            <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
          ) : errors.passwordChecker?.type === "minLength" ? (
            <ErrorMessage>비밀번호 길이는 8자 이상이여야 합니다.</ErrorMessage>
          ) : errors.passwordChecker?.type === "unMatch" ? (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          ) : null}

          <button
            type="submit"
            className="mt-2 bg-blue-400 w-full py-2 rounded-md text-lg font-bold text-white hover:bg-blue-500"
          >
            가입하기
          </button>
        </form>
      </ContentsContainer>
    </Container>
  );
}
