import { connect } from "mongoose";

type ConnectionConfigType = {
    host: string,
    port: string,
    database: string
};

export const connectionConfig: ConnectionConfigType = {
    host: process.env.MONGO_DB_HOST ?? '',
    port: process.env.MONGO_DB_PORT ?? '27017',
    database: process.env.MONGO_DB_DATABASE ?? ''
}

// @ts-ignore
export default async ({host, port, database}: ConnectionConfigType) => (
    await connect(`mongodb://${host}:${port}/${database}`)
);
