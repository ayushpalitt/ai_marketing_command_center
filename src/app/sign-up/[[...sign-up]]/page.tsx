import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0F172A]">
      <SignUp appearance={{ elements: { formButtonPrimary: "bg-primary text-white" } }} />
    </div>
  );
}
