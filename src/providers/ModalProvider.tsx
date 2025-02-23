"use client"

import React from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";


const ModalProvider: React.FC = () => {
    // const [isMounted, setIsMounted] = useState(false);

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);
    // if (!isMounted) return null;

    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    );
}

export default ModalProvider;