import Link from "next/link";

export default function PaySuccess() {
  return (
    <div>
      결제 취소!
      <Link href="/">
        <a>
          <div>
            <button type="button">Home</button>
          </div>
        </a>
      </Link>
    </div>
  );
}
