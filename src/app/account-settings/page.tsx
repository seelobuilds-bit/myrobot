import type { Metadata } from "next";
import MemberGate from "@/components/MemberGate";

export const metadata: Metadata = {
  title: { absolute: "MyRobot.ie" },
  robots: { index: false },
};

export default function AccountSettingsPage() {
  return <MemberGate />;
}
