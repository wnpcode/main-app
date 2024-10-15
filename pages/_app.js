import { Toast } from "primereact/toast";
import { useRef, useEffect, useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css"; // Core PrimeReact CSS
import "primeicons/primeicons.css"; // Icons
import "primeflex/primeflex.css"; // Optional: PrimeFlex for utility classes

import "@/styles/globals.css";
import { setUpAxiosInterceptors } from "@/utlis/axiosInstance";
import { OverlayPanel } from "primereact/overlaypanel";

export default function App({ Component, pageProps }) {
  const toastRef = useRef(null);
  const opRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Set up Axios interceptors with Toast reference
    setUpAxiosInterceptors(toastRef, opRef);
  }, [toastRef]);

  return (
    <PrimeReactProvider>
      <OverlayPanel
        ref={opRef}
        className="bg-black-alpha-80 text-teal-500 w-full h-full absolute top-0 left-0 m-0 rounded-none flex justify-content-center align-items-center"
      >
        <p className="pi pi-spin pi-spinner " style={{ fontSize: "3rem" }}></p>
      </OverlayPanel>
      <Toast ref={toastRef} />
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}
