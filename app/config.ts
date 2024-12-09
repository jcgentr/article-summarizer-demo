type Config = {
  backendUrl: string | undefined;
  // Add other config variables here
};

function validateConfig(config: Config): asserts config is Config {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Config error: ${key} is undefined`);
    }
  }
}

const config = {
  backendUrl: process.env.BACKEND_URL,
  // Add other config variables here
};

validateConfig(config);

export default config as Config;
