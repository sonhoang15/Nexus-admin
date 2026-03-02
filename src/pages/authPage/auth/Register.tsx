// import { RegisterService } from "../../Services/userService";
import { useEffect } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";

const SignUpForm = () => {
  const [email, setEmail] = React.useState<string>("");
  const [username, setUserName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const defaultInput = {
    isValidEmail: true,
    isValidUserName: true,
    isValidPhone: true,
    isValidSex: true,
    isValidPassword: true,
    isValidRePassword: true,
  };
  const [objectCheckInput, setObjectCheckInput] = React.useState<
    typeof defaultInput
  >({
    ...defaultInput,
  });

  const isValidInput = () => {
    setObjectCheckInput({ ...defaultInput });
    if (!email || !username || !phone || !password) {
      setObjectCheckInput({
        isValidEmail: false,
        isValidUserName: false,
        isValidPhone: false,
        isValidSex: false,
        isValidPassword: false,
        isValidRePassword: false,
      });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjectCheckInput({
        ...defaultInput,
        isValidEmail: false,
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      window.location.reload();
    }
  }, []);

  // const handleSignUp = async () => {
  //     let check = isValidInput();
  //     if (check === true) {
  //         let severData = await RegisterService(email, username, phone, password);
  //         if (+severData.EC === 0) {
  //             toast.success(severData.EM);
  //             setEmail('');
  //             setUserName('');
  //             setPhone('');
  //             setPassword('');
  //             setObjectCheckInput({ ...defaultInput });
  //         } else {
  //             toast.error(severData.EM);
  //         }
  //     }
  // }
  return (
    <div className="flex flex-col items-center justify-center h-full px-[50px] text-center bg-white">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <input
        type="text"
        placeholder="Name"
        className={`bg-[#eee] p-3 mb-2 w-full outline-none transition-all duration-200 rounded
                ${objectCheckInput.isValidUserName ? "border-2" : "border-2 border-red-500 bg-red-100"}`}
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className={`bg-[#eee] p-3 mb-2 w-full outline-none transition-all duration-200 rounded
                ${objectCheckInput.isValidEmail ? "border-2" : "border-2 border-red-500 bg-red-100"}`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="phone"
        placeholder="Phone"
        className={`bg-[#eee] p-3 mb-2 w-full outline-none transition-all duration-200 rounded
                ${objectCheckInput.isValidPhone ? "border-2" : "border-2 border-red-500 bg-red-100"}`}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className={`bg-[#eee] p-3 mb-2 w-full outline-none transition-all duration-200 rounded
                ${objectCheckInput.isValidPassword ? "border-2" : "border-2 border-red-500 bg-red-100"}`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={() => alert("Register is disabled in demo")}
        className="bg-[#6200ea] text-white px-[45px] py-3 mt-4 rounded-[20px]"
      >
        Sign Up
      </Button>
    </div>
  );
};
export default SignUpForm;
