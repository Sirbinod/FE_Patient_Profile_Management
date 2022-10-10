import { Controller, Control } from "react-hook-form";
import { Input, Alert, InputProps } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const inputTypeSwitcher = (type, rest) => {
  let component;
  switch (type) {
    case "normal":
      component = <Input {...rest} />;
      break;
    case "phone":
      component = (
        <PhoneInput
          inputStyle={{ width: "100%" }}
          containerStyle={{ width: "100%" }}
          {...rest}
          // country={defaultCountry}
          inputProps={{
            id: rest.id,
          }}
        />
      );
      break;
    default:
      component = <Input {...rest} />;
      break;
  }
  return component;
};


const PPMInput = ({
  name,
  type = "normal",
  control,
  label,
  error,
  parentClass,
  labelClass,
  required = false,
  ...rest
}) => {

  return (
    <div className={parentClass}>
      {label && (
        <label className={labelClass }>
          {label}
          {required && "*"}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => inputTypeSwitcher(type, { ...field, ...rest, id: name })}
      />
      {error && (
        <div className="">
          <Alert message={error} type="error" />
        </div>
      )}
    </div>
  );
};

export default PPMInput;
