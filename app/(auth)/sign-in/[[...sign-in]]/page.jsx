"use client";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import energy from "../../../../public/energy.svg";
import portal from "../../../../public/galaxy.png";
import logo from "../../../../app/icon.svg";
import sign from "../../../../public/energy.svg";
import google from "../../../../public/google.svg";
import facebook from "../../../../public/facebook.svg";
import openEye from "../../../../public/eyeOpen.svg";
import closeEye from "../../../../public/eyeClose.svg";

const LoadingScreen = () => (
  <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
    <div className="animate-pulse text-center flex flex-col items-center justify-center">
      <Image
        className="w-[50px] max-md:w-[38px] max-md:h-[3px] h-[50px]"
        src={logo}
        alt="logo"
      />
      <p className="text-[35px] max-md:text-[28px] mt-4 font-[700]">
        Loading The Portal...
      </p>
    </div>
  </div>
);

const ErrorMessage = ({ message, isRegistrationError = false }) => (
  <div className="text-center space-y-2 mb-2">
    <p className="text-red-500 text-base font-[600]">✶ {message}</p>
  </div>
);

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signIn, setActive, isLoading } = useSignIn();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistrationError, setIsRegistrationError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for error parameter in URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const signUpRequired = urlParams.get("signup_required");

      if (signUpRequired === "true") {
        setError("Please sign up first");
        setIsRegistrationError(true);
        // Clean up URL
        window.history.replaceState({}, "", "/sign-in");
      }
    }
  }, []);

  // Handle authentication state changes and redirects
  useEffect(() => {
    if (!mounted || !isLoaded) return;

    if (isSignedIn) {
      setRedirecting(true);
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router, mounted]);

  const handleGoogleSignIn = async () => {
    try {
      if (!signIn) return;
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sign-in?signup_required=true`,
        afterSignInUrl: "/dashboard",
        afterSignUpUrl: "/sign-up",
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      setError("Failed to sign in with Google. Please try again.");
      setIsRegistrationError(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      if (!signIn) return;
      await signIn.authenticateWithRedirect({
        strategy: "oauth_facebook",
        redirectUrl: `${window.location.origin}/sign-in?signup_required=true`,
        afterSignInUrl: "/dashboard",
        afterSignUpUrl: "/sign-up",
      });
    } catch (err) {
      console.error("Facebook sign in error:", err);
      setError("Failed to sign in with Facebook. Please try again.");
      setIsRegistrationError(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsRegistrationError(false);

    try {
      if (!signIn) return;

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setRedirecting(true);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Sign in error:", err);

      if (err.errors?.[0]?.message?.includes("no user")) {
        setError("This email is not registered.");
        setIsRegistrationError(true);
      } else {
        setError("Invalid email or password. Please try again.");
        setIsRegistrationError(false);
      }
    }
  };

  // Show loading screen while initializing
  if (!mounted || !isLoaded || redirecting) {
    return <LoadingScreen />;
  }

  // Return null if already signed in (redirect handled by effect)
  if (isSignedIn) {
    return null;
  }

  return (
    <section className="bg-secondary-50 relative overflow-x-hidden">
      <Link href="/">
        <Image
          className="rotate-180 w-[60px] h-[60px] max-2xl:left-[5%] max-xl:hidden max-xl:bg-secondary-700 bg-primary-900 hover:bg-primary-800 duration-300 transition-all hover:scale-105 hover:translate-x-[10px] box-shadow absolute top-[10%] left-[4%] z-50 px-[14px] rounded-full cursor-pointer"
          src={energy}
          alt="sign-arrow-2"
          priority
        />
      </Link>
      <div className="lg:grid max-lg:h-screen max-lg:items-center lg:min-h-screen relative top-0 left-0 xl:grid-cols-12">
        {/* Left Section */}
        <section className="relative flex items-end max-xl:h-0 bg-[#0f0f0f] xl:h-full xl:col-span-6">
          <Image
            className="absolute xl:flex hidden z-40 w-full top-0 inset-0 h-screen object-cover masky-bg-portal opacity-80"
            src={portal}
            quality={100}
            alt="portal"
            priority
          />
          <div className="relative hidden xl:block z-50">
            <h2 className="opacity-100 text-[56px] mb-[26px] font-[600] text-white max-xl:text-[42px] max-xl:leading-[50px] z-50 leading-[64px] flex items-center ml-[60px] max-w-[75%]">
              Welcome back to the portal!
            </h2>
            <p className="ml-[60px] max-xl:text-[17px] hidden lg:flex z-50 leading-[30px] max-xl:max-w-[85%] max-w-[75%] text-[19px] mb-[95px] font-[400] text-secondary-100 relative pr-8">
              Continue your journey to success, emerging smarter, more
              confident, and fully prepared for your next interview!
            </p>
          </div>
        </section>

        {/* Right Section */}
        <main className="flex min-h-screen w-full max-md:mt-0 items-center justify-center p-4 lg:col-span-7 lg:p-16 xl:col-span-6">
          <div className="grid w-full grow items-center px-4 sm:justify-center">
            <div className="h-screen z-0 w-full absolute top-0 right-0">
              <div
                className="absolute z-[-1] max-xl:w-full max-lg:left-0 right-[-5px] top-0 w-[50%] h-screen"
                style={{
                  opacity: 0.18,
                  borderRadius: "50px",
                  backgroundImage: `radial-gradient(#212121 1.5px, transparent 1px), radial-gradient(#212121 1.5px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                  backgroundPosition: "0 0, 30px 30px",
                }}
              />
            </div>

            <Card className="max-w-[500px] relative space-y-6 max-[350px]:ml-[-23px] rounded-3xl bg-white box-shadow-card z-50 px-6 py-3 shadow-lg sm:px-10 sm:w-[500px]">
              <CardHeader className="text-center flex flex-col justify-center items-center gap-5">
                <Image
                  className="h-12 w-12 mb-[-20px] sm:h-14 sm:w-14"
                  src={logo}
                  alt="logo"
                  priority
                />
                <Link href="/">
                  <Image
                    className="absolute block xl:hidden rotate-180 left-[10px] top-[10px] box-shadow-card sm:left-[10px] h-10 w-10 cursor-pointer rounded-full bg-secondary-900 max-xl:block p-2 transition-all duration-300 hover:scale-105 hover:bg-primary-800 sm:h-12 sm:w-12"
                    src={energy}
                    alt="Back"
                    priority
                  />
                </Link>
                <CardTitle className="text-3xl font-bold tracking-tight md:text-4xl sm:text-4xl text-zinc-950 lg:text-4xl relative">
                  Sign in to Jobstell
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-y-4">
                {error && (
                  <ErrorMessage
                    message={error}
                    isRegistrationError={isRegistrationError}
                  />
                )}

                <div className="flex flex-col w-full text-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="flex h-[53px] flex-row justify-center border text-center w-full border-secondary-300 gap-[15px] items-center hover:bg-white hover:scale-95 duration-300 transition-all text-secondary-900 text-[16px] font-[400] px-5 rounded-full"
                  >
                    <Image
                      src={google}
                      className="w-[20px] h-[20px]"
                      alt="Google"
                    />
                    Sign In With Google
                  </Button>

                  <Button
                    onClick={handleFacebookSignIn}
                    disabled={isLoading}
                    className="flex h-[53px] flex-row justify-center border hover:scale-95 box-shadow transition-all duration-300 text-center w-full border-secondary-200 bg-primary-400 hover:bg-primary-400 gap-[15px] items-center text-white text-[16px] font-[400] py-[13px] px-5 rounded-full"
                  >
                    <Image
                      src={facebook}
                      className="w-[20px] h-[20px]"
                      alt="facebook"
                    />
                    Sign In With Facebook
                  </Button>
                </div>

                <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 mt-3 font-[600] before:bg-border after:h-px after:flex-1 after:bg-border">
                  ✶ or
                </p>

                <form onSubmit={handleEmailSignIn}>
                  <div className="space-y-3">
                    <Label className="text-base font-normal text-secondary-500 sm:text-lg">
                      ✶ Email address
                    </Label>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-full px-4 h-[45px] outline-none border border-secondary-300 py-[13px]"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label className="text-base font-normal text-secondary-500 sm:text-lg">
                      ✶ Password
                    </Label>
                    <div className="relative">
                      <Input
                        type={isShown ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-full h-[45px] outline-none border px-4 border-secondary-300 py-[13px]"
                      />
                      <Image
                        className={`${
                          isShown ? "hidden" : "block"
                        } absolute hover:scale-110 duration-300 transition-all top-1/2 cursor-pointer opacity-70 right-[15px] -translate-y-1/2`}
                        src={openEye}
                        onClick={() => setIsShown(!isShown)}
                        alt="open-eye-svg"
                      />
                      <Image
                        className={`${
                          isShown ? "block" : "hidden"
                        } absolute hover:scale-110 duration-300 transition-all top-1/2 cursor-pointer opacity-70 right-[14px] w-[30px] h-[30px] -translate-y-1/2 mt-1 ml-[10px]`}
                        src={closeEye}
                        onClick={() => setIsShown(!isShown)}
                        alt="close-eye-svg"
                      />
                    </div>
                  </div>

                  <CardFooter className="px-0 mt-6">
                    <div className="grid w-full gap-y-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-full bg-primary-500 h-[53px] px-4 py-3 text-center text-base box-shadow font-medium text-white shadow transition-all hover:scale-95 duration-300 hover:bg-primary-600 sm:text-lg"
                      >
                        Sign In
                        <Image src={sign} alt="arrow-right" />
                      </Button>

                      <Button variant="link" size="sm" asChild>
                        <Link
                          href="/sign-up"
                          className="pt-2 h-[50px] text-center text-sm text-zinc-500 sm:text-base"
                        >
                          Don&apos;t have an account?{" "}
                          <span className="text-secondary-700">Sign up</span>
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>

        <p className="hidden max-md:hidden text-white opacity-0 max-xl:block mt-[205px]">
          Hello
        </p>
      </div>
    </section>
  );
}
