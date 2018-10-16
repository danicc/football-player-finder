import { getAge } from "./index";

describe("Utils test - get age method", () => {
  it("should return a negative value when it get a non date parameter", () => {
    const age = getAge("not a date");
    expect(age < 0).toBe(true);
  });
  it("should return a negative value when it get a falsy parameter", () => {
    const age = getAge(null);
    expect(age < 0).toBe(true);
  });
  it("should return the correct age", () => {
    const fixedDate = new Date("2018/10/14");
    Date.now = jest.fn().mockReturnValueOnce(fixedDate);
    const age = getAge(new Date("1991/06/29"));

    expect(age).toEqual(27);
  });
});
