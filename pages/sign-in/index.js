import AuthLayout from "@/layout/authLayout";
import { setBulkSessionStorage, setSessionStorage } from "@/utlis/asyncStorage";
import axiosInstance from "@/utlis/axiosInstance";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const SignIn = () => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = async () => {
    try {
      const response = await axiosInstance.post("katalis/login", {
        username: email,
        password,
      });
      console.log(response);

      const responseCheck = await axiosInstance.get(
        "katalis/user/credential/check",
        {
          headers: {
            Authorization: response.headers.authorization,
          },
        }
      );
      await setBulkSessionStorage([
        { key: "token", value: response.headers.authorization },
        {
          key: "companies",
          value: JSON.stringify(responseCheck.data.companies),
        },
        {
          key: "activeCompany",
          value: JSON.stringify(responseCheck.data.activeCompany),
        },
        { key: "user", value: JSON.stringify(responseCheck.data.user) },
      ]);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <AuthLayout>
      <div className="surface-card p-4 shadow-2 border-round w-full sm:w-7 lg:w-6 h-fit">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium line-height-3">
            Don't have an account?
          </span>
          <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
            Create today!
          </a>
        </div>

        <div>
          <label htmlFor="email" className="block text-900 font-medium mb-2">
            Email
          </label>
          <InputText
            id="email"
            type="text"
            placeholder="Email address"
            className="w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Password
          </label>
          <InputText
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
              <Checkbox
                id="rememberme"
                onChange={(e) => setChecked(e.checked)}
                checked={checked}
                className="mr-2"
              />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
              Forgot your password?
            </a>
          </div>

          <Button
            onClick={login}
            label="Sign In"
            icon="pi pi-user"
            className="w-full"
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
