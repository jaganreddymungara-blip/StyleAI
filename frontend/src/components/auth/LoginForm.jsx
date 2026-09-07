import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      localStorage.setItem("token", data.access_token);

      const loggedInUser = data.user || {
        name: data.name || email.split("@")[0],
        email: data.email || email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      localStorage.setItem(
        "userEmail",
        loggedInUser.email
      );

      toast.success("Welcome back!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(
          err.response.data?.detail ||
            "Invalid email or password."
        );
      } else {
        setError("Unable to connect to server.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-6 py-12 lg:px-12 overflow-hidden">

      {/* Background decoration */}

      <div className="absolute -top-32 -left-32 w-72 h-72 bg-yellow-300/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-200/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md"
      >

        {/* Brand */}

        <Link
          to="/"
          className="inline-flex items-center gap-3 mb-10 group"
        >

          <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
            <Sparkles
              size={20}
              className="text-yellow-400 group-hover:text-black"
            />
          </div>

          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Style<span className="text-yellow-500">AI</span>
            </h2>

            <p className="text-xs text-gray-400">
              Your AI Stylist
            </p>
          </div>

        </Link>


        {/* Heading */}

        <div className="mb-9">

          <p className="text-sm font-semibold text-yellow-600 mb-3">
            WELCOME BACK
          </p>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">
            Dress smarter.
            <br />
            <span className="text-yellow-500">
              Start styling.
            </span>
          </h1>

          <p className="mt-5 text-gray-500 leading-7">
            Sign in to access your wardrobe, personalized
            recommendations, and AI-powered styling.
          </p>

        </div>


        {/* Form */}

        <div className="space-y-5">

          {/* Email */}

          <div className="relative">

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              autoComplete="email"
              className="
                peer
                w-full
                h-16
                px-5
                pt-5
                pb-1
                rounded-2xl
                bg-white
                border
                border-gray-200
                text-gray-900
                outline-none
                shadow-sm
                transition-all
                duration-300
                focus:border-yellow-500
                focus:ring-4
                focus:ring-yellow-500/10
              "
            />

            <label
              htmlFor="email"
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
                transition-all
                duration-200
                peer-focus:top-3
                peer-focus:translate-y-0
                peer-focus:text-xs
                peer-focus:text-yellow-600
                peer-[:not(:placeholder-shown)]:top-3
                peer-[:not(:placeholder-shown)]:translate-y-0
                peer-[:not(:placeholder-shown)]:text-xs
              "
            >
              Email address
            </label>

          </div>


          {/* Password */}

          <div className="relative">

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              autoComplete="current-password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="
                peer
                w-full
                h-16
                px-5
                pr-14
                pt-5
                pb-1
                rounded-2xl
                bg-white
                border
                border-gray-200
                text-gray-900
                outline-none
                shadow-sm
                transition-all
                duration-300
                focus:border-yellow-500
                focus:ring-4
                focus:ring-yellow-500/10
              "
            />

            <label
              htmlFor="password"
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
                transition-all
                duration-200
                peer-focus:top-3
                peer-focus:translate-y-0
                peer-focus:text-xs
                peer-focus:text-yellow-600
                peer-[:not(:placeholder-shown)]:top-3
                peer-[:not(:placeholder-shown)]:translate-y-0
                peer-[:not(:placeholder-shown)]:text-xs
              "
            >
              Password
            </label>


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
                hover:text-gray-800
                transition
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>


          {/* Error */}

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
                text-sm
                text-red-600
              "
            >
              {error}
            </motion.div>
          )}


          {/* Login */}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="
              group
              w-full
              h-16
              rounded-2xl
              bg-black
              text-white
              font-bold
              text-lg
              flex
              items-center
              justify-center
              gap-3
              shadow-xl
              shadow-black/10
              hover:bg-yellow-500
              hover:text-black
              hover:-translate-y-0.5
              active:translate-y-0
              transition-all
              duration-300
              disabled:opacity-60
              disabled:cursor-not-allowed
              disabled:hover:bg-black
              disabled:hover:text-white
              disabled:hover:translate-y-0
            "
          >

            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in

                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}

          </button>

        </div>


        {/* Divider */}

        <div className="flex items-center gap-4 my-8">

          <div className="flex-1 h-px bg-gray-200" />

          <span className="text-xs font-semibold text-gray-400 tracking-wider">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-200" />

        </div>


        {/* Google */}

        <button
          type="button"
          className="
            w-full
            h-16
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
            shadow-sm
            hover:shadow-lg
            hover:border-gray-300
            hover:-translate-y-0.5
            transition-all
            duration-300
          "
        >

          <FcGoogle size={23} />

          Continue with Google

        </button>


        {/* Register */}

        <p className="text-center mt-8 text-gray-500">

          Don't have an account?

          <Link
            to="/register"
            className="
              ml-2
              font-bold
              text-gray-900
              hover:text-yellow-600
              transition
            "
          >
            Create account
          </Link>

        </p>


        {/* Security */}

        <div className="flex items-center justify-center gap-2 mt-8 text-xs text-gray-400">

          <ShieldCheck size={15} />

          Your account information is securely protected

        </div>

      </motion.div>

    </div>
  );
}