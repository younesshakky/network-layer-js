import TYPES from "./types";

export function buildAxiosInstance(config = {}) {
  return Axios.create(config);
}

export function isValidModule(module) {
  return (module && module.type) === TYPES.MODULE ? true : false;
}

export function bindModuleToHttpMethods(module, instance) {
  const boundMethods = {};
  for (let key in module) {

    boundMethods[key] = function(...args) {
      const request = module[key](...args);
      return instance[request.method](
        request.uri,
        request.body,
        request.options
      );
    };
  }

  return boundMethods;
}
