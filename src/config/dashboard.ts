import { type IconName } from "@/components/ui/icon";

export type NavItem = {
  title: string;
  href: string;
  icon: IconName;
  label?: string;
};

export const dashboardConfig = {
  navItems: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "LayoutDashboard",
    },
    {
      title: "Pedidos",
      href: "/dashboard/orders",
      icon: "ShoppingBasket",
    },
    {
      title: "Produtos",
      href: "/dashboard/products",
      icon: "Package",
    },
    {
      title: "Clientes",
      href: "/dashboard/customers",
      icon: "Users",
    },
    {
      title: "Configurações",
      href: "/dashboard/settings",
      icon: "Settings",
    },
  ] as NavItem[],
};