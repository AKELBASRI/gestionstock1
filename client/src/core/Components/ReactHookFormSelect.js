import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Controller } from "react-hook-form";
import { useStyles } from "../styleModalForm";

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) => {
  const classes = useStyles();
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      {/* <InputLabel id={labelId}>{label}</InputLabel> */}
      <Controller
        // as={
        //   <Select labelId={labelId} label={label}>
        //     {children}
        //   </Select>
        // }
        // name={name}
        // control={control}
        // defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            fullWidth
            {...field}
            defaultValue={defaultValue}
            label={label}
          >
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;
