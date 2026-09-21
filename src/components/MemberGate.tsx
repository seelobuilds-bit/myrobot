"use client";

import Link from "next/link";
import { useState } from "react";

// The original MyRobot link opened Wix's hosted members sign-up. That service
// does not come across with the site, so this reproduces the panel visually.
// Hook the buttons up once an auth provider (Auth.js, Clerk, etc.) is chosen.
export default function MemberGate() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [notice, setNotice] = useState(false);
  const verb = mode === "signup" ? "Sign up" : "Log in";

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center overflow-y-auto bg-navy px-[24px] text-[#8892a4]">
      <Link href="/" aria-label="Close" className="absolute right-[24px] top-[24px] h-[20px] w-[20px] text-[#f0f2f5]">
        <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" aria-hidden="true">
          <path d="M3 3l18 18M21 3L3 21" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>

      <h1 className="mt-[120px] text-[48px] font-bold leading-[1.1] text-[#8892a4]">
        {mode === "signup" ? "Sign Up" : "Log In"}
      </h1>
      <p className="mt-[24px] text-[16px]">
        {mode === "signup" ? "Already a member? " : "New to this site? "}
        <button
          type="button"
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="text-[#f0f2f5]"
        >
          {mode === "signup" ? "Log In" : "Sign Up"}
        </button>
      </p>

      <div className="mt-[28px] flex w-full max-w-[320px] flex-col gap-[16px]">
        <button
          type="button"
          onClick={() => setNotice(true)}
          className="flex h-[48px] items-center justify-center bg-white text-[15px] text-[#0b1120]"
        >
          {verb} with Google
        </button>
        <button
          type="button"
          onClick={() => setNotice(true)}
          className="flex h-[48px] items-center justify-center bg-[#3578e5] text-[15px] text-white"
        >
          {verb} with Facebook
        </button>
        <div className="flex items-center gap-[12px] text-[14px]">
          <span className="h-px flex-1 bg-[#1e2a3e]" />
          or
          <span className="h-px flex-1 bg-[#1e2a3e]" />
        </div>
        <button
          type="button"
          onClick={() => setNotice(true)}
          className="flex h-[48px] items-center justify-center border border-[#1e2a3e] text-[15px] text-[#8892a4]"
        >
          {verb} with email
        </button>
      </div>

      <p role="status" className="mt-[24px] min-h-[20px] text-center text-[14px] text-[#f0f2f5]">
        {notice && "Member sign-in isn't set up on this site yet. Please email info@myrobot.ie for portal access."}
      </p>

      {mode === "signup" && (
        <p className="mt-[24px] max-w-[460px] text-center text-[14px] leading-[1.5]">
          Your profile will be set to public automatically when you sign up. You can change this later in your
          profile settings.
        </p>
      )}
    </div>
  );
}
