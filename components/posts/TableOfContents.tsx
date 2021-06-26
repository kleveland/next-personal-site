import { ReactElement } from 'react';
import Link from 'next/link';
import { TableOfContentsEntry } from "notion-utils";
import styles from 'styles/components/posts/TableOfContents.module.scss';

interface TableOfContentsProps {
  toc: TableOfContentsEntry[];
}

export default function TableOfContents({
  toc,
}: TableOfContentsProps): ReactElement {
  return (
    <aside className={"notion-aside " + styles["blog-notion-aside"]}>
      <div className={styles["blog-table-of-contents-title"]}>
        Table of Contents
      </div>
      <div className={styles["blog-table-of-contents"]}>
        {toc.map((entry, index) => {
          const className = "blog-table-of-contents__" + entry.type;
          if (!entry.id.replaceAll) return;
          const link = "#" + entry.id.replaceAll("-", "");
          return (
            <Link href={link} key={'toc-' + index}>
              <div
                className={
                  styles["blog-table-of-contents__entry"] +
                  " " +
                  styles[className]
                }
              >
                <a href={link}>{entry.text}</a>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
