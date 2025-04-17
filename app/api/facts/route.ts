import { NextResponse } from 'next/server'
import oracledb from 'oracledb'

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

export async function GET() {
  let connection

  try {
    connection = await oracledb.getConnection({
      user: 'cprg250',
      password: 'password', // replace this
      connectionString: 'CapstoneSkeleton'
    })

    const result = await connection.execute('SELECT * FROM rainforest_facts')
    return NextResponse.json(result.rows)
  } catch (err) {
    console.error('Database error:', err)
    return NextResponse.json({ error: 'Failed to fetch facts' }, { status: 500 })
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error('Error closing connection:', err)
      }
    }
  }
}

