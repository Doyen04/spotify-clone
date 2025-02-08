"use client"

import { useRouter } from "next/navigation"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import Button from "./Button"
import React from "react";
import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { FaUserAlt } from "react-icons/fa"




interface HeaderProps {
    children: React.ReactNode,
    className: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const { onOpen } = useAuthModal()
    const router = useRouter()

    const supabaseClient = useSupabaseClient()
    const { user } = useUser()

    const handleLogOut = async () => {
        const { error } = await supabaseClient.auth.signOut()

        router.refresh()
        if (error) {
            console.error(error)
        }
    }
    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button title="Go Back" onClick={() => router.back()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretLeft size={35} className="text-white" />
                    </button>
                    <button title="Go Forward" onClick={() => router.forward()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretRight size={35} className="text-white" />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button title="Home" className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome size={20} className="text-black" />
                    </button>
                    <button title="Search" className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch size={20} className="text-black" />
                    </button>
                </div>
                <div className="flex justify-between items-center gaps-x-4">
                    {/* <> */}
                    {user ?
                        (
                            <div className="flex gap-x-4 items-center">
                                <Button onClick={handleLogOut} className="bg-white px-6 py-2">
                                    LogOut
                                </Button>
                                <Button onClick={() => { router.push('/account') }} className="bg-white">
                                    <FaUserAlt />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <Button onClick={onOpen} className="bg-transparent text-neutral-300 font-medium">
                                        Sign Up
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={onOpen} className="bg-white px-6 py-2">
                                        Login Up
                                    </Button>
                                </div>
                            </>
                        )}

                    {/* </> */}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header