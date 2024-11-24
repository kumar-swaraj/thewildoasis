const getEnvironmentVariable = (environmentVariable: string) => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  apiServer: {
    url: getEnvironmentVariable('API_URL'),
    key: getEnvironmentVariable('API_KEY'),
  },
  oauth: {
    google: {
      id: getEnvironmentVariable('AUTH_GOOGLE_ID'),
      secret: getEnvironmentVariable('AUTH_GOOGLE_SECRET'),
    },
  },
};
