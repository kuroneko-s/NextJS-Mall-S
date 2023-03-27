import { executeQuery } from "./db";

export async function login() {
  const result = await executeQuery({
    query: "select * from user",
    values: [],
  });

  console.log(result);
}

login();
