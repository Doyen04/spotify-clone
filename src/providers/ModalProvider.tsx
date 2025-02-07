"use client"

import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";

interface ModalProviderProps {
    children: React.ReactNode
}

const ModalProvider: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;

    return ( 
        <>
             <AuthModal />
        </>
     );
}
 
export default ModalProvider;