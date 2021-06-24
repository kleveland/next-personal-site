import styles from 'styles/layouts/open-graph.module.css';

export default function OpenGraphLayout({ children }: { children: JSX.Element }) {
    return (
      <div className={styles["page-container"]}>
          {children}
      </div>
    );
  }