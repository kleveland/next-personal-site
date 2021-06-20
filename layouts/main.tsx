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
  { title: "Projects", link: "/projects" },
  { title: "Posts", link: "/posts" },
];

const SOCIAL_LIST = [
  {
    path: "/social/github.svg",
    link: "https://github.com/kleveland",
    title: "Github Profile",
    component: <GithubComponent width={24} height={24} />,
  },
  {
    path: "/social/linkedin.svg",
    link: "https://www.linkedin.com/in/kaceycleveland/",
    title: "Linkedin Profile",
    component: <LinkedinComponent width={24} height={24} />,
  },
  {
    path: "/social/medium.svg",
    link: "https://kaceycleveland.medium.com/",
    title: "Medium Profile",
    component: <MediumComponent width={24} height={24} />,
  },
];

const mobileBreakpoint = 680;

export default function MainLayout({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const matches = router.pathname.match(/(\/[\w+-]+)/g);

  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(0);
  const isMobile = width != 0 && width < mobileBreakpoint;
  const isScrolled = offset > 225;

  useEffect(() => {
    setWidth(window.innerWidth);
    setOffset(window.pageYOffset);
    const handleWindowResize = () => setWidth(window.innerWidth);
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("scroll", handleScroll);
    // Return a function from the effect that removes the event listener
    return () => {
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  console.log(offset);

  NAV_LIST.forEach((item: NavItemProps, index: number) => {
    item.active = (matches ? matches[0] : router.pathname) === item.link;
  });
  return (
    <div className="page-container">
      <div
        className={"header-parent-container " + (isScrolled ? "scrolled" : "")}
      >
        <div className="header-container">
          <div
            className={"navigation-header-text " + (isMobile ? "mobile" : "")}
          >
            KC
          </div>
          <div
            className={"header-social-container " + (isMobile ? "mobile" : "")}
          >
            {SOCIAL_LIST.map(SocialIcon)}
          </div>
          <div className="navigation-container">
            {width != 0 && (
              <div className="navigation-inner-container">
                {isMobile ? <NavItemMenu /> : NAV_LIST.map(NavItem)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="root-container">
        <div className="page-content">{children}</div>
        <div className="page-footer">Made with ♥ by Kacey Cleveland</div>
      </div>
    </div>
  );
}

function NavItem({ title, link, active }: NavItemProps, index: number) {
  return (
    <Link href={link} key={"nav-item-" + index}>
      <div
        id={index === 0 ? "skip-link" : undefined}
        className={"nav-item " + (active ? "active" : "")}
      >
        {title}
      </div>
    </Link>
  );
}

function NavItemMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="mobile-menu-container">
      <div
        onClick={toggleOpen}
        className={"mobile-burger-menu " + (isOpen ? "open" : "")}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={"mobile-nav-items-container " + (isOpen ? "open" : "")}>
        {NAV_LIST.map((NavItem, index) =>
          NavItemMobile({ ...NavItem, toggleOpen }, index)
        )}
      </div>
    </div>
  );
}

function NavItemMobile(
  { title, link, active, toggleOpen }: NavItemMobileProps,
  index: number
) {
  return (
    <Link href={link} key={"nav-item-" + index}>
      <div
        onClick={toggleOpen}
        className={"nav-item-mobile " + (active ? "active" : "")}
      >
        {title}
      </div>
    </Link>
  );
}

function SocialIcon(
  { link, title, component }: SocialIconProps,
  index: number
) {
  return (
    <div
      title={title}
      className="social-icon-container"
      key={"social-item-" + index}
    >
      <Link href={link}>
        <a>{component}</a>
      </Link>
    </div>
  );
}
