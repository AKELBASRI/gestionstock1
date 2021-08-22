import { Switch } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

import { Controller } from "react-hook-form";

// import { useStyles } from "../styleModalForm";

const ReactHookFormSwitch = (Props) => {
  const { control, name, reef, ...props } = Props;
  // const classes = useStyles();
  // const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Switch
            checked={value || false}
            onChange={onChange}
            defaultValue={false}
            inputRef={reef?.ref}
          />
        )}
        name={name}
        control={control}
      />
    </FormControl>
  );
};
export default ReactHookFormSwitch;
