import { useState } from "react";
import { PostcardImage, PostcardVisibility } from "./PostcardContext";

export function useStatePostcard() {
    const [visibility, setVisibility] = useState<PostcardVisibility>(PostcardVisibility.BACKGROUND)
    const [image, setImage] = useState<PostcardImage>("none")

    return {
        visibility,
        setVisibility,
        image,
        setImage,
    }
}