export function Button({ onClick, children, type }) {
  return (
    <button
      type={type}
      className="text-white px-6 transition-all text-sm text-center hover:shadow-md py-2 rounded-md bg-primary font-bold flex gap-2 items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
