"use client"
import React, { useEffect, useState } from "react";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from 'use-sound'


import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";


interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer()
    const [volume, setVolume] = useState(1)
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)

    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const VolumeIcon = volume == 0 ? HiSpeakerXMark : HiSpeakerWave

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return
        }
        const currentIndex = player.ids.findIndex((id) => id == player.activeId)
        const nextSong = player.ids[currentIndex + 1]

        if (!nextSong) return player.setId(player.ids[0])
        player.setId(nextSong)
    }
    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return
        }
        const currentIndex = player.ids.findIndex((id) => id == player.activeId)
        const previousSong = player.ids[currentIndex - 1]

        if (!previousSong) return player.setId(player.ids[player.ids.length - 1])
        player.setId(previousSong)
    }

    const [play, { pause, sound, duration }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false)
                onPlayNext()
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3'],
            onload: () => {
                console.log('sound loaded')
            }
        })

    useEffect(() => {
        sound?.play()
        // if(duration){
        const interval = setInterval(() => {
            if (duration) {
                setProgress((sound.seek() / (duration / 1000)) * 100);
            }
        }, 500);
        // }
        return () => {
            sound?.unload()
            clearInterval(interval)
        }
    }, [sound, duration])

    const handlePlay = () => {
        if (!isPlaying) play()
        else pause()
    }

    const toggleMute = () => {
        if (volume == 0) setVolume(1)
        else setVolume(0)
    }

    const handleSeek = (value: number) => {
        if (duration) {
            const newTime = (value / 100) * duration;
            if (sound) {
                sound.seek(newTime / 1000); // Convert to seconds
                setProgress((value));
            }
        }
    };
    const formatTime = (num: number) => {
        if (num === 0 || !num) return "00:00";
        if (duration && num) {
            const sec = Math.floor(num / 1000) % 60
            const min = Math.floor((num / 1000) / 60)
            const fSec = (sec <= 9 )? `0${sec}` : `${sec}`
            const fMin = (min <= 9 )? `0${min}` : `${min}`
            return `${fMin}:${fSec}`
        }
        return "00:00";
    }

    return (

        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4 ">
                    <MediaItem onClick={() => { }} data={song} />
                    <LikeButton songId={song.id} className="hidden md:block" />
                </div>
            </div>
            <div className="flex w-full flex-col justify-center items-center bg-green">
                <div className="h-1/2 flex justify-center items-center w-full max-w-[722px] gap-x-6">
                    <AiFillStepBackward onClick={onPlayPrevious} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" />
                    <div onClick={handlePlay} className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
                        <Icon size={30} className="text-black" />
                    </div>
                    <AiFillStepForward onClick={onPlayNext} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" />
                </div>
                <div className="flex w-full h-1/3 items-center gap-x-1">
                    <p className="font-thin text-xs flex-shrink-0">{sound ? formatTime(sound.seek() * 1000) : "00:00"}</p>
                    <Slider value={progress} max={100} step={1} onChange={(value) => handleSeek(value)} />
                    <p className="font-thin text-xs">{formatTime(duration!)}</p>
                </div>
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon size={34} className="cursor-pointer" onClick={toggleMute} />
                    <Slider value={volume} onChange={(value) => setVolume(value)} />
                </div>
            </div>
        </div>
    );
}

export default PlayerContent;