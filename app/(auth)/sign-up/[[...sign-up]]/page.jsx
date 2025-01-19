"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { memo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import energy from "../../../../public/energy.svg";
import portal from "../../../../public/portal.png";
import logo from "../../../../app/icon.svg";
import google from "../../../../public/google.svg";
import facebook from "../../../../public/facebook.svg";
import sign from "../../../../public/energy.svg";
import error from "../../../../public/error.svg";
import openEye from "../../../../public/eyeOpen.svg";
import closeEye from "../../../../public/eyeClose.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Loading spinner component with improved styling
const LoadingSpinner = () => (
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

// Background pattern component (keep your existing implementation)
const BackgroundPattern = memo(() => (
  <div
    className="absolute max-xl:w-full max-lg:left-0 right-[-5px] top-0 w-[50%] h-screen"
    style={{
      opacity: 0.18,
      borderRadius: "50px",
      backgroundImage: `radial-gradient(#212121 1.5px, transparent 1px), radial-gradient(#212121 1.5px, transparent 1px)`,
      backgroundSize: "30px 30px",
      backgroundPosition: "0 0, 30px 30px",
    }}
  />
));
BackgroundPattern.displayName = "BackgroundPattern";

// OTP Input component (keep your existing implementation)
const OTPInput = memo(({ value, status }) => (
  <div
    data-status={status}
    className={cn(
      "relative border border-primary-400 rounded-xl flex size-10 items-center justify-center border-y border-r ring-1 mb-3 ring-secondary-300 transition-all mx-2",
      {
        "z-10 ring-2 ring-ring ring-primary-400 rounded-full gap-4 ring-offset-background":
          status === "cursor" || status === "selected",
      }
    )}
  >
    {value}
    {status === "cursor" && (
      <div className="pointer-events-none gap-4 rounded-full absolute flex items-center justify-center">
        <div className="mb-2 animate-caret-blink h-4 w-px bg-foreground duration-1000" />
      </div>
    )}
  </div>
));
OTPInput.displayName = "OTPInput";

// CAPTCHA widget component
const CaptchaWidget = memo(() => {
  useEffect(() => {
    if (!document.getElementById("clerk-captcha")) {
      const captchaDiv = document.createElement("div");
      captchaDiv.id = "clerk-captcha";
      document.body.appendChild(captchaDiv);
    }
  }, []);

  return <div id="clerk-captcha" className="mt-4" />;
});
CaptchaWidget.displayName = "CaptchaWidget";

export default function SignUpPage() {
  // Authentication hooks
  const { isLoaded, userId, isSignedIn } = useAuth();
  const router = useRouter();

  // Component state
  const [shouldRender, setShouldRender] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(0);
  const [verificationSent, setVerificationSent] = useState(false);
  const [redirectInProgress, setRedirectInProgress] = useState(false);

  // Enhanced authentication and redirect control
  useEffect(() => {
    let redirectTimer;
    let renderTimer;

    const handleAuthState = async () => {
      if (isLoaded) {
        if (isSignedIn) {
          setRedirectInProgress(true);
          // Immediate redirect attempt
          try {
            await router.push("/dashboard");
          } catch (error) {
            console.error("Redirect failed:", error);
            setRedirectInProgress(false);
          }
        } else {
          // Slight delay before showing signup form to prevent flash
          renderTimer = setTimeout(() => {
            setShouldRender(true);
          }, 100);
        }
      }
    };

    handleAuthState();

    // Cleanup timers
    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
      if (renderTimer) clearTimeout(renderTimer);
    };
  }, [isLoaded, isSignedIn, router]);

  // Handle resend verification code
  const handleResendCode = () => {
    if (resendTimeout > 0) return;

    setResendTimeout(30);
    setVerificationSent(true);

    const timer = setInterval(() => {
      setResendTimeout((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Show loading state during authentication check or redirect
  if (!isLoaded || !shouldRender || isSignedIn || redirectInProgress) {
    return <LoadingSpinner />;
  }

  // Only render the signup form if explicitly allowed and user is not authenticated
  if (shouldRender && !isSignedIn) {
    return (
      <section className="bg-secondary-50 overflow-x-hidden">
        <div className="lg:grid max-lg:h-screen max-lg:items-center lg:min-h-screen relative top-0 left-0 xl:grid-cols-12">
          {/* Left section with background image */}
          <section className="relative flex items-end max-xl:h-0 bg-[#0f0f0f] xl:h-full xl:col-span-6">
            <Link href="/">
              <Image
                className="rotate-180 w-[60px] h-[60px] max-2xl:left-[10%] max-xl:hidden max-xl:bg-secondary-700 bg-primary-900 hover:bg-primary-800 duration-300 transition-all hover:scale-105 hover:translate-x-[10px] box-shadow absolute top-[10%] left-[6%] z-50 px-[14px] rounded-full cursor-pointer"
                src={energy}
                alt="Back to home"
                priority
              />
            </Link>
            <Image
              className="absolute xl:flex hidden z-40 w-full top-0 inset-0 h-screen object-cover masky-bg-portal opacity-80"
              src={portal}
              quality={100}
              alt="Portal background"
              priority
            />
            <div className="relative hidden xl:block z-50">
              <h2 className="opacity-100 text-[56px] mb-[26px] font-[600] text-white max-xl:text-[42px] max-xl:leading-[50px] z-50 leading-[64px] flex items-center ml-[60px] max-w-[75%]">
                Enter the Portal of Progress
              </h2>
              <p className="ml-[60px] max-xl:text-[17px] hidden lg:flex z-50 leading-[30px] max-xl:max-w-[85%] max-w-[75%] text-[19px] mb-[95px] font-[400] text-secondary-100 relative pr-8">
                Discover a smarter, stronger, more confident YOU. Unlock
                AI-driven interviews tailored to your journey and step into your
                future.
              </p>
            </div>
          </section>

          {/* Background pattern */}
          <div className="h-screen z-[0] w-full absolute top-0 right-0">
            <BackgroundPattern />
          </div>

          {/* Main signup form section */}
          <main className="flex min-h-screen w-full max-md:mt-0 items-center justify-center p-4 lg:col-span-7 lg:p-16 xl:col-span-6">
            <div className="grid w-full grow items-center px-4 sm:justify-center">
              <SignUp.Root>
                <Clerk.Loading>
                  {(isGlobalLoading) => (
                    <>
                      {/* Initial signup step */}
                      <SignUp.Step name="start">
                        <Card className="max-w-[500px] relative space-y-6 max-[350px]:ml-[-23px] rounded-3xl bg-white box-shadow-card z-50 px-2 py-2 shadow-lg sm:px-10 sm:w-[500px]">
                          <CardHeader className="relative flex flex-col items-center justify-center text-center">
                            <Link href="/">
                              <Image
                                className="absolute block xl:hidden rotate-180 left-[10px] top-[10px] box-shadow-card sm:left-[10px] h-10 w-10 cursor-pointer rounded-full bg-secondary-900 max-xl:block p-2 transition-all duration-300 hover:scale-105 hover:bg-primary-800 sm:h-12 sm:w-12"
                                src={energy}
                                alt="Back to home"
                                priority
                              />
                            </Link>
                            <Image
                              className="h-12 relative mb-[25px] w-12 sm:h-14 sm:w-14"
                              src={logo}
                              alt="Jobstell logo"
                              priority
                            />
                            <CardTitle className="text-3xl block pt-5 font-bold tracking-tight md:text-4xl sm:text-4xl text-zinc-950 lg:text-4xl">
                              Sign up to Jobstell
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="grid gap-y-4">
                            {/* Social login buttons */}
                            <div className="flex flex-col gap-4">
                              <Clerk.Connection
                                className="mt-[-20px]"
                                name="google"
                                asChild
                              >
                                <Button
                                  className="flex flex-row h-[53px] justify-center border text-center w-full border-secondary-300 gap-[15px] items-center hover:scale-95 duration-300 transition-all text-secondary-900 text-[16px] font-[400] py-[13px] px-5 rounded-full"
                                  variant="outline"
                                  type="button"
                                  disabled={isGlobalLoading}
                                >
                                  <Image
                                    src={google}
                                    className="w-[20px] h-[20px]"
                                    alt="Google icon"
                                  />
                                  Sign Up With Google
                                </Button>
                              </Clerk.Connection>

                              <Clerk.Connection name="facebook" asChild>
                                <Button
                                  className="flex flex-row h-[53px] justify-center border hover:scale-95 box-shadow transition-all duration-300 text-center w-full border-secondary-200 hover:bg-primary-400 hover:text-white box-shadow bg-primary-400 gap-[15px] items-center text-white text-[16px] font-[400] py-[13px] px-5 rounded-full"
                                  variant="outline"
                                  type="button"
                                  disabled={isGlobalLoading}
                                >
                                  <Image
                                    src={facebook}
                                    className="w-[20px] h-[20px]"
                                    alt="Facebook icon"
                                  />
                                  Sign Up With Facebook
                                </Button>
                              </Clerk.Connection>
                            </div>

                            {/* Divider */}
                            <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border mb-2 after:h-px after:flex-1 after:bg-border">
                              or continue with email
                            </p>

                            {/* Email field */}
                            <Clerk.Field
                              name="emailAddress"
                              className="space-y-2"
                            >
                              <Clerk.Label asChild>
                                <Label className="text-base font-normal text-secondary-500 sm:text-lg">
                                  ✶ Email address
                                </Label>
                              </Clerk.Label>
                              <Clerk.Input
                                className="mt-2 w-full rounded-full bg-white px-3.5 h-[45px] py-[13px] text-base outline-none border-secondary-300"
                                type="email"
                                required
                                asChild
                              >
                                <Input />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive mt-1" />
                            </Clerk.Field>

                            {/* Password field */}
                            <Clerk.Field name="password" className="space-y-2">
                              <Clerk.Label asChild>
                                <Label className="text-base font-normal text-secondary-500 sm:text-lg">
                                  ✶ Password
                                </Label>
                              </Clerk.Label>
                              <div className="relative">
                                <Clerk.Input
                                  className="mt-2 w-full rounded-full bg-white px-3.5 h-[45px] py-[13px] text-base outline-none border-secondary-300"
                                  type={isShown ? "text" : "password"}
                                  required
                                  asChild
                                >
                                  <Input />
                                </Clerk.Input>
                                <Image
                                  className={`${
                                    isShown ? "hidden" : "block"
                                  } absolute hover:scale-110 duration-300 transition-all top-1/2 cursor-pointer opacity-70 right-[15px] -translate-y-1/2`}
                                  src={openEye}
                                  onClick={() => setIsShown(!isShown)}
                                  alt="Show password"
                                />
                                <Image
                                  className={`${
                                    isShown ? "block" : "hidden"
                                  } absolute hover:scale-110 duration-300 transition-all top-1/2 cursor-pointer opacity-70 right-[14px] w-[30px] h-[30px] -translate-y-1/2 mt-1 ml-[10px]`}
                                  src={closeEye}
                                  onClick={() => setIsShown(!isShown)}
                                  alt="Hide password"
                                />
                              </div>
                              <Clerk.FieldError className="block text-sm text-red-400 font-[600] mt-[8px]" />
                            </Clerk.Field>

                            {/* CAPTCHA */}
                            <CaptchaWidget />
                          </CardContent>

                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              {/* Submit button */}
                              <SignUp.Action submit asChild>
                                <Button
                                  className="w-full h-[53px] box-shadow mt-[-62px] rounded-full bg-primary-500 px-4 py-3 text-center text-base box-shadow font-medium text-white shadow transition-all hover:scale-95 duration-300 hover:bg-primary-600 sm:text-lg"
                                  disabled={isGlobalLoading}
                                >
                                  Continue
                                  <Image src={sign} alt="Continue sign" />
                                </Button>
                              </SignUp.Action>

                              {/* Sign in link */}
                              <Button variant="link" asChild>
                                <Clerk.Link
                                  className="mt-[-8px] text-center text-sm text-zinc-500 sm:text-base"
                                  navigate="sign-in"
                                >
                                  Already have an account?{" "}
                                  <span className="font-[600]">Sign in</span>
                                </Clerk.Link>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignUp.Step>

                      {/* Verification step */}
                      <SignUp.Step name="verifications">
                        <SignUp.Strategy name="email_code">
                          <Card className="w-full relative z-50 rounded-3xl py-3 max-md:ml-[-12px] sm:w-96 shadow-sm border border-[#212121]/20 text-center">
                            <CardHeader>
                              <CardTitle className="text-[30px] text-secondary-900 mb-2">
                                Verify your email
                              </CardTitle>
                              <CardDescription className="text-base">
                                {verificationSent
                                  ? "New verification code sent to your email"
                                  : "Use the verification link sent to your email address"}
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="grid gap-y-4">
                              <div className="grid items-center justify-center gap-y-2">
                                <Clerk.Field name="code" className="space-y-2">
                                  <Clerk.Label className="sr-only">
                                    Verification Code
                                  </Clerk.Label>
                                  <div className="flex rounded-full justify-center text-center">
                                    <Clerk.Input
                                      type="otp"
                                      className="flex justify-center has-[:disabled]:opacity-50"
                                      autoSubmit
                                      render={(props) => (
                                        <OTPInput
                                          value={props.value}
                                          status={props.status}
                                        />
                                      )}
                                    />
                                  </div>
                                  <Clerk.FieldError>
                                    <div className="flex py-2 rounded-xl gap-[10px] bg-red-50 items-center justify-center">
                                      <Image
                                        src={error}
                                        alt="Error icon"
                                        width={20}
                                        height={20}
                                      />
                                      <Clerk.FieldError className="block text-center text-base font-[600] text-destructive" />
                                    </div>
                                  </Clerk.FieldError>
                                </Clerk.Field>

                                {/* Resend code button */}
                                <SignUp.Action
                                  resend
                                  onClick={handleResendCode}
                                  disabled={resendTimeout > 0}
                                  asChild
                                >
                                  <Button
                                    variant="link"
                                    className="text-primary-500 hover:text-primary-600"
                                    disabled={resendTimeout > 0}
                                  >
                                    {resendTimeout > 0
                                      ? `Wait ${resendTimeout}s to resend code`
                                      : "Didn't receive a code? Resend"}
                                  </Button>
                                </SignUp.Action>
                              </div>
                            </CardContent>

                            <CardFooter>
                              <div className="grid w-full gap-y-4">
                                <SignUp.Action submit asChild>
                                  <Button
                                    className="box-shadow h-[53px] bg-primary-500 rounded-full hover:bg-primary-600 transition-all duration-300"
                                    disabled={isGlobalLoading}
                                  >
                                    Continue
                                    <Image src={sign} alt="Continue sign" />
                                  </Button>
                                </SignUp.Action>
                              </div>
                            </CardFooter>
                          </Card>
                        </SignUp.Strategy>
                      </SignUp.Step>
                    </>
                  )}
                </Clerk.Loading>
              </SignUp.Root>
            </div>
          </main>
        </div>
      </section>
    );
  }

  return null;
}
