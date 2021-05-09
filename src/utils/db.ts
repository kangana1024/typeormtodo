import { Connection, ConnectionManager, createConnection, getConnectionManager, ConnectionOptions } from "typeorm";

export class Database {
  private connectionManager: ConnectionManager

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public getConnection = async (name: string) => {
    const CONNECTION_NAME: string = name
    let connection: Connection;
    const hasConnection = this.connectionManager.has(CONNECTION_NAME)
    if (hasConnection) {
      connection = this.connectionManager.get(CONNECTION_NAME)
      if (!connection) {
        connection = await connection.connect()
      }
    } else {
      const connectionOptions: ConnectionOptions = {
        name: "default",
        type: "postgres",
        host: process.env.POSTGRES_HOST as string,
        port: parseInt(process.env.POSTGRES_PORT as string),
        username: process.env.POSTGRES_USER as string,
        password: process.env.POSTGRES_PASSWORD as string,
        database: process.env.POSTGRES_DB as string,
        entities: [],
        synchronize: false,
        migrationsRun: true,
        logging: false,
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
      };
      connection = await createConnection(connectionOptions);
    }
    return connection
  }
}