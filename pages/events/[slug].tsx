import { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { default as Head } from 'next/head'
import defaultPostcard from "../../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../../components/postcard/changer'
import useSWR from 'swr'
import { Event } from '@prisma/client'
import { useCallback, useState } from 'react'
import { ToolBar } from '../../components/generic/toolbar/bar'
import { ToolToggleEditing } from '../../components/events/toolbar/toolToggleEditing'
import { ToolToggleVisibility } from '../../components/postcard/toolbar/toolToggleVisibility'
import { WIPBanner } from '../../components/generic/wip/banner'
import { AuthContext } from '../../components/auth/base'
import { useDefinedContext } from '../../utils/definedContext'
import { useAxios } from '../../components/auth/requests'
import { database } from '../../utils/prismaClient'
import { EventsActionEdit } from '../../components/events/actions/edit'
import { EventsActionView } from '../../components/events/actions/view'


export async function getServerSideProps(context: NextPageContext) {
    const slug = context.query.slug as string

    return {
        props: {
            slug,
            fallbackData: await database.event.findUnique({ where: { slug } }),
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


type PageEventProps = {
    slug: string,
    fallbackData: Event,
}


const PageEvent: NextPage<PageEventProps> = ({ slug, fallbackData }) => {
    const { t } = useTranslation()
    const axios = useAxios()

    const { data, mutate } = useSWR<Event>(`/api/events/${slug}`, { fallbackData })
    const [auth,] = useDefinedContext(AuthContext)
    const [eventEditing, eventSetEditing] = useState<boolean>(false)

    const save = useCallback(
        async () => {
            const response = await axios.patch<Event>(`/api/events/${slug}`, data!)
            mutate(response.data, { revalidate: false })
        },
        [axios, data, mutate, slug]
    )

    const eventName = data?.name ?? slug
    const eventPostcard = data?.postcard || defaultPostcard
    const eventCanEdit = auth && data && auth.userId === data.creatorId

    return <>
        <Head>
            <title key="title">{eventName} - {t("siteTitle")}</title>
        </Head>
        <Postcard src={eventPostcard} />
        <WIPBanner />
        <ToolBar vertical="vadapt" horizontal="right">
            <ToolToggleVisibility />
            {eventCanEdit &&
                <ToolToggleEditing
                    editing={eventEditing}
                    setEditing={eventSetEditing}
                    save={save}
                />
            }
        </ToolBar>
        {eventEditing ?
            <EventsActionEdit data={data!} mutate={mutate} />
            :
            <EventsActionView data={data!} />
        }
    </>
}


export default PageEvent
