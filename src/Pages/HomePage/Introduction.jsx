import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Globe from "../Common Components/Globe";
import circular from '../../icons/circular.png'
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import { getBrowserName } from "../../utils";
import GetStarted from "../GetStarted";

export default function Introduction() {

    const shipScrollRef = useRef(null);
    const imgEl = useRef(null);
    const isSafariUsed = useMemo(() => {
        return getBrowserName() === 'Safari'
    }, [])
    const [imgElLoaded, setImgElLoaded] = useState(isSafariUsed);
    const onImageLoad = () => setImgElLoaded(true);
    const [isDesktopView, isMobileView] = [useMediaQuery('(min-width:1100px)'), useMediaQuery('(max-width:650px)')];
    const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

    const shipTextMotionEffects = useMemo(() => {
        return {
            initial: { y: !isMobileView && isDesktopView ? -10 : 300, scale: 0, opacity: 0 },
            whileInView: { y: !isMobileView && isDesktopView ? -290 : 20, scale: 1, opacity: 1, transition: { duration: 1, type: "spring" } }
        }
    }, [isDesktopView, isMobileView]);

    useEffect(() => {
        const imgElCurrent = imgEl.current;
        if (imgElCurrent) {
            imgElCurrent.addEventListener('load', onImageLoad);
            return () => imgElCurrent.removeEventListener('load', onImageLoad);
        }
    }, [imgEl]);


    return (
        <div className='ms-introduction-container'>
            <div ref={shipScrollRef} className='ms-introduction-contents'>
                <div className='ms-introduction-header-items'>
                    <p className='ms-introduction-header-items-left'>Maha Shipping Logistics.</p>
                    <IconButton LinkComponent={motion.div} onClick={() => setIsGetStartedOpen((prev) => !prev)}>
                        <Typography component={motion.p} whileHover={{ scale: 1.2 }} className='ms-introduction-header-items-right' >Get Started</Typography>
                    </IconButton>
                </div>
                {isDesktopView && <img ref={imgEl} className='ms-introduction-contents-circle-image' src={circular} alt='circular' />}
                {(imgElLoaded || !isDesktopView) && <motion.h1
                    initial={shipTextMotionEffects.initial}
                    whileInView={shipTextMotionEffects.whileInView}
                    className={isDesktopView ? 'ms-introduction-item-text-content' : isMobileView ? 'ms-introduction-item-text-content ms-introduction-item-text-content-mobile' : 'ms-introduction-item-text-content ms-introduction-item-text-content-tablet'}
                >
                    SHIP
                </motion.h1>
                }
            </div>
            {(imgElLoaded || !isDesktopView) && <Globe />}
            {isGetStartedOpen && <GetStarted open={isGetStartedOpen} handleClose={() => setIsGetStartedOpen((prev) => !prev)} />}
        </div>
    )
}
