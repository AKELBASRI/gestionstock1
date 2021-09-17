import FormControl from "@material-ui/core/FormControl";
import Select from "react-select";
import { Controller } from "react-hook-form";
const ReactHookFormReactSelect = (Props) => {
  const { options, control, Name, reef, Value, onchange, ...props } = Props;
  function compare(a, b) {
    return a.label > b.label ? 1 : b.label > a.label ? -1 : 0;
  }

  return (
    <FormControl {...props}>
      <Controller
        control={control}
        // defaultValue={default_value}
        name={Name}
        render={({ field: { onChange, value } }) =>
          Value !== "" ? (
            <Select
              defaultValue={{ id: Value?.id, label: Value?.type }}
              ignoreAccents={true}
              inputRef={reef?.ref}
              options={options?.sort(compare)}
              value={options?.find((c) => c.value === value)}
              onChange={(val) => {
                onChange(val?.value);
                onchange && onchange(val);
              }}
              isClearable={true}
            />
          ) : (
            <Select
              defaultValue={""}
              ignoreAccents={true}
              inputRef={reef?.ref}
              options={options?.sort(compare)}
              value={options?.find((c) => c.value === value) || Value}
              onChange={(val) => {
                onChange(val?.value);
                onchange && onchange(val);
              }}
              isClearable={true}
            />
          )
        }
      />
    </FormControl>
  );
};
export default ReactHookFormReactSelect;
