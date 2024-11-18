import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const createJWT = ({
  payload,
}: {
  payload: {
    name: string;
    userId: mongoose.Types.ObjectId;
    role: string;
  };
}) => {
  const secret = process.env.JWT_SECRET;
  const lifetime = process.env.JWT_LIFETIME;

  if (!secret || !lifetime) {
    throw new Error(
      "JWT_SECRET and JWT_LIFETIME must be defined in environment variables"
    );
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: lifetime,
  });

  return token;
};

const isTokenValid = ({ token }: { token: string }) => {
  const secret = process.env.JWT_SECRET;
  const lifetime = process.env.JWT_LIFETIME;

  if (!secret || !lifetime) {
    throw new Error(
      "JWT_SECRET and JWT_LIFETIME must be defined in environment variables"
    );
  }

  const payload = jwt.verify(token, secret);
  return payload as {
    name: string;
    userId: mongoose.Types.ObjectId;
    role: string;
  };
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
