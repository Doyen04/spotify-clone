import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../types";
import { cookies } from "next/headers";


const getSongs = async (): Promise<Song[]> => {
    // const cookieStore = await cookies();
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

    const { data: songs, error } = await supabase
    .from('songs').select('*').order('created_at', {ascending: false})

    if (error) {
        console.log(error);
        
    }

    return songs as Song[] || [];
}

export default getSongs;