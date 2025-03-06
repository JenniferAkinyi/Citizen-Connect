import { PrismaClient } from '@prisma/client';
import { SecretsManager } from "aws-sdk";

AWS.config.update({ region: "us-east-1" }); 

const secretsManager = new SecretsManager({ region: "us-east-1" });

const getDatabaseUrl = async () => {
    try {
      const secretName = "aws/secretsmanager"; 
      const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
  
      if (!data.SecretString) throw new Error("SecretString is undefined");
  
      const credentials = JSON.parse(data.SecretString);
  
      return `sqlserver://${credentials.username}:${encodeURIComponent(credentials.password)}@${credentials.host},${credentials.port};database=${credentials.dbname};encrypt=true;trustServerCertificate=true`;
    } catch (error) {
      console.error("Error fetching secret:", error);
      throw error;
    }
  };
  

getDatabaseCredentials().then(credentials => {
    console.log("Database Credentials:", credentials);
}).catch(err => {
    console.error("Failed to retrieve secrets:", err);
});
async function connectToDatabase() {
    const databaseUrl = await getDatabaseUrl();
    process.env.DATABASE_URL = databaseUrl; 

    const prisma = new PrismaClient();
    return prisma;
}

const prisma = connectToDatabase();

export default prisma;