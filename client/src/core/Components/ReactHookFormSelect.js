import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";
import { Controller } from "react-hook-form";
// import { useStyles } from "../styleModalForm";

const ReactHookFormSelect = (Props) => {
  const {
    name,
    label,
    control,
    defaultValue,
    children,
    onchange,
    reef,

    ...props
  } = Props;
  // const classes = useStyles();
  // const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            fullWidth
            onChange={(e) => {
              onChange(e);
              onchange && onchange(e);
            }}
            defaultValue={defaultValue}
            label={label}
            inputRef={reef?.ref}
            value={value || ""}
          >
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
        noRef={true}
        rules={{
          required: true,
        }}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;
