export const LoginScreen = () => {
  return (
    <div className="d-flex align-items-center" style={{ height: '100vh' }}>
      <main className="text-center container w-25-lg">
        <div className="row">
          <div className="col-sm mb-5">
            <form>
              <h1 className="h3 mb-3 fw-normal">Sign In</h1>

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <button
                className="w-100 btn btn-lg btn-primary mt-3"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>

          <div className="col-sm mb-5">
            <form>
              <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  placeholder="First and last name"
                />
                <label htmlFor="floatingName">Full name</label>
              </div>

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPasswordVerify"
                  placeholder="Password verify"
                />
                <label htmlFor="floatingPasswordVerify">Password verify</label>
              </div>

              <button
                className="w-100 btn btn-lg btn-primary mt-3"
                type="submit"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
