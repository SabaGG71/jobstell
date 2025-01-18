"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";

import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import energy from "../../../../public/energy.svg";
import portal from "../../../../public/portal.png";
import logo from "../../../../app/icon.svg";
import google from "../../../../public/google.svg";
import facebook from "../../../../public/facebook.svg";
import sign from "../../../../public/energy.svg";
import error from "../../../../public/error.svg";
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

export default function SignUpPage() {
  return (
    <>
      <section className="bg-secondary-50 overflow-x-hidden">
        <div className="lg:grid max-lg:h-screen max-lg:items-center lg:min-h-screen relative top-0 left-0 xl:grid-cols-12">
          <section className="relative flex items-end max-xl:h-0 bg-[#0f0f0f] xl:h-full xl:col-span-6">
            <Link href="/">
              <Image
                className="rotate-180 w-[60px] h-[60px] max-2xl:left-[10%] max-xl:hidden max-xl:bg-secondary-700  bg-primary-900 hover:bg-primary-800 duration-300 transition-all hover:scale-105 hover:translate-x-[10px] box-shadow absolute top-[10%] left-[6%] z-50 px-[14px] rounded-full cursor-pointer"
                src={energy}
                alt="energy"
              />
            </Link>
            <Image
              className="absolute xl:flex  hidden   z-40 w-full top-0  inset-0 h-screen object-cover masky-bg-portal opacity-80"
              src={portal}
              quality={100}
              alt="portal"
            />
            <div className="relative hidden xl:block z-50">
              <h2 className="opacity-100 text-[56px] mb-[26px] font-[600] text-white max-xl:text-[42px] max-xl:leading-[50px]  z-50 leading-[64px] flex items-center ml-[60px] max-w-[75%] ">
                Enter the Portal of Progress
              </h2>
              <p className="ml-[60px] max-xl:text-[17px] hidden lg:flex z-50 leading-[30px] max-xl:max-w-[85%] max-w-[75%] text-[19px] mb-[95px] font-[400] text-secondary-100 relative pr-8">
                Discover a smarter, stronger, more confident YOU. Unlock
                AI-driven interviews tailored to your journey and step into your
                future.
              </p>
            </div>
          </section>
          <div className="h-screen z-[0] w-full  absolute top-0 right-0">
            <div
              className="absolute max-xl:w-full max-lg:left-0 right-[-5px] top-0 w-[50%] h-screen "
              style={{
                opacity: 0.18,
                borderRadius: "50px",
                backgroundImage: `radial-gradient(#212121 1.5px, transparent 1px), radial-gradient(#212121 1.5px, transparent 1px)`,
                backgroundSize: "30px 30px",
                backgroundPosition: "0 0, 30px 30px",
              }}
            />
          </div>
          <main className="flex min-h-screen w-full max-md:mt-0 items-center justify-center p-4 lg:col-span-7 lg:p-16 xl:col-span-6">
            <div className="grid w-full grow items-center px-4 sm:justify-center">
              <SignUp.Root>
                <Clerk.Loading>
                  {(isGlobalLoading) => (
                    <>
                      <SignUp.Step name="start">
                        <Card className="max-w-[500px] relative space-y-6 max-[350px]:ml-[-23px] rounded-3xl bg-white box-shadow-card z-50 px-6 py-3 shadow-lg sm:px-10 sm:w-[500px]">
                          <CardHeader className="relative flex flex-col items-center justify-center text-center">
                            <Link href="/">
                              <Image
                                className="absolute block xl:hidden rotate-180 left-[10px] top-[10px] box-shadow-card sm:left-[10px] h-10 w-10 cursor-pointer rounded-full bg-secondary-900  max-xl:block p-2 transition-all duration-300  hover:scale-105 hover:bg-primary-800 sm:h-12 sm:w-12"
                                src={energy}
                                alt="Back"
                              />
                            </Link>
                            <Image
                              className="h-12 relative mb-[25px] w-12 sm:h-14 sm:w-14"
                              src={logo}
                              alt="logo"
                            />
                            <CardTitle className="text-3xl block pt-5 font-bold tracking-tight md:text-4xl sm:text-4xl text-zinc-950 lg:text-4xl">
                              Sign up to Jobstell
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="grid gap-y-4">
                            <div className="flex flex-col gap-4">
                              <Clerk.Connection
                                className="mt-[-20px]"
                                name="google"
                                asChild
                              >
                                <Button
                                  className="flex flex-row h-[53px] justify-center border text-center w-full border-secondary-300 gap-[15px] items-center  hover:scale-95 duration-300 transition-all text-secondary-900 text-[16px] font-[400]  py-[13px] px-5 rounded-full"
                                  variant="outline"
                                  type="button"
                                  disabled={isGlobalLoading}
                                >
                                  <Image
                                    src={google}
                                    className="w-[20px] h-[20px]"
                                    alt="google"
                                  />
                                  Sign Up With Google
                                </Button>
                              </Clerk.Connection>
                              <Clerk.Connection name="facebook" asChild>
                                <Button
                                  className="flex flex-row h-[53px] justify-center border hover:scale-95 box-shadow transition-all duration-300 text-center w-full border-secondary-200 hover:bg-primary-400 hover:text-white box-shadow bg-primary-400 gap-[15px] items-center text-white text-[16px] font-[400]  py-[13px] px-5 rounded-full "
                                  variant="outline"
                                  type="button"
                                  disabled={isGlobalLoading}
                                >
                                  <Image
                                    src={facebook}
                                    className="w-[20px] h-[20px]"
                                    alt="facebook"
                                  />
                                  Sign Up With Facebook
                                </Button>
                              </Clerk.Connection>
                            </div>
                            <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border mb-2 after:h-px after:flex-1 after:bg-border">
                              or
                            </p>
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
                                className="mt-2 w-full rounded-full bg-white px-3.5 h-[45px] py-[13px] text-base outline-none border-secondary-300 "
                                type="email"
                                required
                                asChild
                              >
                                <Input />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                            <Clerk.Field name="password" className="space-y-2">
                              <Clerk.Label asChild>
                                <Label className="text-base font-normal text-secondary-500 sm:text-lg">
                                  ✶ Password
                                </Label>
                              </Clerk.Label>
                              <Clerk.Input
                                className="mt-2 w-full rounded-full bg-white px-3.5 h-[45px] py-[13px] text-base outline-none border-secondary-300 "
                                type="password"
                                required
                                asChild
                              >
                                <Input />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-red-400 font-[600] mt-[8px]"></Clerk.FieldError>
                            </Clerk.Field>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignUp.Captcha className="empty:hidden mb-4 mt-[-20px]" />
                              <SignUp.Action submit asChild>
                                <Button
                                  className="w-full h-[53px] box-shadow mt-[-25px] rounded-full bg-primary-500 px-4 py-3 text-center text-base box-shadow font-medium text-white shadow transition-all hover:scale-95 duration-300 hover:bg-primary-600 sm:text-lg"
                                  disabled={isGlobalLoading}
                                >
                                  Continue
                                  <Image src={sign} alt="arrow-right" />
                                </Button>
                              </SignUp.Action>
                              <Button variant="link" asChild>
                                <Clerk.Link
                                  className="pt-3 text-center text-sm text-zinc-500 sm:text-base"
                                  navigate="sign-in"
                                >
                                  Already have an account? Sign in
                                </Clerk.Link>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignUp.Step>

                      <SignUp.Step name="continue">
                        <Card className="w-full sm:w-96">
                          <CardHeader>
                            <CardTitle>Continue registration</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Clerk.Field name="username" className="space-y-2">
                              <Clerk.Label>
                                <Label>Username</Label>
                              </Clerk.Label>
                              <Clerk.Input type="text" required asChild>
                                <Input />
                              </Clerk.Input>

                              <Clerk.FieldError className="block text-base text-destructive" />
                            </Clerk.Field>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignUp.Action submit asChild>
                                <Button disabled={isGlobalLoading}>
                                  Continue
                                </Button>
                              </SignUp.Action>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignUp.Step>

                      <SignUp.Step name="verifications">
                        <SignUp.Strategy name="email_code">
                          <Card className="w-full relative z-50 rounded-3xl py-3 max-md:ml-[-12px] sm:w-96 shadow-sm border border-[#212121]/20 text-center">
                            <CardHeader>
                              <CardTitle className="text-[30px] text-secondary-900 mb-2">
                                Verify your email
                              </CardTitle>
                              <CardDescription className="text-base">
                                Use the verification link sent to your email
                                address
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-y-4">
                              <div className="grid items-center justify-center gap-y-2">
                                <Clerk.Field name="code" className="space-y-2">
                                  <Clerk.Label className="sr-only">
                                    Email address
                                  </Clerk.Label>
                                  <div className="flex rounded-full justify-center text-center">
                                    <Clerk.Input
                                      type="otp"
                                      className="flex justify-center has-[:disabled]:opacity-50"
                                      autoSubmit
                                      render={({ value, status }) => {
                                        return (
                                          <div
                                            data-status={status}
                                            className={cn(
                                              "relative border border-primary-400    rounded-xl flex size-10 items-center justify-center border-y border-r ring-1  mb-3  ring-secondary-300 transition-all mx-2",
                                              {
                                                "z-10 ring-2 ring-ring ring-primary-400 rounded-full  gap-4 ring-offset-background":
                                                  status === "cursor" ||
                                                  status === "selected",
                                              }
                                            )}
                                          >
                                            {value}
                                            {status === "cursor" && (
                                              <div className="pointer-events-none gap-4 rounded-full absolute  flex items-center justify-center">
                                                <div className="mb-2 animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                              </div>
                                            )}
                                          </div>
                                        );
                                      }}
                                    />
                                  </div>
                                  <Clerk.FieldError>
                                    <div className="flex  py-2 rounded-xl gap-[10px] bg-red-50 items-center justify-center">
                                      <Image
                                        src={error}
                                        alt="error"
                                        width={20}
                                        height={20}
                                      />
                                      <Clerk.FieldError className="block text-center text-base font-[600] text-destructive" />
                                    </div>
                                  </Clerk.FieldError>
                                </Clerk.Field>
                                <SignUp.Action
                                  asChild
                                  resend
                                  className="text-muted-foreground"
                                  fallback={({ resendableAfter }) => (
                                    <Button variant="link" disabled>
                                      Didn&apos;t receive a code? Resend (
                                      <span className="tabular-nums">
                                        {resendableAfter}
                                      </span>
                                      )
                                    </Button>
                                  )}
                                >
                                  <Button type="button" variant="link">
                                    Didn&apos;t receive a code? Resend
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
                                    <Image src={sign} alt="sign" />{" "}
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
          <p className="hidden max-md:hidden text-white opacity-0 max-xl:block mt-[205px]">
            Hello
          </p>
        </div>
      </section>
    </>
  );
}
