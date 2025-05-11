export default function DetailsEntryWrap({ children }) {
  return (
    <div className="grid grid-cols-4 gap-8 px-6 py-8 border-t border-solid items-baseline">
      {children}
    </div>
  );
}
