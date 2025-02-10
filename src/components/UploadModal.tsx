"use client"
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";

import uniqid from "uniqid"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";



const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUploadModal()
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })
    const onChange = (open: boolean) => {
        if (!open) {
            reset()
            uploadModal.onClose();
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)

            const imageFile = values.images?.[0]
            const songFile = values.song?.[0]

            if (!imageFile && !songFile && !user) {
                console.log("error missing field");
                return
            }
            const uniqueId = uniqid()

            const { data: songData, error: songError } = await supabaseClient
                .storage
                .from('songs').upload(`song-${values.title}-${uniqueId}`, songFile, { cacheControl: '3600', upsert: false })
            if (songError) {
                setIsLoading(false)
                return
            }

            const { data: imageData, error: imageError } = await supabaseClient
                .storage
                .from('images').upload(`image-${values.title}-${uniqueId}`, imageFile, { cacheControl: '3600', upsert: false })
            if (imageError) {
                setIsLoading(false)
                return
            }

            const { error: supabaseError } = await supabaseClient
                .from('songs').insert({
                    user_id: user?.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path
                })

            if (supabaseError) {
                setIsLoading(false)
                return
            }

            router.refresh()
            setIsLoading(false)
            reset()
            uploadModal.onClose()
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Modal title={"Upload your song"} description={"Upload an mp3 file"} isOpen={uploadModal.isOpen} onChange={onChange}>
            <form className="flex flex-col gap-y-4" action="" onSubmit={handleSubmit(onSubmit)}>
                <Input id='title' disabled={isLoading} placeholder="Song title" {...register('title', { required: true })} />
                <Input id='author' disabled={isLoading} placeholder="Song author" {...register('author', { required: true })} />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input id='song' type="file" disabled={isLoading} accept=".mp3"
                        {...register('song', { required: true })} />

                </div>
                <div>
                    <div className="pb-1">
                        Select a image file
                    </div>
                    <Input id='image' type="file" disabled={isLoading} accept="image/*"
                        {...register('image', { required: true })} />

                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    )
}

export default UploadModal;