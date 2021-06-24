import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import styles from "styles/posts/index.module.scss";

export interface PostEntry {
  id: string;
  title: string;
  "Creation Date": string;
  Description: string;
  Slug: string;
  Tags: string[];
  imageLink: string;
}

export const PostEntryCard = (props: PostEntry) => {
  return (
    <Link href={`/posts/${props["Slug"]}`}>
      <a className={styles["blog-entry-container"]}>
        <div className={styles["blog-image-parent-container"]}>
          <div className={styles["blog-image-container"]}>
            {props.imageLink && (
              <Image
                alt="Post image"
                src={props.imageLink}
                width={280}
                height={280}
              />
            )}
          </div>
        </div>
        <div className={styles["blog-entry-text-container"]}>
          <div
            className={cn(styles["blog-entry-title-container"], "notion-h")}
          >
            <Link href={`/posts/${props["Slug"]}`}>
              <a className={styles["blog-entry-title"]}>
                {props["title"]}
              </a>
            </Link>
            <div className={styles["blog-entry-date"]}>
              {props["Creation Date"]}
            </div>
          </div>
          <div className={styles["blog-entry-description"]}>
            {props["Description"]}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PostEntryCard;
