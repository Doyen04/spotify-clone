"use client"

import usePlayer from "@/hooks/usePlayer";
import useGetSongsById from "@/hooks/useGetSongsById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";


const Player = () => {
    const player = usePlayer()
    const {song} = useGetSongsById(player.activeId)

    const songUrl = useLoadSongUrl(song!)
    
    if(!song || !songUrl || !player.activeId){ 
            return null
    }
    return ( 
        <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">

        </div>
     );
}
 
export default Player;