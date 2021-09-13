import FormControl from "@material-ui/core/FormControl";
import Select from "react-select";
import { Controller } from "react-hook-form";
const ReactHookFormReactSelect = (Props) => {
  const { options, control, Name, reef, Value, onchange, ...props } = Props;

  return (
    <FormControl {...props}>
      <Controller
        control={control}
        // defaultValue={default_value}
        name={Name}
        render={({ field: { onChange, value } }) => (
          <Select
            inputRef={reef?.ref}
            options={options}
            value={options?.find((c) => c.value === value) || Value}
            onChange={(val) => {
              onChange(val?.value);
              onchange && onchange(val);
            }}
            isClearable={true}
          />
        )}
      />
    </FormControl>
  );
};
export default ReactHookFormReactSelect;
