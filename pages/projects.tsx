import MainLayout from 'layouts/main'
import { ReactElement } from 'react';
import { getPost } from 'utils/post-management';
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

interface ProjectPageProps {
    recordMap: ExtendedRecordMap;
}

export const getStaticProps = async () => {
    const results = await getPost("0561ad09-5dda-4692-8fa0-5a0baff7b14a");

    const recordMap = results.recordMap;
    return {
      props: {
        recordMap
      },
      revalidate: 10,
    };
};


function ProjectPage({ recordMap }: ProjectPageProps): ReactElement {
    return <NotionRenderer
    recordMap={recordMap}
    darkMode={false}
  />
}

ProjectPage.Layout = MainLayout;

export default ProjectPage;