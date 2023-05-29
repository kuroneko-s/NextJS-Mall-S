const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

export interface ExecuteQueryProps {
  query: string;
  values: string[];
}

/**
 * @deprecated mysql 사용대신 pscale&prisma 사용.
 */
export async function executeQuery({ query, values }: ExecuteQueryProps) {
  try {
    let results = await connection.query(query, values);

    const resultArr = [];

    for (const result of results) {
      resultArr.push({ ...result });
    }

    await mysql.end();

    return {
      result: resultArr,
    };
  } catch (error: any) {
    console.log("error: ", error);
    return {
      error: error,
    };
  }
}
