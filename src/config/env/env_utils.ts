export function getDotEnvFile(): string {
    const envContext = process.env.NODE_ENV.toUpperCase();
    console.log("Loading environment: [ .env." + envContext + " ]");
    return `.env.${envContext}`;
}

export function getOsEnv(key: string): string {
    if (typeof process.env[key] === "undefined") {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return process.env[key];
}

export function normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}
