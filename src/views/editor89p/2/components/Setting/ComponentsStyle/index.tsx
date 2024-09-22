import React, { CSSProperties, useEffect } from "react";
import { Form, Input, InputNumber, Select } from "antd";
// import CssEditor from "../CssEditor";
// import { debounce } from "lodash";
//  ComponentConfig,
import {
  ComponentSetter,
  useComponentConfigStore,
} from "../../../stores/component-config";
import { useComponetsStore } from "../../../stores/components";

const ComponentsStyle: React.FC = () => {
  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.styles });
  }, [curComponent]);

  if (!curComponentId || !curComponent) return null;

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    } else if (type === "inputNumber") {
      return <InputNumber />;
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles?.(curComponentId, changeValues);
    }
  }

  // const handleEditorChange = debounce((value) => {
  //   console.log(value, "valeu");
  // }, 500);

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
      {/* <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor value={`.comp{\n\n}`} onChange={handleEditorChange} />
      </div> */}
    </Form>
  );
};

export default ComponentsStyle;
