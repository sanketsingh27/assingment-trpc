import React, { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = api.auth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    // Call the onLogin function passed from parent component
    mutation.mutate({ email, password });
    // Clear input fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className=" m-auto mt-4 flex max-w-md flex-col rounded-3xl border border-solid border-stone-300 bg-white px-12 pb-12 pt-8 text-base max-md:px-5">
      <div className="self-center text-2xl font-semibold text-black">Login</div>

      <div className="self-center text-xl font-normal  text-black">
        Welcome back to ECOMMERCE
      </div>

      <div className="self-center text-sm font-normal  text-black">
        The next gen business marketplace
      </div>

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
        Login
      </button>

      <div className="mt-12 flex gap-3.5 self-center ">
        <div className="grow text-zinc-800">Don’t have an Account? </div>
        <button
          onClick={() => router.push("/signup")}
          className="font-medium uppercase tracking-wider text-black"
        >
          SING UP
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
