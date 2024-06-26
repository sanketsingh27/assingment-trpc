"use client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

interface UserDetails {
  email: string;
  id: string;
  name: string;
  password: string;
  selectedCategories: string[];
  token: string;
}

const OTP: React.FC = () => {
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const mutation = api.auth.register.useMutation({
    onSuccess: (data) => {
      //redirect to index page
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);
      setOtp("");
      router.push("/");
    },
    onError: ({ message }) => alert(message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userDetailsString: string | null =
      localStorage.getItem("userDetails");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userDetails: UserDetails | null = userDetailsString
      ? JSON.parse(userDetailsString)
      : null;

    const { email, password, name } = userDetails!;
    // Call apt
    mutation.mutate({ email, password, name, otp });
  };

  return (
    <div className=" m-auto mt-4 flex max-w-md flex-col rounded-3xl border border-solid border-stone-300 bg-white px-12 pb-12 pt-8 text-base max-md:px-5">
      <div className="self-center text-2xl font-semibold text-black">
        Verify your email
      </div>

      <div className="self-center text-xl font-normal  text-black">
        Enter the 8 digit code you have received on
      </div>

      <div className="self-center text-sm font-normal  text-black">
        anu***@gmail.com
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6} // Set maximum length to 6 digits
          className=" h-10 w-1/2 rounded-md border border-gray-300 px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 items-center justify-center rounded-md border border-solid border-black bg-black px-3 py-2 text-center font-medium uppercase tracking-wider text-white "
      >
        Verify
      </button>
    </div>
  );
};

export default OTP;
