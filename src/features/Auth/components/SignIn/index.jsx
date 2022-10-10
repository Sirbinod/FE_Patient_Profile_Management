// Library Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, notification, Space } from "antd";
import { useForm } from "react-hook-form";

import Input from "../../../../components/PPMInput";
import { SignInDefaults } from "../../constants";
import { SignInSchema } from "../../validation";
import { normalPost } from "../../../../utils/requiest";
import { signinapi } from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
const SignIn = ({ setAuthMode }) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: SignInDefaults, // TODO: For edit overwrite defaults here with the selector
  });
  const changeAuthMode = () => {
    setAuthMode(false)
  }

  const onSubmit = async (data) => {
    try {
      const res = await normalPost(data, signinapi)
      if (res.status === 200) {
        notification.open({
          message: "User create successfull"
        })
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        navigate("/patient");
      } else {
        notification.warning({
          message:"Invalid Input" })
      }

    } catch (error) {
      notification.error({
          message:error })
    }
  };

  return (
    <div className="Auth-form-container">
      {/* <h3 className="text-xl mb-6">{id ? "Edit" : "Create"} Region</h3> */}
      <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet? <span className="link-primary" onClick={changeAuthMode}>Sign Up</span>
          </div>

          <Space direction="vertical" size={"middle"} className="w-full">
            <Input
              name="email"
              control={control}
              label="Email"
              required
              error={errors?.country?.message}
              size="large"
            />
            <Input
              name="password"
              control={control}
              label="Password"
              required
              error={errors?.country?.message}
              size="large"
            />
            <Space>
              <Button htmlType="submit" type="primary" size={"large"}>
                Submit
              </Button>
            </Space>
          </Space>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
