import { useDefinedContext } from "../../../utils/definedContext";
import { createStateContext } from "../../../utils/stateContext";

/**
 * The mode the editing context is currently in.
 */
export enum EditingMode {
    /**
     * The page is being (pre)viewed.
     */
    VIEW = "view",

    /**
     * The page is being edited.
     */
    EDIT = "edit",
}

/**
 * The context of a previewable `form`.
 */
export const EditingContext = createStateContext<EditingMode>()


export type EditingModeBranchProps = {
    [Mode in EditingMode]: JSX.Element
}

/**
 * Component branching between its props based on the {@link EditingMode} of its innermost surrounding context.
 */
export const EditingModeBranch = (props: EditingModeBranchProps) => {
    const [mode] = useDefinedContext(EditingContext)

    return props[mode]
}
