// import { countries, currencies, banks, auth } from "./network-modules";
const Network = require("../lib")

const auth = Network.createModule("/auth", module => ({
  login: body => module.post("/", body)
}));



const backendAPI = Network.create({
  modules: { auth },
});

console.log(backendAPI)

// backendAPI.auth.login(values);
