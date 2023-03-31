import * as dotenv from 'dotenv';
import * as path from 'path';

export class EnvConfig {
    private static instance: EnvConfig;
    private env: dotenv.DotenvParseOutput;

    private constructor() {
        this.env = dotenv.config({ path: path.resolve(__dirname, '..', 'process.env') }).parsed;
    }

    public static async getInstance(): Promise<EnvConfig> {
        if (!EnvConfig.instance) {
            EnvConfig.instance = new EnvConfig();
        }
        return EnvConfig.instance;
    }

    public async get(key: string): Promise<string | undefined> {
        return this.env[key];
    }
}
