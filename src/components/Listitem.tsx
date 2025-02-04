"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge"


interface ListItemProps {
    image: string;
    name: string;
    href:string;
    className: string
}

const ListItem: React.FC<ListItemProps> = ({image, name, href, className}) => {
    const router = useRouter()

    const onClick = ()=>{
        router.push(href)
    }
    // TODO MEANING GROUP
    return  (
        <button className={twMerge(`relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4`, className)}>
            <div className="relative min-h-[64px] min-w-[64px]">
                {/* <Image /> */}
            </div>
        </button>
    )
}

export default ListItem