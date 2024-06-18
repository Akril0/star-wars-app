'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";


const Redirect = () => {
    const router = useRouter()
    useEffect(() => {
        (async () => router.push('/'))()
    }, [router]);
    return (<></>

    );
};

export default Redirect;
