import { useRouter } from "next/router";
import {
  NAV_LIST,
  SOCIAL_LIST,
  SocialIcon,
  NavItemMenu,
  NavItem,
} from "components/Navigation";
import useResize from "utils/use-resize";
import Link from "next/link";
import cn from "classnames";

import styles from "styles/layouts/main.module.scss";

const MOBILE_BREAKPOINT = 680;

interface MainLayoutProps {
  children: JSX.Element;
  extendedHeader: boolean;
}

export default function MainLayout({
  children,
  extendedHeader,
}: MainLayoutProps) {

  // Set active nav item
  const router = useRouter();
  const matches = router.pathname.match(/(\/[\w+-]+)/g);
  NAV_LIST.forEach((item) => {
    item.active = (matches ? matches[0] : router.pathname) === item.link;
  });

  // Detect width to resize to mobile if needed
  const { width, isMobile } = useResize(MOBILE_BREAKPOINT);

  return (
    <div className={styles["page-container"]}>
      <div className={styles["header-parent-container"]}>
        <div
          className={cn(styles["header-container"], {
            [styles.extended]: extendedHeader,
          })}
        >
          <Link href="/">
            <a
              className={cn(styles["navigation-header-text"], {
                [styles.mobile]: isMobile,
              })}
            >
              KC
            </a>
          </Link>
          <div
            className={cn(styles["header-social-container"], {
              [styles.mobile]: isMobile,
            })}
          >
            {SOCIAL_LIST.map(SocialIcon)}
          </div>
          <div className={styles["navigation-container"]}>
            {width != 0 && (
              <div className={styles["navigation-inner-container"]}>
                {isMobile ? <NavItemMenu /> : NAV_LIST.map(NavItem)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(styles["root-container"], {
          [styles.extended]: extendedHeader,
        })}
      >
        <div className={styles["page-content"]}>{children}</div>
        <div className={styles["page-footer"]}>
          Made with ♥ by Kacey Cleveland
        </div>
      </div>
    </div>
  );
}
