import { PrismaClient } from '@prisma/client';

const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1" }); 

const secretsManager = new AWS.SecretsManager();

async function getDatabaseCredentials() {
    try {
        const secretName = "aws/secretsmanager"; 
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

        if (data.SecretString) {
            return JSON.parse(data.SecretString);
        } else {
            throw new Error("SecretString is undefined");
        }
    } catch (error) {
        console.error("Error fetching secret:", error);
        throw error;
    }
}

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