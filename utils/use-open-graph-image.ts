import { useRouter } from 'next/router';
import { getAbsoluteURL } from './utils';

export default function useOpenGraphImage() {
    const router = useRouter();
    console.log(router.asPath.replace('/posts/', '/posts/open-graph/'));
        const searchParams = new URLSearchParams()
        searchParams.set("path", router.asPath.replace('/posts/', '/posts/open-graph/'));
    // Open Graph & Twitter images need a full URL including domain
    console.log(`/api/open-graph-image?${searchParams}`);
    const fullImageURL = getAbsoluteURL(`/api/open-graph-image?${searchParams}`);
    return { imageURL: fullImageURL };
}