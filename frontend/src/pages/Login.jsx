import { Link } from "react-router-dom";

export default function Login(){
  return(
    <div className="page">
      <div className="auth-wrapper">

        <div className="auth-left">
          <h1>Welcome Back to KrishiConnect</h1>
          <p>Buy fresh organic vegetables directly from local farmers across Nepal.</p>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <h2>Login</h2>

            <input type="email" placeholder="Email address"/>
            <input type="password" placeholder="Password"/>

            <button className="auth-btn">Login</button>

            <div className="auth-footer">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}