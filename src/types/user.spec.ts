import { Gender } from "./gender";
import { validateUser } from "./user";

describe("User test suite", () => {
  describe("Gender field", () => {
    test("is required", async () => {
      const mock = { firstName: "Leandro", lastName: "Amarillo", age: 29 };
      const validation = await validateUser(mock);
      expect(validation.result).toBe("error");
    });
    test("is either male or female", async () => {
      const mock = { firstName: "Leandro", lastName: "Amarillo", age: 29 };
      const testCases = [
        { input: { ...mock, gender: "male" }, expected: "success" },
        { input: { ...mock, gender: Gender.Male }, expected: "success" },
        { input: { ...mock, gender: "female" }, expected: "success" },
        { input: { ...mock, gender: Gender.Female }, expected: "success" },
        { input: { ...mock, gender: "Female" }, expected: "error" },
        { input: { ...mock, gender: "unknown" }, expected: "error" },
      ];

      testCases.forEach(async (tc) => {
        const validation = await validateUser(tc.input);
        expect(validation.result).toBe(tc.expected);
      });
    });
  });
  describe("Age field", () => {
    test("is required", async () => {
      const mock = {
        firstName: "Leandro",
        lastName: "Amarillo",
        gender: Gender.Male,
      };
      const validation = await validateUser(mock);
      expect(validation.result).toBe("error");
    });
    test("is numeric", async () => {
      const mock = {
        firstName: "Leandro",
        lastName: "Amarillo",
        gender: Gender.Male,
        age: "something weird here",
      };
      const validation = await validateUser(mock);
      expect(validation.result).toBe("error");
    });
    test("is positive", async () => {
      const mock = {
        firstName: "Leandro",
        lastName: "Amarillo",
        gender: Gender.Male,
        age: -1,
      };
      const validation = await validateUser(mock);
      expect(validation.result).toBe("error");
    });
    test("is at most 112 for male", async () => {
      const mock = {
        firstName: "Leandro",
        lastName: "Amarillo",
        gender: Gender.Male,
      };
      const testCases = [
        { input: { ...mock, age: 10 }, expected: "success" },
        { input: { ...mock, age: 112 }, expected: "success" },
        { input: { ...mock, age: 113 }, expected: "error" },
      ];

      testCases.forEach(async (tc) => {
        const validation = await validateUser(tc.input);
        expect(validation.result).toBe(tc.expected);
      });
    });
    test("is at most 117 for female", async () => {
      const mock = {
        firstName: "Leandro",
        lastName: "Amarillo",
        gender: Gender.Female,
      };
      const testCases = [
        { input: { ...mock, age: 10 }, expected: "success" },
        { input: { ...mock, age: 112 }, expected: "success" },
        { input: { ...mock, age: 113 }, expected: "success" },
        { input: { ...mock, age: 117 }, expected: "success" },
        { input: { ...mock, age: 118 }, expected: "error" },
      ];

      testCases.forEach(async (tc) => {
        const validation = await validateUser(tc.input);
        expect(validation.result).toBe(tc.expected);
      });
    });
  });

  describe("First name field", () => {
    test("is required", async () => {
      const mock = { lastName: "Amarillo", age: 29, gender: Gender.Male };
      const validation = await validateUser(mock);
      expect(validation.result).toBe("error");
    });
    test("is between 5 and 20 characters", async () => {
      const mock = { lastName: "Amarillo", age: 29, gender: Gender.Male };
      const testCases = [
        { input: { ...mock, firstName: "Pepe" }, expected: "error" },
        { input: { ...mock, firstName: "Leandro" }, expected: "success" },
        {
          input: { ...mock, firstName: "xxxxxxxxxxxxxxxxxxxx" },
          expected: "success",
        },
        {
          input: { ...mock, firstName: "xxxxxxxxxxxxxxxxxxxxx" },
          expected: "error",
        },
        {
          input: { ...mock, firstName: 1234 },
          expected: "error",
        },
      ];

      testCases.forEach(async (tc) => {
        const validation = await validateUser(tc.input);
        expect(validation.result).toBe(tc.expected);
      });
    });
  });

  describe("Last name field", () => {
    test("is required", async () => {
      const mock = { firstName: "Amarillo", age: 29, gender: Gender.Male };
      const validation = await validateUser(mock);
      expect(validation.result).toBe("error");
    });
    test("is between 5 and 20 characters", async () => {
      const mock = { firstName: "Amarillo", age: 29, gender: Gender.Male };
      const testCases = [
        { input: { ...mock, lastName: "Pepe" }, expected: "error" },
        { input: { ...mock, lastName: "Leandro" }, expected: "success" },
        {
          input: { ...mock, lastName: "xxxxxxxxxxxxxxxxxxxx" },
          expected: "success",
        },
        {
          input: { ...mock, lastName: "xxxxxxxxxxxxxxxxxxxxx" },
          expected: "error",
        },
        {
          input: { ...mock, lastName: 1234 },
          expected: "error",
        },
      ];

      testCases.forEach(async (tc) => {
        const validation = await validateUser(tc.input);
        expect(validation.result).toBe(tc.expected);
      });
    });
  });
});
