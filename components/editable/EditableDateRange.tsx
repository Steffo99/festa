import { faChevronRight, faClock } from "@fortawesome/free-solid-svg-icons"
import { HTMLProps } from "react"
import { EditingContext } from "../../contexts/editing"
import { useDefinedContext } from "../../utils/definedContext"
import { FestaIcon } from "../extensions/FestaIcon"
import { FormDateRange } from "../form/FormDateRange"


type EditableDateRangeProps = {
    startProps: HTMLProps<HTMLInputElement> & {value?: string},
    endProps: HTMLProps<HTMLInputElement> & {value?: string},
}


export function EditableDateRange(props: EditableDateRangeProps) {
    const [editing,] = useDefinedContext(EditingContext)

    const startDate = props.startProps

    return editing ? (
        <FormDateRange
            preview={false}
            icon={
                <FestaIcon icon={faClock}/>
            }
            start={
                <input 
                    type="datetime-local" 
                    {...props.startProps}
                />
            }
            connector={
                <FestaIcon icon={faChevronRight}/>
            }
            end={
                <input 
                    type="datetime-local" 
                    {...props.endProps}
                />
            }
        />
    ) : (
        <FormDateRange
            preview={true}
            icon={
                <FestaIcon icon={faClock}/>
            }
            start={
                new Date(Date.parse(props.startProps.value!)).toLocaleString()
            }
            connector={
                <FestaIcon icon={faChevronRight}/>
            }
            end={
                new Date(Date.parse(props.endProps.value!)).toLocaleString()
            }
        />
    )
}