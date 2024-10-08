// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, validateUser } from "@/types/user";
import { Error } from "@/types/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Error>
) {
  console.log("id.ts");
  if (!req.query.id) {
    res.status(400).json({ message: "no user id provided in path params" });
    return;
  }
  const id = req.query.id as string;
  const user = db.users.find((u) => u.id === id);
  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }
  if (req.method == "GET") {
    res.status(200).json(user);
  } else if (req.method == "PATCH") {
    const toUpdate = await validateUser({ ...user, ...req.body, id: user.id });
    if (toUpdate.result === "success") {
      db.users = db.users.map((u) =>
        u.id === toUpdate.user.id ? { ...toUpdate.user, id: u.id } : u
      );

      res.status(200).json(toUpdate.user);
    } else {
      res.status(400).json({
        message: "didn't meet user validations",
        errors: toUpdate.errors,
      });
    }
  } else if (req.method == "DELETE") {
    db.users = db.users.filter((u) => u.id !== user.id);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "no such method" });
  }
}
