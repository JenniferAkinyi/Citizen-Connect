import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";

const SECRET_NAME =
  process.env.SECRET_NAME || "rds!db-b82d6bfb-7ad9-4888-82d5-6ba68936becf";
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

const secretsClient = new SecretsManagerClient({ region: AWS_REGION });

export const getAwsSecrets = async () => {
  try {
    const response = await secretsClient.send(
      new GetSecretValueCommand({
        SecretId: SECRET_NAME,
        VersionStage: "AWSCURRENT",
      })
    );

    if (!response.SecretString) {
      throw new Error("Secret string is empty");
    }
    const secrets = JSON.parse(response.SecretString);
    if (
      !secrets.username ||
      !secrets.password 
    ) {
      throw new Error("Missing required database credentials in AWS Secrets");
    }

    const databaseUrl = `sqlserver://${secrets.username}:${encodeURIComponent(
      secrets.password
    )}@citizenconnect-db.cqn0860yopae.us-east-1.rds.amazonaws.com:${
      secrets.port || 1433
    }/${secrets.database}?encrypt=true&trustServerCertificate=false`;
    
    return { ...secrets, DATABASE_URL: databaseUrl };
  } catch (error) {
    console.error("Error fetching AWS Secret:", error.message);
    throw new Error(`AWS SecretsManager error: ${error.message}`);
  }
};

const prisma = new PrismaClient();

const connectToDatabase = async () => {
  try {
    const secrets = await getAwsSecrets();

    const databaseUrl = secrets.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is missing in secrets");
    }

    process.env.DATABASE_URL = databaseUrl;

    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

const runMigrations = async () => {
  try {
    console.log("Running migrations...");
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration error:", error.message);
    process.exit(1);
  }
};

const main = async () => {
  await connectToDatabase();
  await runMigrations();
};

main().catch((error) => {
  console.error("Application error:", error.message);
  process.exit(1);
});

export default prisma;