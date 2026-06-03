import {
  Archive,
  Bug,
  Building2,
  Building,
  Home,
  LayoutDashboard,
  Settings,
  User,
  FileText,
  Mail,
  Smartphone,
  Package,
  Code2,
  ClipboardList,
  BellRing,
  Lightbulb,
} from "lucide-react";

export function menuItems(userData: any) {
  return [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
      isShow: true,
    },

    {
      title: "Administrator",
      icon: Archive,
      link: "#",
      isShow: true,
      child: [
        {
          childtitle: "Organization ",
          childlink: "/organization ",
          childicon: Building,
          isShow: true,
        },
        {
          childtitle: "Branch",
          childlink: "/branch",
          childicon: Building,
          isShow: true,
        },
        {
          childtitle: "Organization Management",
          childlink: "/organization-management",
          childicon: Building2,
          isShow: true,
        },
        {
          childtitle: "User Management",
          childlink: "/user-management",
          childicon: User,
          isShow: true,
        },
        {
          childtitle: "App Configuration",
          childlink: "/app-config",
          childicon: Settings,
          isShow: true,
        },
        {
          childtitle: "Product Configuration",
          childlink: "/product-config",
          childicon: Package,
          isShow: true,
        },
        {
          childtitle: "API Configuration",
          childlink: "/api-configurations",
          childicon: Code2,
          isShow: true,
        },
        {
          childtitle: "Channel Configuration",
          childlink: "/communication-config",
          childicon: BellRing,
          isShow: true,
        },
        // {
        //   childtitle: "Mail & SMS Configuration",
        //   childlink: "/communication-config",
        //   childicon: Mail,
        //   isShow: true,
        // },
        // {
        //   childtitle: "Escalation Levels",
        //   childlink: "/matrixlevels",
        //   childicon: Code2,
        //   isShow: true,
        // },
        // {
        //   childtitle: "Exception Matrix",
        //   childlink: "/escalationmatrix",
        //   childicon: Code2,
        //   isShow: true,
        // },
      ],
    },

    {
      title: "Miscellaneous",
      icon: ClipboardList,
      link: "/miscellaneous",
      isShow: true,
    },

    {
      title: "Ticket",
      icon: FileText,
      link: "/tickets",
      isShow: true,
    },

    {
      title: "Services",
      icon: Settings,
      link: "/services",
      isShow: true,
    },

    {
      title: "Knowledge Base",
      icon: Lightbulb,
      link: "#",
      isShow: true,
      child: [
        {
          childtitle: "Article",
          childlink: "/article",
          childicon: Bug,
          isShow: true,
        },
        {
          childtitle: "Announcement",
          childlink: "/announcement",
          childicon: FileText,
          isShow: true,
        },
        {
          childtitle: "Circular",
          childlink: "/circular",
          childicon: ClipboardList,
          isShow: true,
        },
      ],
    },

    {
      title: "Configurations",
      icon: Settings,
      link: "/configurations",
      isShow: false,
    },
    {
      title: "Logs",
      icon: Bug,
      link: "#",
      isShow: true,
      child: [
        {
          childtitle: "Debug Logs",
          childlink: "/logs/debug",
          childicon: Bug,
          isShow: true,
        },
        {
          childtitle: "Access Logs",
          childlink: "/logs/access",
          childicon: FileText,
          isShow: true,
        },
        {
          childtitle: "Audit Logs",
          childlink: "/logs/audit",
          childicon: ClipboardList,
          isShow: true,
        },
      ],
    },

    {
      title: "Reports",
      icon: FileText,
      link: "/reports",
      isShow: true,
    },
  ];
}

export const productMenu = [
  {
    name: "Home",
    Icon: Home,
    link: "/",
  },
];
