import dynamic from "next/dynamic";
import DashboardLayout from "../../layout/dashboardLayout";
import { Button } from "primereact/button";
const SecondContent = dynamic(() => import("hostApp/Content"), {
  ssr: false,
  loading: () => <p>Loading Page Second...</p>,
  onError: () => <p>Page Second is unreachable.</p>,
});

export const Content = () => {
  return (
    <DashboardLayout>
      <Button label="Submit test" />
      <SecondContent />
    </DashboardLayout>
  );
};

export default Content;
