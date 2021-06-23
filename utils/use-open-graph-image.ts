import { useRouter } from 'next/router';
import { getAbsoluteURL } from './utils';

export default function useOpenGraphImage() {
    const router = useRouter();
    console.log(router);
        const searchParams = new URLSearchParams()
        searchParams.set("path", router.asPath);
    // Open Graph & Twitter images need a full URL including domain
    console.log(`/api/open-graph-image?${searchParams}`);
    const fullImageURL = getAbsoluteURL(`/api/open-graph-image?${searchParams}`);
    return { imageURL: fullImageURL };
}