import { CommonComponentProps } from "../../interface";
import { useMaterailDrop } from "../../hooks/useMaterailDrop";

function Page({ id, children, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(["Button", "Container"], id);

  return (
    <div
      ref={drop}
      data-component-id={id}
      className="p-[20px] h-[100%] box-border"
      style={{ ...styles, border: canDrop ? "2px solid blue" : "none" }}
    >
      {children}
    </div>
  );
}

export default Page;
