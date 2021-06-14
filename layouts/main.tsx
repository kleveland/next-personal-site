import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState, useCallback } from "react";
import GithubComponent from "../svg/github";
import Link from "next/link";
import LinkedinComponent from "../svg/linkedin";
import MediumComponent from "../svg/medium";

interface NavItemProps {
  title: string;
  link: string;
  active?: boolean;
}

interface NavItemMobileProps extends NavItemProps {
  toggleOpen: () => void;
}

interface SocialIconProps {
  path: string;
  link: string;
  title: string;
  component: ReactElement;
}

const NAV_LIST = [
  {
    title: "Home",
    link: "/",
  },
  { title: "Posts", link: "/posts" },
  { title: "Projects", link: "/projects" },
];

const SOCIAL_LIST = [
  {
    path: "/social/github.svg",
    link: "#",
    title: "Github Profile",
    component: <GithubComponent width={24} height={24} />,
  },
  {
    path: "/social/linkedin.svg",
    link: "#",
    title: "Linkedin Profile",
    component: <LinkedinComponent width={24} height={24} />,
  },
  {
    path: "/social/medium.svg",
    link: "#",
    title: "Medium Profile",
    component: <MediumComponent width={24} height={24} />,
  },
];

const mobileBreakpoint = 620;

export default function MainLayout({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const matches = router.pathname.match(/(\/[\w+-]+)/g);

  const [width, setWidth] = useState(0);
  const isMobile = width != 0 && width < mobileBreakpoint;

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  NAV_LIST.forEach((item: NavItemProps, index: number) => {
    item.active = (matches ? matches[0] : router.pathname) === item.link;
  });
  return (
    <div className="root-container">
      <div className="header-container">
        <div className="navigation-header-text">KC</div>
        <div className="navigation-container">
          {width != 0 && <div className="navigation-inner-container">
            {isMobile ? <NavItemMenu /> : NAV_LIST.map(NavItem)}
          </div>}
        </div>
      </div>
      <div className={"header-social-container " + (isMobile ? "mobile" : "")}>
        {SOCIAL_LIST.map(SocialIcon)}
      </div>
      <div className="page-content">{children}</div>
      <div className="page-footer">Made with ♥ by Kacey Cleveland</div>
    </div>
  );
}

function NavItem({ title, link, active }: NavItemProps, index: number) {
  return (
    <Link href={link} key={"nav-item-"+index}>
      <div id={index === 0 ? "skip-link": undefined} className={"nav-item " + (active ? "active" : "")}>{title}</div>
    </Link>
  );
}

function NavItemMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="mobile-menu-container">
      <div onClick={toggleOpen} className={"mobile-burger-menu " + (isOpen ? "open" : "")}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={"mobile-nav-items-container " + (isOpen ? "open" : "")}>
        {NAV_LIST.map((NavItem, index) => NavItemMobile({ ...NavItem, toggleOpen }, index))}
      </div>
    </div>
  );
}

function NavItemMobile({
  title,
  link,
  active,
  toggleOpen,
}: NavItemMobileProps, index: number) {
  return (
    <Link href={link} key={"nav-item-"+index}>
      <div
        onClick={toggleOpen}
        className={"nav-item-mobile " + (active ? "active" : "")}
      >
        {title}
      </div>
    </Link>
  );
}

function SocialIcon({ link, title, component }: SocialIconProps, index: number) {
  return (
    <div title={title} className="social-icon-container"  key={"social-item-"+index}>
      <Link href={link}><a>{component}</a></Link>
    </div>
  );
}
