// Library Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, notification, Space } from "antd";
import { useForm } from "react-hook-form";

import Input from "../../../../components/PPMInput";
import { SignUpDefaults } from "../../constants";
import { SignUpSchema } from "../../validation";
import { normalPost } from "../../../../utils/requiest";
import { signupapi } from "../../../../utils/api";

const SignUp = ({ setAuthMode }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: SignUpDefaults, // TODO: For edit overwrite defaults here with the selector
  });
  const changeAuthMode = () => {
    setAuthMode(true);
  };
  const onSubmit = async (data) => {
    try {
      const res = await normalPost(data, signupapi)
      if (res.status === 201) {
        notification.open({
          message: "User create successfull"
        })
        setAuthMode(true);
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
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>

          <Space direction="vertical" size={"middle"} className="w-full">
            <Input
              name="name"
              control={control}
              label="Full Name"
              required
              error={errors?.country?.message}
              size="large"
            />
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
                submit
              </Button>
            </Space>
          </Space>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
