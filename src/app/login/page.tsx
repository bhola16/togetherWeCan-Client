"use client";

import { authClient } from "@/lib/auth-client";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email Login
  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed. Please try again.");
        return;
      }

      if (data) {
        toast.success("Logged in successfully!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  // GitHub Login
  const handleGithubLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("GitHub login failed. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-8 transition-colors duration-300 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid w-full max-w-md overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 sm:max-w-lg md:max-w-xl lg:max-w-5xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-800 via-teal-800 to-emerald-700 p-10 text-white lg:flex">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-white/5" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[40px] border-white/5" />

          {/* Desktop Logo */}
          <div className="relative z-10">
            <Link href="/" className="group inline-flex items-center gap-3">
              <Image
                src="/assets/TogetherWeCan.png"
                alt="TogetherWeCan Logo"
                width={50}
                height={50}
                priority
                className="h-12 w-12 object-contain transition duration-300 group-hover:scale-105"
              />

              <h1 className="text-xl font-extrabold tracking-tight text-white">
                Together
                <span className="text-emerald-300">WeCan</span>
              </h1>
            </Link>
          </div>

          {/* Welcome Content */}
          <div className="relative z-10 my-12">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-200">
              Welcome Back
            </span>

            <h2 className="mt-7 text-4xl font-extrabold leading-tight xl:text-5xl">
              Together, We Can Make a Difference.
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-teal-100">
              Connect with your community, discover meaningful events, and
              become part of something bigger. Your journey starts here.
            </p>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10 border-t border-white/15 pt-6">
            <p className="text-sm text-teal-100">
              Building stronger communities, one event at a time.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-5 transition-colors duration-300 dark:bg-gray-900 sm:p-7 md:p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Link href="/" className="group inline-flex items-center gap-3">
                <Image
                  src="/assets/TogetherWeCan.png"
                  alt="TogetherWeCan Logo"
                  width={50}
                  height={50}
                  priority
                  className="h-12 w-12 object-contain transition duration-300 group-hover:scale-105"
                />

                <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Together
                  <span className="text-green-600 dark:text-emerald-400">
                    WeCan
                  </span>
                </h1>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
                Account Login
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Welcome Back!
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Sign in to continue your journey with TogetherWeCan.
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleEmailLogin}
              className="space-y-5"
              autoComplete="off"
              data-lpignore="true">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    required
                    data-lpignore="true"
                    data-1p-ignore="true"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-teal-500 dark:focus:bg-gray-800 dark:focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-teal-700 transition hover:text-teal-900 hover:underline dark:text-teal-400 dark:hover:text-teal-300">
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    data-lpignore="true"
                    data-1p-ignore="true"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-teal-500 dark:focus:bg-gray-800 dark:focus:ring-teal-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-teal-700 dark:text-gray-500 dark:hover:text-teal-400">
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50">
                {isSubmitting ? "Logging In..." : "Login to Your Account"}

                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

              <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Or continue with
              </span>

              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-bold text-gray-700 transition hover:border-teal-300 hover:bg-teal-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-teal-700 dark:hover:bg-gray-700">
                <Image
                  src="/assets/google.png"
                  alt="Google logo"
                  height={20}
                  width={20}
                />
                Login with Google
              </button>

              <button
                type="button"
                onClick={handleGithubLogin}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-bold text-gray-700 transition hover:border-teal-300 hover:bg-teal-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-teal-700 dark:hover:bg-gray-700">
                <Image
                  src="/assets/github.png"
                  alt="GitHub logo"
                  height={20}
                  width={20}
                />
                Login with GitHub
              </button>
            </div>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-teal-700 transition hover:text-teal-900 hover:underline dark:text-teal-400 dark:hover:text-teal-300">
                Create an Account
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} TogetherWeCan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;