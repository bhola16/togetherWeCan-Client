"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validation
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const passwordValid = hasUppercase && hasLowercase && hasMinLength;

  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  // Email registration
  const handleEmailSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || socialLoading) return;

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const passwordValue = String(formData.get("password") ?? "");

    // Validate required fields
    if (!name || !email || !passwordValue) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate password
    if (!passwordValid) {
      toast.error("Please meet all password requirements.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password: passwordValue,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social registration
  const handleSocialSignUp = async (provider: "google" | "github") => {
    if (isSubmitting || socialLoading) return;

    setSocialLoading(provider);

    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signup",
      });

      if (error) {
        console.error(`${provider} OAuth error:`, error);
        toast.error(error.message || `Unable to sign up with ${provider}.`);
        setSocialLoading(null);
        return;
      }

      console.log(`${provider} OAuth response:`, data);
    } catch (err) {
      console.error(`${provider} sign-up failed:`, err);
      toast.error(`Unable to sign up with ${provider}. Please try again.`);
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-8 transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 sm:px-6 sm:py-10 lg:px-8">
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
              Join Our Community
            </span>

            <h2 className="mt-7 text-4xl font-extrabold leading-tight xl:text-5xl">
              Be the Reason Someone Smiles Today.
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-teal-100">
              Create an account, discover community events, connect with people,
              and make a positive impact together.
            </p>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10 border-t border-white/15 pt-6">
            <p className="text-sm text-teal-100">
              Small actions can create a big difference.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-5 sm:p-7 md:p-8 lg:p-12">
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
                  <span className="text-green-600 dark:text-green-400">
                    WeCan
                  </span>
                </h1>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <p className="text-sm font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
                Create Account
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Join TogetherWeCan!
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Create your account and start making a difference.
              </p>
            </div>

            {/* Register Form */}
            <form
              onSubmit={handleEmailSignUp}
              className="space-y-4"
              autoComplete="off"
              data-lpignore="true">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="off"
                    required
                    data-lpignore="true"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
                  />
                </div>
              </div>

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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
                  />
                </div>
              </div>

              {/* Profile Image URL */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Profile Image URL
                </label>

                <div className="relative">
                  <ImageIcon
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="imageUrl"
                    name="image"
                    type="url"
                    placeholder="Enter your profile image URL"
                    autoComplete="off"
                    data-lpignore="true"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    data-lpignore="true"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:bg-gray-800"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-teal-700 dark:hover:text-teal-400">
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-3 space-y-2 rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                  <p className="mb-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Password must contain:
                  </p>

                  <div className="flex items-center gap-2">
                    {hasMinLength ? (
                      <Check
                        size={15}
                        className="text-emerald-600 dark:text-emerald-400"
                      />
                    ) : (
                      <X size={15} className="text-gray-400" />
                    )}

                    <span
                      className={`text-xs ${
                        hasMinLength
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                      At least 6 characters
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasUppercase ? (
                      <Check
                        size={15}
                        className="text-emerald-600 dark:text-emerald-400"
                      />
                    ) : (
                      <X size={15} className="text-gray-400" />
                    )}

                    <span
                      className={`text-xs ${
                        hasUppercase
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                      At least one uppercase letter (A-Z)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasLowercase ? (
                      <Check
                        size={15}
                        className="text-emerald-600 dark:text-emerald-400"
                      />
                    ) : (
                      <X size={15} className="text-gray-400" />
                    )}

                    <span
                      className={`text-xs ${
                        hasLowercase
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                      At least one lowercase letter (a-z)
                    </span>
                  </div>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={!passwordValid || isSubmitting || !!socialLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-500">
                {isSubmitting ? "Creating Account..." : "Create Account"}

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

            {/* Social Registration Buttons */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                type="button"
                onClick={() => handleSocialSignUp("google")}
                disabled={!!socialLoading || isSubmitting}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-teal-500 dark:hover:bg-gray-700">
                <Image
                  src="/assets/google.png"
                  alt="Google"
                  width={19}
                  height={19}
                  className="shrink-0 object-contain"
                />
                <span>
                  {socialLoading === "google" ? "Connecting..." : "Register with Google"}
                </span>
              </Button>

              <Button
                type="button"
                onClick={() => handleSocialSignUp("github")}
                disabled={!!socialLoading || isSubmitting}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-teal-500 dark:hover:bg-gray-700">
                <Image
                  src="/assets/github.png"
                  alt="GitHub"
                  width={19}
                  height={19}
                  className="shrink-0 object-contain dark:invert"
                />
                <span>
                  {socialLoading === "github" ? "Connecting..." : "Register with GitHub"}
                </span>
              </Button>
            </div>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-teal-700 transition hover:text-teal-900 hover:underline dark:text-teal-400 dark:hover:text-teal-300">
                Login Here
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

export default Register;
