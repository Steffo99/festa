import { faChevronRight, faClock } from "@fortawesome/free-solid-svg-icons"
import { HTMLProps } from "react"
import { EditingContext } from "../contexts/editing"
import { useDefinedContext } from "../../utils/definedContext"
import { FestaIcon } from "../extensions/FestaIcon"
import { FormDateRange } from "../form/FormDateRange"
import { HumanDate } from "../HumanDate"


type EditableDateRangeProps = {
    startProps: HTMLProps<HTMLInputElement> & {value?: string},
    endProps: HTMLProps<HTMLInputElement> & {value?: string},
}


export function EditableDateRange(props: EditableDateRangeProps) {
    const [editing,] = useDefinedContext(EditingContext)

    if(editing) {
        return (
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
        )
    }

    const startTime = Date.parse(props.startProps.value!)
    const endTime = Date.parse(props.endProps.value!)

    if(Number.isNaN(startTime) && Number.isNaN(endTime)) {
        return null
    }

    const startDate = new Date(startTime)
    const endDate = new Date(endTime)

    return (
        <FormDateRange
            preview={true}
            icon={
                <FestaIcon icon={faClock}/>
            }
            start={
                <HumanDate date={startDate}/>
            }
            connector={
                <FestaIcon icon={faChevronRight}/>
            }
            end={
                <HumanDate date={endDate}/>
            }
        />
    )
}