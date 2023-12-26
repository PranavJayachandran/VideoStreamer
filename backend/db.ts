import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "VideoStreamer",
  password: "postgres",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const dbQuery = async (text: string, params: any) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;

  console.log("executed query", { text, duration, rows: res.rowCount });
  return res.rows;
};

export { dbQuery };
