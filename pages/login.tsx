import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import kakaoLoginImage from "../images/kakao_login.png";

const Login: NextPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=c6c156e9a53b774d81b1f76fedb9d372&redirect_uri=http://localhost:3000/api/login/kakao/result">
        <a>
          <Image
            src={kakaoLoginImage}
            quality="100"
            alt="kakaoLoginImage"
            placeholder="blur"
            // onClick={kakaoHandler}
          />
        </a>
      </Link>
    </div>
  );
};

export default Login;
