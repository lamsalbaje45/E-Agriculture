import jwt from "jsonwebtoken";

export function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
      region: user.region,
      photoUrl: user.photo_url,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}
