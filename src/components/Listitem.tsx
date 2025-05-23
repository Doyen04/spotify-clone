"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge"
import React from "react";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
    className?: string
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href, className }) => {
    const router = useRouter()
    const AuthModal = useAuthModal()
    const { isLoading, user } = useUser()

    const onClick = () => {
        if(!user && !isLoading)  AuthModal.onOpen()
        router.push(href)
    }
    // TODO MEANING GROUP
    return (
        <button onClick={onClick} title={name} className={twMerge(`relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4`, className)}>
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image src={image} alt="image" className="object-cover" fill />
            </div>
            <p className="font-medium truncate py-5">
                {name}
            </p>
            <div className="absolute transition opacity-0 rounded-full flex items-center 
            justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 
            hover:scale-110">
                <FaPlay className="text-black" />
            </div>
        </button>
    )
}

export default ListItem