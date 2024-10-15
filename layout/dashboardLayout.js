import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <Navbar />
      <div className="container p-4 py-2 max-h-[90vh] min-w-[900px]">
        {children}
      </div>
      <Footer />
    </section>
  );
}
