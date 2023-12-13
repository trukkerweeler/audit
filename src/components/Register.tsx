// components/Signup.tsx
import React, { useRef } from "react";
import { trpc } from "@/utils/trpc";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  // use next navigation
  const router = useRouter();
  const username = useRef();
  const password = useRef();
  const fName = useRef();
  const lName = useRef();

  const registerMutation = trpc.insertUser.useMutation({
    onSuccess: () => {
      console.log("Registration successful");
      // Extra logic for successful registraton
    },
    onError: (error: any) => {
      console.error("Error:", error);
      // Handle errors
    },
  });

  const handleRegistration = async (e) => {
    console.log("registering");
    e.preventDefault();
    try {
      // encrypt password

      // let firstName = fName.current || '';
      // Trigger the registration mutation
      await registerMutation.mutateAsync(
        {
          username: username?.current.value!,
          password: password?.current.value!,
          fName: fName?.current.value!,
          lName: lName?.current.value!, 
	
        },
        {
          onSuccess: ({ user }) => {
            // store {user,token} in coookie and nav to home
            router.push("/");
          },
        }
      );
      // After successful registration, you can redirect to another page or perform additional actions
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };

  return (
    <div className="max-w-md mx-auto py-2 p-8">
      <form onSubmit={handleRegistration}>
        <div className="mb-4">
          <label
            htmlFor="fName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="fName"
            name="fName"
            ref={fName}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lName"
            name="lName"
            ref={lName}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            ref={username}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            ref={password}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="text-sm left-0 top-0 bg-slate-200 mt-1 ml-1.5 rounded-xl border-green-500 border-solid border-2 px-1 min-w-[120px] h-16"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
