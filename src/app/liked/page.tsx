import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import LikedContent from "@/components/LikedContent";
import Image from "next/image";

export const revalidate = 0
//TODO: Prevent page from loading if no user sign in then search for _page why use it alse explain middleware code

const LikedPage = async () => {
    const songs = await getLikedSongs()
    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="">
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                            <Image src="/images/liked.png" fill alt="Playlist" className="
                            object-cover" />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <p className="hidden md:block font-semibold text-sm">Playlist</p>
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                                Liked Songs
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs} />
        </div>
    );
}

export default LikedPage;