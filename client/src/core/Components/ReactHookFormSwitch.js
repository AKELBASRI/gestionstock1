import { Switch } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

import { Controller } from "react-hook-form";

import { useStyles } from "../styleModalForm";

const ReactHookFormSwitch = ({
  name,
  label,
  control,
  defaultvalue,
  children,
  ...props
}) => {
  const classes = useStyles();
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <Controller
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <Switch
            checked={value || false}
            onChange={onChange}
            defaultValue={false}
          />
        )}
        name={name}
        control={control}
      />
    </FormControl>
  );
};
export default ReactHookFormSwitch;
