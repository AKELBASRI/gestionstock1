import FormControl from "@material-ui/core/FormControl";

import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
const ReactHookTextField = (Props) => {
  const { control, Name, reef, label, ...props } = Props;

  return (
    <FormControl {...props}>
      <Controller
        control={control}
        // defaultValue={default_value}
        name={Name}
        render={({ field: { onChange, value } }) => (
          <TextField
            inputRef={reef?.ref}
            onChange={(val) => onChange(val.value)}
            value={value}
            label={label}
            autoFocus
          />
        )}
      />
    </FormControl>
  );
};
export default ReactHookTextField;
