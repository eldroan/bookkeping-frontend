import { isSameUser, User, validateUser } from "@/types/user";
import { Error } from "@/types/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import { Gender } from "@/types/gender";

// Lets imagine this is a db
export const db = {
  users: [
    {
      id: "f796a0ec-b34c-4a10-9b6b-44c715f667de",
      firstName: "Shoyo",
      lastName: "Hinata",
      age: 15,
      gender: Gender.Male,
    },
    {
      id: "f54afeb7-029e-4988-ba0a-cdae4df0ab1a",
      firstName: "Kei",
      lastName: "Tsukishima",
      age: 16,
      gender: Gender.Male,
    },
    {
      id: "6d3be833-80ec-4665-88df-974adb559b59",
      firstName: "Tobio",
      lastName: "Kageyama",
      age: 16,
      gender: Gender.Male,
    },
    {
      id: "45b42bef-bbed-4843-a6cd-b5a0974913ab",
      firstName: "Kiyoko",
      lastName: "Shimizu",
      age: 18,
      gender: Gender.Female,
    },
    {
      id: "f43ffb9a-b7d8-435c-86cd-becc174dcf97",
      firstName: "Tōru",
      lastName: "Oikawa",
      age: 18,
      gender: Gender.Male,
    },
  ],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | User[] | Error>
) {
  if (req.method == "GET") {
    res.status(200).json(db.users);
  } else if (req.method == "POST") {
    const parsedUser = await validateUser(req.body);
    if (parsedUser.result === "success") {
      const newUser = { ...parsedUser.user, id: randomUUID() };
      const existingUser = db.users.find((u) => isSameUser(u, newUser));
      if (existingUser) {
        res.status(200).json(existingUser);
      } else {
        db.users = [...db.users, newUser];
        res.status(201).json(newUser);
      }
    } else {
      res.status(400).json({
        message: "didn't meet user validations",
        errors: parsedUser.errors,
      });
    }
  } else {
    res.status(404).json({ message: "no such method" });
  }
}
