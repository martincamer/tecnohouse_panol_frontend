export function Card({ children }) {
  return (
    <div className="bg-white w-auto py-12 px-10 rounded-md border border-gray-300 mx-auto max-md:border-none max-md:px-3">
      {children}
    </div>
  );
}
