import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
      });

      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(
          err.response.data?.detail ||
            "Registration failed."
        );
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full
    h-14
    pl-12
    pr-5
    rounded-2xl
    border
    border-gray-200
    bg-white
    text-gray-900
    placeholder:text-gray-400
    outline-none
    focus:border-yellow-500
    focus:ring-4
    focus:ring-yellow-500/10
    transition-all
    duration-300
  `;

  return (
    <div className="flex items-center justify-center px-6 sm:px-8 py-10 lg:py-12 bg-[#FAF8F5]">

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >

        {/* BRAND */}

        <motion.button
          type="button"
          onClick={() => navigate("/")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >

          <div className="
            w-10
            h-10
            rounded-xl
            bg-black
            text-white
            flex
            items-center
            justify-center
            font-black
            text-lg
          ">
            S
          </div>

          <span className="text-2xl font-black">
            Style<span className="text-yellow-500">AI</span>
          </span>

        </motion.button>


        {/* HEADING */}

        <div>

          <div className="
            inline-flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            bg-yellow-100
            text-yellow-700
            text-xs
            font-bold
          ">

            <Sparkles size={13} />

            START YOUR STYLE JOURNEY

          </div>


          <h1 className="
            text-4xl
            sm:text-5xl
            font-black
            text-gray-900
            tracking-tight
            mt-5
          ">
            Create your account
          </h1>


          <p className="
            mt-4
            text-gray-500
            text-base
            sm:text-lg
            leading-7
          ">
            Build your wardrobe and let StyleAI help
            you discover outfits that suit you.
          </p>

        </div>


        {/* FORM */}

        <div className="mt-8 space-y-4">

          {/* NAME */}

          <div className="relative">

            <User
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />

          </div>


          {/* EMAIL */}

          <div className="relative">

            <Mail
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />

          </div>


          {/* PASSWORD */}

          <div className="relative">

            <Lock
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-14`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-black
                transition
              "
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="relative">

            <Lock
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className={`${inputClass} pr-14`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-black
                transition
              "
            >
              {showConfirm ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>

          </div>


          {/* PASSWORD MATCH INDICATOR */}

          {confirmPassword && (
            <div
              className={`flex items-center gap-2 text-sm ${
                password === confirmPassword
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >

              <Check size={16} />

              {password === confirmPassword
                ? "Passwords match"
                : "Passwords do not match"}

            </div>
          )}


          {/* TERMS */}

          <label className="
            flex
            items-start
            gap-3
            text-sm
            text-gray-500
            cursor-pointer
            pt-1
          ">

            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) =>
                setTermsAccepted(e.target.checked)
              }
              className="
                mt-0.5
                w-4
                h-4
                accent-yellow-500
                cursor-pointer
              "
            />

            <span>
              I agree to the{" "}
              <span className="text-gray-900 font-semibold">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-gray-900 font-semibold">
                Privacy Policy
              </span>
              .
            </span>

          </label>


          {/* ERROR */}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-red-600
                text-sm
              "
            >
              {error}
            </motion.div>
          )}


          {/* CREATE ACCOUNT */}

          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="
              w-full
              h-14
              rounded-2xl
              bg-black
              text-white
              font-bold
              text-base
              flex
              items-center
              justify-center
              gap-3
              hover:bg-yellow-500
              hover:text-black
              transition-all
              duration-300
              shadow-lg
              hover:shadow-xl
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {loading ? (
              "Creating Account..."
            ) : (
              <>
                Create Account
                <ArrowRight size={19} />
              </>
            )}

          </button>

        </div>


        {/* DIVIDER */}

        <div className="flex items-center gap-4 my-7">

          <div className="flex-1 h-px bg-gray-200" />

          <span className="text-xs font-medium text-gray-400">
            OR CONTINUE WITH
          </span>

          <div className="flex-1 h-px bg-gray-200" />

        </div>


        {/* GOOGLE */}

        <button
          type="button"
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-gray-200
            bg-white
            flex
            items-center
            justify-center
            gap-3
            font-semibold
            text-gray-700
            hover:border-gray-300
            hover:shadow-md
            transition-all
            duration-300
          "
        >

          <FcGoogle size={23} />

          Continue with Google

        </button>


        {/* LOGIN */}

        <p className="
          text-center
          mt-7
          text-gray-500
          text-sm
        ">

          Already have an account?

          <Link
            to="/login"
            className="
              ml-2
              font-bold
              text-gray-900
              hover:text-yellow-600
              transition
            "
          >
            Sign in
          </Link>

        </p>


        {/* TRUST MESSAGE */}

        <p className="
          text-center
          text-xs
          text-gray-400
          mt-6
        ">
          Your information is securely handled by StyleAI.
        </p>

      </motion.div>

    </div>
  );
}