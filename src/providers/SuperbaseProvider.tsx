"use client"

import { useState } from "react"
import { Database } from "../../database.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

interface SuperbaseProviderProps {
    children: React.ReactNode
}

const SuperbaseProvider: React.FC<SuperbaseProviderProps> = ({ children }) => {
    const [supabaseClient] = useState(() => 
        createClientComponentClient<Database>()
    )
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}

export default SuperbaseProvider