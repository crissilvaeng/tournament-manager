import { ConnectionString } from 'connection-string';

export default () => {
  const connection = new ConnectionString(process.env.DATABASE_URL);
  return {
    database: {
      dialect: connection.protocol,
      host: connection.hostname,
      port: connection.port,
      username: connection.user,
      password: connection.password || '',
      database: connection.path?.[0],
    },
  };
};
