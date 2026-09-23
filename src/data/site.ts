export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  {
    label: "Robotics",
    href: "/robotics",
    children: [
      { label: "Phantas", href: "/phantas" },
      { label: "Phantas Single", href: "/phantas-single" },
      { label: "PhanShop", href: "/phan-shop" },
      { label: "Mira", href: "/mira" },
      { label: "Omnie", href: "/omnie" },
      { label: "Marvel", href: "/marvel" },
      { label: "Beetle", href: "/beetle" },
    ],
  },
  {
    label: "Aventurier",
    href: "/aventurier",
    children: [
      { label: "Artist 1", href: "/artist-1" },
      { label: "Ranger One", href: "/ranger-one" },
    ],
  },
  { label: "About Us", href: "/abouts" },
  { label: "Contact", href: "/contact" },
  { label: "MyRobot", href: "/account-settings" },
];

export const CONTACT = {
  email: "info@myrobot.ie",
  emailHref: "mailto:info@myrobot.ie?subject=Cleaning robot inquiry",
  phone: "+353 85 194 2831",
  phoneHref: "tel:+353851942831",
  whatsappHref: "https://api.whatsapp.com/send?phone=353851942831",
  website: "www.myrobot.ie",
  websiteHref: "https://www.myrobot.ie",
  address: "Unit 5 Kilmallock Business Park, Kilmallock, Co. Limerick, V35 CY89",
  privacyHref: "/blank-1",
};
