import { createStateContext } from "../../utils/stateContext";


/**
 * {@link createStateContext State context} representing the editing state of a form.
 * 
 * If `true`, the components should be editable, while if `false`, the components should preview their contents.
 */
export const EditingContext = createStateContext<boolean>()
