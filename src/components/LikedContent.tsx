"use client"


import { Song } from "@/types";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";


interface LikedContentProps {
    songs: Song[]
}


const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {

    const onplay = useOnPlay(songs)


    if (songs.length == 0) {
        return <div className="flex flex-col w-full px-6 text-neutral-400">No liked songs found</div>
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem onClick={(id: string) => onplay(id)} data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}


export default LikedContent;