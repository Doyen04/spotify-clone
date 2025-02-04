"use client"

import { useRouter } from "next/navigation"




interface HeaderProps {
    children: React.ReactNode,
    className: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter()

    const handleLogOut = () => {
        ///
    }
    return (
        //  TODO: INSTALL TAILWIND MERGE

        <div className={`h-fit bg-gradient-to-b from-emerald-800 p-6 ${className}`}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button onClick={()=> router.back()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <div className="text-white">z</div>
                    </button>
                    <button onClick={()=> router.forward()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <div className="text-white">z</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header