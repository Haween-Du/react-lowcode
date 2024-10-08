import { useDrop } from "react-dnd";
import { useComponetsStore } from "../stores/components";
import { useComponentsConfigStore } from "../stores/component-config";

const useMaterialDrop = (accept: string[], id: number) => {
  const { addComponent } = useComponetsStore();
  const { componentConfig } = useComponentsConfigStore();
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: accept,
    drop: (item: { type: string }, monitor) => {
      if (monitor.didDrop()) return;

      const props = componentConfig?.[item.type].name;
      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));
  return { canDrop, drop };
};

export default useMaterialDrop;
