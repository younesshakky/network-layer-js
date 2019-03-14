import Axios from "axios";
import { isValidModule, bindModuleToHttpMethods } from "../helpers";
import createModule from "../createModule";

describe("testing helper functions", () => {
  const testMod = createModule("/test", ({ get }) => ({
    list: () => get("/")
  }));

  describe("isValidModule", () => {
    it("checks if a given module is a valid one", () => {
      expect(isValidModule(testMod)).toBe(true);
    });
  });

  // describe("bindModuleToHttpMethods", () => {
  //   it("bind certain module to http methods", () => {
  //     const boundModule = bindModuleToHttpMethods(testMod.module, Axios.create({}));
  //     console.log(boundModule)
  //     expect(boundModule.list()).toReturn()
  //   });
  // });
});
