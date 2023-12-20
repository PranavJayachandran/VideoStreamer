const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'VideoStreamer',
    password: 'Pranav@123',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})


const insertMetadata = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params)
    const duration = Date.now() - start;

    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
}

module.exports = { insertMetadata }