import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types";
import { cookies } from "next/headers";


const getSongsByUserId = async (): Promise<Song[]> => {
    // const cookieStore = await cookies();
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    

    if (sessionError) {
        console.log(sessionError.message);
        return []
    }

    const {data, error} = await supabase
    .from('songs').select('*').eq('user_id', sessionData.session?.user.id).order('created_at', {ascending: false})
    console.log(data,error);
    
    if(error){
        console.log(error.message);
    }
    
    return data as Song[] || [];
}

export default getSongsByUserId;