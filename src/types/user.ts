import { InferType, ValidationError, mixed, number, object, string } from "yup";
import { Gender } from "./gender";

export const userSchema = object({
  id: string().uuid(),
  firstName: string()
    .required()
    .min(5, "First name should be at lest 5 characters long")
    .max(20, "First name should be at most 20 characters long"),
  lastName: string()
    .required()
    .min(5, "Last name should be at lest 5 characters long")
    .max(20, "Last name should be at most 20 characters long"),
  gender: mixed<Gender>()
    .required()
    .test((v) => Object.values(Gender).includes(v)),
  age: number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .required()
    .positive()
    .when(["gender"], {
      is: (gender: Gender) => gender === Gender.Female,
      then: (schema) => schema.max(117, "The maximum age is 117 for females"),
    })
    .when(["gender"], {
      is: (gender: Gender) => gender === Gender.Male,
      then: (schema) => schema.max(112, "The maximum age is 112 for males"),
    }),
});

export type User = InferType<typeof userSchema>;

type ResultSuccess = {
  result: "success";
  user: User;
};

type ResultError = {
  result: "error";
  errors: string[];
};

export async function validateUser(
  user: unknown
): Promise<ResultSuccess | ResultError> {
  try {
    return { result: "success", user: await userSchema.validate(user) };
  } catch (err) {
    if (err instanceof ValidationError) {
      return { result: "error", errors: err.errors };
    } else {
      return { result: "error", errors: ["Something went really wrong :s"] };
    }
  }
}

export function isSameUser(userA: User, userB: User): boolean {
  if (userA.id === userB.id) return true;
  if (userA.age !== userB.age) return false;
  if (userA.firstName !== userB.firstName) return false;
  if (userA.lastName !== userB.lastName) return false;
  return true;
}
