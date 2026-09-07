import LoginForm from "../../components/auth/LoginForm";
import AuthImage from "../../components/auth/AuthImage";

export default function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FAF8F5]">
      <LoginForm />
      <AuthImage />
    </div>
  );
}