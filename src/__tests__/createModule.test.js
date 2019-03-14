import createModule from "../createModule"

describe("createModule function", () => {
  const creds = {
    username: "younesshakky",
    password: "rightpassword"
  };

  const auth = createModule("/auth", ({ post }) => ({
    login: body => post("/login", body),

    verifyToken: token => post("/verify/token", null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }));

  const loginObject = auth.module.login(creds);

  it("does have a 'login' property", () => {
    expect(auth.module).toHaveProperty("login");
  });

  it("does have request object properties", () => {

    expect(loginObject).toHaveProperty("method");
    expect(loginObject).toHaveProperty("body");
    expect(loginObject).toHaveProperty("uri");
  });

  it("checks request object properties' values", () => {
    expect(loginObject.uri).toBe("/auth/login");
    expect(loginObject.method).toBe("post");
    expect(loginObject.body).toEqual(creds);
  })

  it("does have have options propery", () => {
    const token = "SOME.JWT.TOKEN"
    const verify = auth.module.verifyToken(token)
    expect(verify).toHaveProperty("options")
    expect(verify.options).toHaveProperty("headers")
    expect(verify.options.headers.Authorization).toBe(`Bearer ${token}`)
  })
});
