const mysql = require("serverless-mysql")();

mysql.config({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

export interface ExecuteQueryProps {
  query: string;
  values: string[];
}

export async function executeQuery({ query, values }: ExecuteQueryProps) {
  try {
    let results = await mysql.query(query, values);

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
