import { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { default as Head } from 'next/head'
import defaultPostcard from "../../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../../components/postcard/changer'
import { ViewEvent } from '../../components/events/views/event'
import useSWR from 'swr'
import { Event } from '@prisma/client'


export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            slug: context.query.slug,
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


type PageEventProps = {
    slug: string
}


const PageEvent: NextPage<PageEventProps> = ({ slug }) => {
    const { t } = useTranslation()
    const { data, error } = useSWR<Event>(`/api/events/${slug}`)

    return <>
        <Head>
            <title key="title">eventName - {t("siteTitle")}</title>
            <link rel="preload" href={`/api/events/${slug}`} as="fetch" />
        </Head>
        <Postcard
            src={data?.postcard ?? defaultPostcard}
        />
        <ViewEvent
            title={<>{data?.name ?? slug}</>}
            postcard={<></>}
            description={<>{data?.description}</>}
            daterange={<></>}
        />
    </>
}


export default PageEvent
