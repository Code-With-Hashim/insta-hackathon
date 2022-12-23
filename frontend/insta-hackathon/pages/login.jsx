import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
const Login = () => {
  const [data, setData] = useState({});
  const router = useRouter();
  const toast = useToast();
  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(data);
    if (
      data.email != undefined &&
      data.email.includes("@") &&
      data.password != undefined &&
      data.username != undefined
    ) {
      try {
        await axios.post("http://localhost:8080/login", data).then((res) => {
          console.log(res);
          toast({
            title: "Login Successfull",
            status: "success",
            position: "top",
            isClosable: true,
          });
          router.push("/");
        });
      } catch (error) {
        toast({
          title: "Please Enter Correct Details...!",
          status: "error",
          position: "top",
          isClosable: true,
        });
        console.log("Error While Login");
      }
    } else {
      toast({
        title: "Please Enter Correct Details...!",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <div class="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-3">
      <div class="w-small max-w-md space-y-8">
        <div>
          <img
            class="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="password" class="sr-only">
                Password
              </label>
              <input
                id="password"
                name="username"
                type="text"
                required
                class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Username"
                minLength="6"
                onChange={handleOnchange}
              />
            </div>
            <div>
              <label for="email-address" class="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                onChange={handleOnchange}
              />
            </div>
            <div>
              <label for="password" class="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                minLength="6"
                onChange={handleOnchange}
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            {/* <Link href="/"> */}{" "}
            <button
              onClick={handleLogin}
              type="submit"
              class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
            {/* </Link> */}
            <Link href="/signup">
              {" "}
              <p class="mt-6 text-center text-sm font-bold tracking-tight text-gray-900">
                Create your account
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
