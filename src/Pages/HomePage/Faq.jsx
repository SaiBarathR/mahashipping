import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { useMemo } from "react";
export const containerVariants = {

};
export const dropUpVariants = {

};
export default function Faq() {
    const isMobileView = useMediaQuery('(max-width:650px)');

    const faqs = useMemo(() => {
        return [
            { question: 'How long does shipping take?', answer: 'Our shipping times vary depending on the shipping method chosen. Air shipping takes between 1-2 weeks, while sea shipping takes 4-6 weeks.' },
            { question: 'What’s the cost of shipping?', answer: 'Shipping costs depend on the freight weight, volume, destination, and mode of transport.You can use our handy freight calculator to get a quote.' },
            { question: 'Do you offer insurance?', answer: 'Yes, we provide insurance options to cover your cargo while in transit, giving you peace of mind.' },
            { question: 'Can I track my shipment?', answer: 'Absolutely! We offer state-of-the-art tracking services so you can follow your freight every step of the way.' }
        ]
    }, []);

    const container = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0, // this will set a delay before the children start animating
                staggerChildren: 0.3 // this will set the time inbetween children animation
            }
        }
    }

    const item = {
        hidden: {
            y: "100vw"
        },
        visible: {
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                mass: 0.3
                // remove delay: 0.3,
            }
        }
    }


    return (
        <div className='f-a-q'>
            <h2 className={isMobileView ? "faq-header faq-header-mobile" : 'faq-header'}>Logistics Wizardry - Answered!</h2>
            <Grid component={motion.div}
                initial="hidden"
                whileInView="visible"
                variants={container}
                container columnSpacing={1} spacing={1} maxWidth={'1440px'}>
                {faqs.map((faq, index) => {
                    return <Grid key={index + faq.question}
                        component={motion.div}
                        variants={item}
                        maxWidth={'400px'} xs={isMobileView ? 12 : 6} md={isMobileView ? 12 : 6} item className='q-a'>
                        <h2 className='faq-question'>{faq.question}</h2>
                        <h2 className='faq-answer'>{faq.answer}</h2>
                    </Grid>
                })}
            </Grid>
        </div>
    )
}
