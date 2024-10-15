import Link from "next/link";
import { AutoComplete } from "primereact/autocomplete";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import CompanyDropdown from "./custom/CompanyDropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { clearSessionStorage } from "@/utlis/asyncStorage";
import { useRouter } from "next/router";
import { Menu } from "primereact/menu";

export default function Navbar() {
  const op = useRef(null);
  const router = useRouter();
  let itemsMenu = [
    {
      label: "Logout",
      icon: "pi pi-plus",
      command: () => {
        logout();
      },
    },
  ];
  const items = [
    {
      label: "Umum",
      icon: "pi pi-fw pi-home",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-home",
          command: () => {
            window.location.href = "/";
          },
        },
        {
          label: "Profile",
          icon: "pi pi-fw pi-home",
          command: () => {
            window.location.href = "/profile";
          },
        },
      ],
    },
    {
      label: "Setting Info",
      icon: "pi pi-fw pi-home",
      items: [
        {
          label: "Info dan Berita",
          icon: "pi pi-fw pi-home",
          command: () => {
            window.location.href = "/";
          },
        },
        {
          label: "Broadcast",
          icon: "pi pi-fw pi-home",
          command: () => {
            window.location.href = "/";
          },
        },
      ],
    },
    {
      label: "Second",
      icon: "pi pi-fw pi-home",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-home",
          command: () => {
            window.location.href = "/second";
          },
        },
        {
          label: "Profile",
          icon: "pi pi-fw pi-home",
          command: () => {
            window.location.href = "/second";
          },
        },
      ],
    },
  ];

  const logout = async () => {
    try {
      await clearSessionStorage();
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const start = (
    <Link href="/">
      <img
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        height="40"
        className="mr-2 cursor-pointer"
      ></img>
    </Link>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <CompanyDropdown></CompanyDropdown>
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
        onClick={(e) => op.current.toggle(e)}
      />
      <OverlayPanel ref={op}>
        <Menu model={itemsMenu} />
      </OverlayPanel>
    </div>
  );
  return (
    <div className="card  min-w-[200px]">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
