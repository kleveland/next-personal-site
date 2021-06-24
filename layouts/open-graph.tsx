import styles from 'styles/layouts/open-graph.module.scss';

export default function OpenGraphLayout({ children }: { children: JSX.Element }) {
    return (
      <div className={styles["page-container"]}>
          {children}
      </div>
    );
  }