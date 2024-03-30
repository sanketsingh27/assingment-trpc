"use client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const mutation = api.auth.register.useMutation({
    onSuccess: (data) => {
      //redirect to index page
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);

      router.push("/");
    },
    onError: () => alert("Email Already Registered"),
    // todo : redirection
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password || !name) {
      alert("Please fill in all fields");
      return;
    }
    // Call the onLogin function passed from parent component
    mutation.mutate({ email, password, name });
    // Clear input fields
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className=" m-auto mt-4 flex max-w-md flex-col rounded-3xl border border-solid border-stone-300 bg-white px-12 pb-12 pt-8 text-base max-md:px-5">
      <div className="self-center text-2xl font-semibold text-black">
        Create your account
      </div>

      <label className="mt-3 text-black ">Name</label>
      <input
        type="text"
        placeholder="Enter"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="items-start justify-center rounded-md border border-solid border-stone-300 px-3 py-2 "
      />

      <label className="mt-3 text-black ">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter"
        className="items-start justify-center rounded-md border border-solid border-stone-300 px-3 py-2 "
      />

      <label className="mt-3 text-black ">Password</label>
      <input
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter"
        className="items-start justify-center rounded-md border border-solid border-stone-300 px-3 py-2 "
      />

      <button
        onClick={handleSubmit}
        className="mt-4 items-center justify-center rounded-md border border-solid border-black bg-black px-3 py-2 text-center font-medium uppercase tracking-wider text-white "
      >
        Create account
      </button>

      <div className="mt-12 flex gap-3.5 self-center ">
        <div className="grow text-zinc-800">Have an Account? </div>
        <button
          onClick={() => router.push("/login")}
          className="font-medium uppercase tracking-wider text-black"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
