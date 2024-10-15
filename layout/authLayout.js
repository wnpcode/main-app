export default function AuthLayout({ children }) {
  return (
    <section>
      <div className="flex justify-content-center align-items-center p-4 py-2 h-screen w-screen">
        {children}
      </div>
    </section>
  );
}
