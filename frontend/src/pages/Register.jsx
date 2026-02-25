import { Link } from "react-router-dom";

export default function Register(){
  return(
    <div className="page">
      <div className="auth-wrapper">

        <div className="auth-left">
          <h1>Join KrishiConnect</h1>
          <p>Create your account and start buying fresh vegetables directly from farmers.</p>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <h2>Register</h2>

            <input type="text" placeholder="Full Name"/>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>

            <button className="auth-btn">Create Account</button>

            <div className="auth-footer">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}