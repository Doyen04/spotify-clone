import { Song } from "@/types"
import useAuthModal from "./useAuthModal"
import usePlayer from "./usePlayer"
import { useUser } from "./useUser"



const useOnPlay = (songs: Song[]) => {
    const player = usePlayer()
    const authModal = useAuthModal()
    const {user} = useUser()

    const onPlay =  (id: string) => {
        if (!user) {
            authModal.onOpen()
            return
        }
        player.setId(id)
        player.setIds(songs.map((song) => song.id))
        console.log(id)
    }
    return onPlay
}

export default useOnPlay;