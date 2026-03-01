import { useState, useContext } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/context/UserContext";

interface ISignInValues {
  username: string;
  password: string;
}

const SignInForm = () => {
  const { toast } = useToast();
  const { loginContext } = useContext(UserContext)!;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: ISignInValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: ISignInValues,
    { setSubmitting }: any,
  ) => {
    setIsLoading(true);

    try {
      const res = await loginContext(values.username, values.password);

      toast({
        title: "Success",
        description: res.message,
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Login failed";

      toast({
        variant: "destructive",
        title: "Login failed",
        description: message,
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <ClimbingBoxLoader color="green" size={20} />
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={signInSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-center justify-center h-full px-[50px] text-center bg-white">
          <h1 className="text-2xl font-bold mb-4">Sign in</h1>

          <Field
            name="username"
            type="text"
            placeholder="Username"
            className="bg-[#eee] p-3 mb-1 w-full rounded outline-none"
          />
          <ErrorMessage
            name="username"
            component="p"
            className="text-red-500 text-xs mb-2 text-left w-full"
          />

          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="bg-[#eee] p-3 mb-1 w-full rounded outline-none"
          />
          <ErrorMessage
            name="password"
            component="p"
            className="text-red-500 text-xs mb-2 text-left w-full"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#6200ea] hover:bg-[#5300d6] text-white font-bold text-sm px-[45px] py-3 mt-4 uppercase rounded-[20px]"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
