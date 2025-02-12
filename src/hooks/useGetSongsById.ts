import { Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useEffect, useMemo, useState } from "react"




const useGetSongsById = (id: string) => {

    const [isLoading, setIsLoading] = useState(false)
    const [song, setSong] = useState<Song | undefined>(undefined)
    const { supabaseClient } = useSessionContext()


    useEffect(() => {
        if (!id) {
            return
        }
        setIsLoading(true)

        const fetchSong = async () => {
            const { data, error } = await supabaseClient
                .from('song')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                setIsLoading(false)
                console.log(error.message)
            }
            setSong(data as Song)
            setIsLoading(false)
        }

        fetchSong()
    }, [id, supabaseClient])

    return useMemo(()=> ({
        isLoading,
        song
    }), [isLoading, song])
}


export default useGetSongsById