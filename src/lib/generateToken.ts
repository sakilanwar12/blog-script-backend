import jwt from "jsonwebtoken";

interface IGenerateToken {
  payload: jwt.JwtPayload;
  secret: jwt.Secret;
  expiresIn: jwt.SignOptions["expiresIn"];
}
export const generateToken = ({
  payload,
  secret,
  expiresIn,
}: IGenerateToken) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export interface TDecodedToken extends jwt.JwtPayload {
  userId: string;
  role: string;
}

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as TDecodedToken;
};
