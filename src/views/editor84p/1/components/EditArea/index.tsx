import React, { useEffect } from "react";
import { useComponetsStore, Component } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";

export function EditArea() {
  const { addComponent, components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    addComponent?.(
      {
        id: 333,
        name: "Container",
        props: {},
        children: [],
      },
      1
    );
    addComponent?.(
      {
        id: 12345,
        name: "Button",
        props: {},
        children: [],
      },
      333
    );
    addComponent?.(
      {
        id: 12345,
        name: "Button",
        props: {},
        children: [],
      },
      1
    );
  }, []);
  console.log(components, "components");

  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];
      if (!config?.component) return null;

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  };

  return (
    <div className="h-[100%]">
      edit1111
      <br />
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
    </div>
  );
}
