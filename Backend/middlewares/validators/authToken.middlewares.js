import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

const authenticateTokenMiddleware = ( req, res, next) => {
  console.log("Access Token Secret:", process.env.JWT_SECRET);
  const token = req.cookies["token-Cookie"] || req.headers["authorization"]?.split(" ")[1];

  const accessTokenSecret = process.env.JWT_SECRET;



  if (!token || token === "null") {
    console.log(token);
    res.status(400).json({ message: "Unauthorized request" });
  } else if (!accessTokenSecret) {
    console.log("Access Token secret was missing in the env files");
    res.sendStatus(500);
  } else {
    try {
      let verifiedUser = jwt.verify(token, accessTokenSecret);
      req.user = verifiedUser;
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  }
};
export { authenticateTokenMiddleware };