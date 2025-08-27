import React from "react";
import { motion } from "framer-motion";
import "../styles/components/HomeBackground.scss";

export default function HomeBackground() {
    return (
        <div className='homefx' aria-hidden='true'>
            <div className='homefx__mesh' />
            <div className='homefx__grid' />
            <div className='homefx__blobs'>
                <motion.div
                    className='blob blob--a'
                    animate={{
                        x: ["-5%", "10%", "-5%"],
                        y: ["-10%", "0%", "-10%"],
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className='blob blob--b'
                    animate={{
                        x: ["15%", "-5%", "15%"],
                        y: ["5%", "-10%", "5%"],
                        scale: [1, 1.06, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </div>
    );
}
