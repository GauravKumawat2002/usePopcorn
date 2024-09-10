import Button from "./button";
import { useState } from "react";
export default function ListBox({ children }: { children: React.ReactNode }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <Button open={isOpen1} onOpen={setIsOpen1} />
      {isOpen1 && <ul className="list">{children}</ul>}
    </div>
  );
}
