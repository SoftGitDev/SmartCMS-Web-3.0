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
  Package,
  Code2,
  ClipboardList,
  BellRing,
  Lightbulb,
  Workflow,
  LogIn,
  UserCheck,
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
          isShow: false,
        },
        {
          childtitle: "User Management",
          childlink: "/user-management",
          childicon: User,
          isShow: true,
        },
        {
          childtitle: "Customers",
          childlink: "/customers",
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
        {
          childtitle: "Manage Services",
          childlink: "/manageservices",
          childicon: BellRing,
          isShow: true,
        },
        {
          childtitle: "Manage ODR Integration",
          childlink: "/manageticketservices",
          childicon: BellRing,
          isShow: true,
        },
      ],
    },

    {
      title: "Miscellaneous",
      icon: ClipboardList,
      link: "/miscellaneous",
      isShow: true,
    },

    {
      title: "Email",
      icon: Mail,
      link: "/email",
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
      link: "#",
      isShow: true,
      child: [
        {
          childtitle: "Ticket Report",
          childlink: "/ticketreport",
          childicon: FileText,
          isShow: true,
        },
        {
          childtitle: "Ticket Summary Report",
          childlink: "/ticketsummaryreport",
          childicon: ClipboardList,
          isShow: true,
        },
        {
          childtitle: "Ticket Auto Assign",
          childlink: "/assigncategoryreport",
          childicon: UserCheck,
          isShow: true,
        },
        {
          childtitle: "User Login / Logout Report",
          childlink: "/loginlogoutreport",
          childicon: LogIn,
          isShow: true,
        },
        // {
        //   childtitle: "User Activity Log",
        //   childlink: "/useractivityreport",
        //   childicon: Activity,
        //   isShow: true,
        // },
        // {
        //   childtitle: "Audit Log",
        //   childlink: "/auditlogreport",
        //   childicon: ShieldCheck,
        //   isShow: true,
        // },
        {
          childtitle: "Service Report",
          childlink: "/servicelogreport",
          childicon: Settings,
          isShow: true,
        },
        {
          childtitle: "ODR Integration Report",
          childlink: "/integservicelogreport",
          childicon: Workflow,
          isShow: true,
        },
      ],
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
