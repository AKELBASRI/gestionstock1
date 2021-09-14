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
            // checked={value }
            onChange={onChange}
            defaultValue={false}
            inputRef={reef?.ref}
            checked={value || false}
          />
        )}
        name={name}
        control={control}
      />
    </FormControl>
  );
};
export default ReactHookFormSwitch;
