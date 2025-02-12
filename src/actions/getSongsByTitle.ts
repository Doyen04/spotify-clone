import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../types";
import { cookies } from "next/headers";
import getSongs from "./getSongs";


const getSongsByTitle = async (title: string): Promise<Song[]> => {
    // const cookieStore = await cookies();
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

if(!title){
    const allSongs = await getSongs()
    return allSongs;
}

    const { data: songs, error } = await supabase
    .from('songs').select('*').ilike('title', `%${title}%`).order('created_at', {ascending: false})

    if (error) {
        console.log(error);
        
    }

    return songs as Song[] || [];
}

export default getSongsByTitle;