import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getComponentById, useComponetsStore } from "../../stores/components";

interface HoverMaskProps {
  containerClassName: string;
  componentId: number;
  portalWrapperClassName: string;
}

const HoverMask: React.FC<HoverMaskProps> = (props) => {
  const { componentId, containerClassName, portalWrapperClassName } = props;
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });
  const { components } = useComponetsStore();

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  const updatePosition = () => {
    if (!componentId) return;
    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;
    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();
    const labelTop = top - containerTop + container.scrollTop;
    const labelLeft = left - containerLeft + width;

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      labelTop,
      labelLeft,
    });
  };
  const el = useMemo(() => {
    // const el = document.createElement("div");
    // el.className = "wrapper";
    // const container = document.querySelector(`.${containerClassName}`);
    // if (!container) return;
    // container.appendChild(el);
    const el = document.querySelector(`.${portalWrapperClassName}`);
    return el;
  }, []);

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  return createPortal(
    <>
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          backgroundColor: "rgba(0, 0, 255, 0.05)",
          border: "1px dashed blue",
          pointerEvents: "none",
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: "14px",
          zIndex: 13,
          display: !position.width || position.width < 10 ? "none" : "inline",
          transform: "translate(-100%, -100%)",
        }}
      >
        <div
          style={{
            padding: "0 8px",
            backgroundColor: "blue",
            borderRadius: 4,
            color: "#fff",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {curComponent?.name}
        </div>
      </div>
    </>,
    el!
  );
};

export default HoverMask;
