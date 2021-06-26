import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface useUtterancesDeps {
  repo: string;
}
export default function useUtterances({ repo }: useUtterancesDeps) {
  const utterancesRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    if (utterancesRef.current && !commentsLoaded && inView) {
      const script: HTMLScriptElement = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.setAttribute("repo", repo);
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("theme", "github-light");
      script.setAttribute("crossorigin", "anonymous");
      script.async = true;
      utterancesRef.current.appendChild(script);
      setCommentsLoaded(true);
      return () => {
          const utterancesEl = document.getElementsByClassName("utterances")[0];
        if (utterancesRef.current && utterancesEl && commentsLoaded) utterancesRef.current.removeChild(utterancesEl);
      };
    }
  }, [utterancesRef, inView]);

  return { utterancesRef, inViewRef: ref, loaded: commentsLoaded };
}
