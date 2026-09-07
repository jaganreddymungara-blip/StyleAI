import RegisterForm from "../../components/auth/RegisterForm";
import AuthImage from "../../components/auth/AuthImage";

export default function Register() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FAF8F5]">
      <RegisterForm />
      <AuthImage />
    </div>
  );
}