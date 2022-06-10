import { useTranslation } from "next-i18next"

type FestaMomentProps = {
    date: Date | null,
}

/**
 * Component that formats a {@link Date} to a machine-readable and human-readable HTML `time[datetime]` element. 
 */
export function FestaMoment({ date }: FestaMomentProps) {
    const { t } = useTranslation()

    if (!date || Number.isNaN(date.getTime())) {
        return (
            <span className="disabled">
                {t("dateNaN")}
            </span>
        )
    }

    const now = new Date()
    const machine = date.toISOString()

    let human
    // If the date is less than 24 hours away, display just the time
    if (date.getTime() - now.getTime() < 86_400_000) {
        human = date.toLocaleTimeString()
    }
    // Otherwise, display the full date
    else {
        human = date.toLocaleString()
    }

    return (
        <time dateTime={machine}>
            {human}
        </time>
    )
}