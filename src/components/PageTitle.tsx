export default function PageTitle({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <>
      <div className="text-center flex-shrink-0 h-[74px] flex justify-center items-center border-b font-semibold">
        {children}
      </div>
    </>
  );
}
