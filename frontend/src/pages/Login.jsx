// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:4000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     console.log(data);
//     localStorage.setItem("token", data.token);
    
//   };
//   return (
//     <div className="d-flex justify-content-center align-items-center py-5">
//       <form action="" onSubmit={handleLogin}>
//         <div className="text-center">
//         <span className="text-primary fw-bold fs-5">Workasana</span>
//           <h1>Login in to your account</h1>
//           <p>please enter your details</p>
//         </div>

//         <label htmlFor="">Email</label>
//         <br />
//         <input className="form-control" type="text" onChange={(e) => setEmail(e.target.value)} />
//         <br />

//         <label htmlFor="">Password</label>
//         <br />
//         <input className="form-control" type="text" onChange={(e) => setPassword(e.target.value)} />
//         <br />
       

//         <button type="submit" className="btn btn-primary w-100">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed"); 
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("users", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <form onSubmit={handleLogin}>
        <div className="text-center">
          <span className="text-primary fw-bold fs-5">Workasana</span>
          <h1>Login to your account</h1>
          <p>Please enter your details</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <label>Email</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label>Password</label>
        <input
          className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
