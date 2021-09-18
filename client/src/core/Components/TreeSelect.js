import { TreeSelect } from "antd";
import FormControl from "@material-ui/core/FormControl";

import { Controller } from "react-hook-form";
const ReactTreeSelect = (Props) => {
  const { data, Value, Name, control, reef, onchange, ...props } = Props;
  return (
    <FormControl {...props}>
      <Controller
        control={control}
        // defaultValue={default_value}
        name={Name}
        render={() => (
          <TreeSelect
            size="large"
            showSearch
            treeData={data}
            treeDataSimpleMode={{
              id: "value",
              pId: "parentId",
              //rootPId can be set too
            }}
            inputRef={reef?.ref}
            value={Value}
            style={{ width: "100%" }}
            dropdownStyle={{
              overflow: "auto",

              zIndex: 4000,
            }}
            filterTreeNode={(search, item) => {
              return (
                item.title
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .indexOf(
                    search
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase()
                  ) >= 0
              );
            }}
            treeNodeFilterProp="title"
            placeholder="Please select"
            allowClear
            // treeDefaultExpandAll
            onChange={onchange}
          ></TreeSelect>
        )}
      />
    </FormControl>
  );
};
export default ReactTreeSelect;
