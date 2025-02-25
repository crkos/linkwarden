import type { NextApiRequest, NextApiResponse } from "next";
import getPublicUser from "@/lib/api/controllers/public/users/getPublicUser";
import { getToken } from "next-auth/jwt";

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  const requestingId = token?.id;

  const lookupId = req.query.id as string;

  // Check if "lookupId" is the user "id" or their "username"
  const isId = lookupId.split("").every((e) => Number.isInteger(parseInt(e)));

  if (req.method === "GET") {
    const users = await getPublicUser(lookupId, isId, requestingId);
    return res.status(users.status).json({ response: users.response });
  }
}
