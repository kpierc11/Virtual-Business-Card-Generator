import "../../index.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const { onLogin, onLogout } = useContext(AuthContext);

  if (loading) {
    return (
      <>
        <div className="w-[100%] h-[400px] mt-20 flex flex-col justify-center items-center">
          <p className="mb-2">Logging In...</p>
          <span className="loading loading-dots loading-xl"></span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="card bg-base-100 w-96 card-border bg-base-100 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={(event) => onLogin(event, email, password)}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>
            </fieldset>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
            <fieldset className="fieldset mt-3">
              <legend className="fieldset-legend">Password</legend>
              <label className=" label input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>

                <input
                  type="password"
                  required
                  placeholder="Password"
                  //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </fieldset>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
            <div></div>
            <button
              className="btn mt-3 flex justify-self-center w-85"
              type="submit"
            >
              Login
            </button>
            <div className="flex justify-self-center font-bold mt-5">or</div>
          </form>
          {/* Google */}
          <button className="btn bg-white text-black border-[#e5e5e5] mt-3">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <span>Don't have an account?</span>
          <a className="link" href="/signup">
            Sign up
          </a>
        </div>
      </div>
    </>
  );
}
