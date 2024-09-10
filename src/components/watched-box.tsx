import { useState } from "react";
import Button from "./button";
export default function WatchedBox({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
      <Button open={isOpen2} onOpen={setIsOpen2} />
      {isOpen2 && <>{children}</>}
    </div>
  );
}
//
//
//
//
//
//
