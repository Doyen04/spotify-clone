"use client"

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

interface LikeButtonProps {
    songId: string;
    className?: string
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, className }) => {
    const router = useRouter()
    const { supabaseClient } = useSessionContext()

    const authModal = useAuthModal()
    const { user } = useUser()

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        if (!user?.id) return

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single()

            if (!error && data) {
                setIsLiked(true)
            }
        }

        fetchData()
    }, [songId, supabaseClient, user?.id])

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleClick = async () => {
        if (!user) return authModal.onOpen()

        if (isLiked) {
            const { error } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songId)

            if (error) {
                console.log(error);
            } else {
                setIsLiked(false)
            }
        } else {
            const { error } = await supabaseClient
                .from('liked_songs')
                .insert({
                    user_id: user.id,
                    song_id: songId
                })


            if (error) {
                console.log(error);
            } else {
                setIsLiked(true )
            }
        }
        router.refresh()
    }

    return (
        <button onClick={handleClick} className={twMerge(`hover:opacity-75 transition `,className)}>
            <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
        </button>
    );
}

export default LikeButton;