import { useState } from "react";
import { PostcardSource, PostcardVisibility } from "./base";

/**
 * Hook holding as state the {@link PostcardContextContents}.
 */
export function useStatePostcard(defaultPostcard: PostcardSource) {
    const [src, setSrc] = useState<PostcardSource>(defaultPostcard);
    const [visibility, setVisibility] = useState<PostcardVisibility>(PostcardVisibility.BACKGROUND);

    return {
        src,
        setSrc,
        visibility,
        setVisibility,
    };
}
