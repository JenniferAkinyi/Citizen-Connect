import { PrismaClient } from "@prisma/client";
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

const REGION = "us-east-1"; 
const SECRET_NAME = "aws/secretsmanager"; 

const secretsManagerClient = new SecretsManagerClient({ region: REGION });

const getSecretValue = async (secretName = SECRET_NAME) => {
  try {
    const response = await secretsManagerClient.send(
      new GetSecretValueCommand({ SecretId: secretName })
    );

    if (!response.SecretString) {
      throw new Error("SecretString is undefined");
    }

    return JSON.parse(response.SecretString);
  } catch (error) {
    console.error("Error fetching secret:", error);
    throw error;
  }
};

const getDatabaseUrl = async () => {
  try {
    const credentials = await getSecretValue();

    return `sqlserver://${credentials.username}:${encodeURIComponent(
      credentials.password
    )}@${credentials.host},${credentials.port};database=${
      credentials.dbname
    };encrypt=true;trustServerCertificate=true`;
  } catch (error) {
    console.error("Error constructing database URL:", error);
    throw error;
  }
};

async function connectToDatabase() {
  try {
    const databaseUrl = await getDatabaseUrl();
    process.env.DATABASE_URL = databaseUrl;

    return new PrismaClient();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

const prisma = await connectToDatabase();

export default prisma;

