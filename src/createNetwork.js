import Axios from "axios";
import { isValidModule, bindModuleToHttpMethods } from "./helpers";
import TYPES from "./types";

const NETWORK_INSTANCE_DEFAULTS = {
  modules: {},
  middlewares: {},
  axiosInstance: null,
  axiosConfig: {}
};

export default function createNetwork({
  modules,
  middlewares, // shouldn't bother with middlewares now
  axiosConfig,
  axiosInstance
} = NETWORK_INSTANCE_DEFAULTS) {
  const _modules = {};

  const http = axiosInstance || Axios.create(axiosConfig);

  for (let key in modules) {
    if (isValidModule(modules[key])) {
      _modules[key] = bindModuleToHttpMethods(modules[key].module, http);
    }
  }

  return {
    type: TYPES.NETWORK,
    ..._modules
  };
}
