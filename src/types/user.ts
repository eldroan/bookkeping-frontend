import { InferType, mixed, number, object, string } from "yup";
import { Gender } from "./gender";

const userSchema = object({
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
