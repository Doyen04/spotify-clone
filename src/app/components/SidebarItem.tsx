import Link from "next/link";


interface SidebarItemProps {
    icon : string;
    label: string;
    active: boolean;
    href: string;
    className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({icon, label, active, href, className}) => {
    return  (
        //  TODO: INSTALL TAILWIND MERGE
        <Link   href={href} 
                className={`flex flex-row h-auto items-center w-full 
                            gap-x-4 text-md font medium cursor-pointer 
                            hover:text-white transition text-neutral-400 py-1 ${active && 'text-white'}`} >
            <p className="truncate w-full">{label}</p>
        </Link>
    )
}

export default SidebarItem
