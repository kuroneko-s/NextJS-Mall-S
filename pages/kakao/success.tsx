import Link from "next/link";

export default function PaySuccess() {
  return (
    <div>
      결제 성공!
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
