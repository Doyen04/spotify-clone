import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../types";
import { cookies } from "next/headers";


const getLikedSongs = async (): Promise<Song[]> => {
    // const cookieStore = await cookies();
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

    const {data} = await supabase.auth.getSession();

    const { data: songs, error } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', data.session?.user.id) 
    .order('created_at', {ascending: false})

    if (error) {
        console.log(error);
    }

    if(!songs ) return []

    return songs.map((item)=>({
        ...item.songs
    }))
}

export default getLikedSongs;