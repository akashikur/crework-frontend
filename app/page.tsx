"use client";
import Login from "@/components/Login";
import Signin from "@/components/Signin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, [router]);

  function handleToggle() {
    setToggle((prev) => !prev);
  }
  return (
    <>
      {toggle ? (
        <Signin handleToggle={handleToggle} />
      ) : (
        <Login handleToggle={handleToggle} />
      )}
    </>
  );
}
