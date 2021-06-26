import { ReactElement, useState } from "react";
import cn from "classnames";
import GithubComponent from "components/svg/github";
import LinkedinComponent from "components/svg/linkedin";
import MediumComponent from "components/svg/medium";

import Link from "next/link";

import styles from "styles/components/Navigation.module.scss";

export const NAV_LIST: { title: string; link: string; active?: boolean }[] = [
  {
    title: "Home",
    link: "/",
  },
  { title: "Projects", link: "/projects" },
  { title: "Posts", link: "/posts" },
];

export const SOCIAL_LIST: {
  path: string;
  link: string;
  title: string;
  component: ReactElement;
}[] = [
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

export function NavItem({ title, link, active }: NavItemProps, index: number) {
  return (
    <Link href={link} key={"nav-item-" + index}>
      <div
        id={index === 0 ? "skip-link" : undefined}
        className={cn(styles["nav-item"], { [styles.active]: active })}
      >
        {title}
      </div>
    </Link>
  );
}

export function NavItemMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className={styles["mobile-menu-container"]}>
      <div
        onClick={toggleOpen}
        className={cn(styles["mobile-burger-menu"], { [styles.open]: isOpen })}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={cn(styles["mobile-nav-items-container"], { [styles.open]: isOpen })}
      >
        {NAV_LIST.map((NavItem, index) =>
          NavItemMobile({ ...NavItem, toggleOpen }, index)
        )}
      </div>
    </div>
  );
}

export function NavItemMobile(
  { title, link, active, toggleOpen }: NavItemMobileProps,
  index: number
) {
  return (
    <Link href={link} key={"nav-item-" + index}>
      <div
        onClick={toggleOpen}
        className={cn(styles["nav-item-mobile"], { [styles.active]: active })}
      >
        {title}
      </div>
    </Link>
  );
}

export function SocialIcon(
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
