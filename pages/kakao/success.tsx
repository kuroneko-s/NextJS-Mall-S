import Link from "next/link";
import { GlobalContext } from "pages/_app";
import { useContext } from "react";

export default function PaySuccess() {
  const { removeAll } = useContext(GlobalContext);

  return (
    <div>
      결제 성공!
      <Link href="/">
        <a>
          <div>
            <button
              className="bg-yellow-500"
              type="button"
              onClick={() => {
                removeAll && removeAll();
              }}
            >
              Home
            </button>
          </div>
        </a>
      </Link>
    </div>
  );
}
