import TYPES from "./types";
import path from "path";
/**
 *
 */

function createModule(root, buildModule) {
  const methods = ["get", "post", "put", "delete", "patch", "request"];
  const moduleConstruct = {};

  methods.forEach(method => {
    moduleConstruct[method] = httpMethod(method, root);
  });

  const module = buildModule(moduleConstruct);

  return { type: TYPES.MODULE, root, module };
}

function httpMethod(method, root) {
  return (uri, body, options) => {
    return {
      method,
      uri: path.join(root, uri),
      body,
      options
    };
  };
}

export default createModule;
