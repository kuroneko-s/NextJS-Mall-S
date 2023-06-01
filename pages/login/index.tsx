import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import kakaoLoginImage from "@images/kakao_login_medium_narrow.png";
import naverLoginImage from "@images/naver_login.png";
import { useRef, useContext, useState } from "react";
import { GlobalContext } from "pages/_app";
import { Container, ContentsContainer } from "styles/common";
import { useForm } from "react-hook-form";
import { Input, Label, ErrorMessage } from "./index.style";
import Head from "next/head";
import { server } from "@lib/common";
import { useRouter } from "next/router";
import Modal from "@components/common/Modal";

interface EmailLoginProps {
  email: string;
  password: string;
  verifying: string;
}

interface EmailLoginResult {
  ok: boolean;
  type?: "email" | "password" | "verify";
  message?: string;
  url?: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const { user } = useContext(GlobalContext);
  const [modalTitle, _] = useState("로그인 알림");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmHandler = () => {
    setIsOpen(false);
    router.push(url);
  };

  const stateToken = useRef<string>(`(
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  ).substring(2, 34)`);

  const naverRedirectUrl = process.env.NAVER_REDIRECT_URL!;
  const encodeUri = encodeURI(naverRedirectUrl);

  const kakaoUrl = useRef<string>(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}`
  );
  const naverUrl = useRef<string>(
    `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NAVER_CLIENT_ID}&response_type=code&redirect_uri=${encodeUri}&state=${stateToken.current}`
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EmailLoginProps>();

  const onSubmit = async (data: EmailLoginProps) => {
    setIsOpen(false);

    const json: EmailLoginResult = await fetch(`${server}/api/login/email`, {
      method: "POST",
      headers: {
        "Contents-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (!json.ok && json.type !== "verify") {
      setError(json.type!, {
        type: "fail",
        message: json.message!,
      });
    } else if (json.type === "verify") {
      openModal();
      setUrl(json.url!);
    } else {
      // router 사용 시 session 업데이트 안됨.
      window.location.href = "/";
    }
  };

  return (
    <Container>
      <Head>
        <title>로그인 | 흑우냥이</title>
      </Head>
      <ContentsContainer className="min-h-[71vh] flex justify-center">
        {user?.name !== undefined ? (
          <div>
            <p className="font-extrabold text-[50px] text-center">
              이미 로그인되어 있음
            </p>
            <div className="flex flex-col w-60 mx-auto">
              <Link href={"/"}>
                <a className="text-center mb-2 bg-blue-500 hover:bg-blue-400 text-gray-200 font-bold text-2xl py-2 px-12 rounded-md">
                  Home
                </a>
              </Link>
              <Link href={"/api/login/logout"}>
                <a className="text-center mb-2 bg-red-400 hover:bg-red-300 text-gray-200 font-bold text-2xl py-2 px-12 rounded-md">
                  logout
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-extrabold text-4xl text-center my-6 text-blue-500">
              로그인
            </p>
            <div className="flex flex-col justify-center items-center">
              <form
                className="space-y-2 mb-2 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="example@gamil.com"
                    {...register("email", {
                      required: true,
                      pattern:
                        /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/,
                    })}
                  />
                  {errors.email && errors.email.type === "required" ? (
                    <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
                  ) : errors.email?.type === "pattern" ? (
                    <ErrorMessage>이메일 형식을 지켜주세요.</ErrorMessage>
                  ) : errors.email?.type !== undefined ? (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  ) : null}
                </div>
                <div>
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
                    <ErrorMessage>
                      비밀번호 길이는 8자 이상이여야 합니다.
                    </ErrorMessage>
                  ) : errors.password?.type !== undefined ? (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 w-full h-12 rounded-lg shadow-md hover:bg-blue-600 self-center text-xl font-extrabold text-white"
                >
                  이메일 로그인
                </button>
                {errors.root && errors.root.type === "fail" ? (
                  <ErrorMessage>{errors.root.message}</ErrorMessage>
                ) : null}
              </form>

              <div className="space-x-2 h-[45px] overflow-hidden">
                <Link href={kakaoUrl.current}>
                  <a className="hover:opacity-80 shadow-md">
                    <Image
                      src={kakaoLoginImage}
                      quality="100"
                      alt="kakaoLoginImage"
                      placeholder="blur"
                      width={183}
                      height={45}
                    />
                  </a>
                </Link>

                <Link href={naverUrl.current}>
                  <a className="hover:opacity-80">
                    <Image
                      src={naverLoginImage}
                      quality="100"
                      alt="naverLoginImage"
                      placeholder="blur"
                      width={183}
                      height={45}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </ContentsContainer>
      <Modal
        modalTitle={modalTitle}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        isConfirm={true}
        confirmFn={confirmHandler}
        contents={"인증번호 검증 화면으로 이동합니다."}
      />
    </Container>
  );
};

export default Login;
