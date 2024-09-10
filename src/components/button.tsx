export default function Button({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: (value: React.SetStateAction<boolean>) => void;
}) {
  return (
    <button className="btn-toggle" onClick={() => onOpen((open) => !open)}>
      {open ? "–" : "+"}
    </button>
  );
}
