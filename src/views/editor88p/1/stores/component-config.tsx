import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
  desc?: string;
  setter?: ComponentSetter[];
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      desc: "容器",
      component: Container,
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          option: [
            {
              label: "主按钮",
              value: "primary",
            },
            {
              label: "次按钮",
              value: "default",
            },
          ],
        },
        {
          name: "text",
          label: "文本",
          type: "input",
        },
      ],
      desc: "按钮",
      component: Button,
    },
    Page: {
      name: "Page",
      defaultProps: {},
      desc: "页面",
      component: Page,
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
