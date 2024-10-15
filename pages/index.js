import localFont from "next/font/local";
import { Card } from "primereact/card";
import "primereact/resources/themes/nano/theme.css";
import { useEffect, useState } from "react";
import DashboardLayout from "../layout/dashboardLayout";
import { getSessionStorage } from "@/utlis/asyncStorage";
import axiosInstance from "@/utlis/axiosInstance";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [activeCompany, setActiveCompany] = useState({});
  const [data, setData] = useState([]);

  const getUserReport = async () => {
    console.log(activeCompany);
    try {
      let query = [];
      query.push(`company_id=${activeCompany.id}`);
      const response = await axiosInstance.get("psp/reporting/user/total");
      console.log(response.data, "lkajsldkjalsjkd");

      const key = Object.keys(response.data);
      console.log(key);

      setData(
        key.map((item, index) => {
          return {
            key: item,
            value: response.data[item],
            label: item === "user" ? "Total Pengguna" : "Total Akun",
            desc:
              item === "user"
                ? "Data pengguna adalah data yang terdaftar di halaman data user"
                : "Data akun adalah data yang terdaftar di halaman data akun",
            class: index % 2 === 0 ? "text-orange-500" : "text-purple-500",
          };
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  function updateData() {
    const data = { key: "value" };
    localStorage.setItem("shared-storage", JSON.stringify(data));

    // Notify parent window
    window.parent.postMessage({ type: "UPDATE_SHARED_DATA", data }, "*");
  }

  // Example usage
  useEffect(() => {
    console.log("i fire once");
    updateData();
    const func = async () => {
      let storage = await getSessionStorage("activeCompany", true);
      setActiveCompany(storage);
      getUserReport();
    };
    func();
  }, []);
  return (
    <DashboardLayout>
      <div className="grid">
        {data.map((item) => (
          <div className="col-4 p-2">
            <Card
              header=""
              footer={
                <span className={`${item.class} text-xs text-center`}>
                  {item.desc}
                </span>
              }
            >
              <div className="flex flex-column text-sm text-gray-300 font-medium">
                <span className="text-gray-600">{item.label}</span>
                <span className={`${item.class} text-3xl`}>{item.value}</span>
                <span>{item.label?.replace("Total ", "")}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
