const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

export interface ExecuteQueryProps {
  query: string;
  values: string[];
}

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
    console.log("🚀 ~ file: db.ts:30 ~ executeQuery ~ error:", error);
    return {
      error: error,
    };
  }
}
