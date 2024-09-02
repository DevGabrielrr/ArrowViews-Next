//link nextjs

import Link from "next/link";
import ThemeToggler from './ThemeToggler';


//next hooks
import { usePathname } from "next/navigation";

import { motion } from 'framer-motion'

const links = [
    { path: '/', name: 'home' },
    

]

const Nav = ({ containerStyles, linkStyles, underlineStyles }) => {
    const path = usePathname();
    return (
        <>
            <nav className={`${containerStyles}`}>
                {links.map((link, index) => {
                    return (
                        <Link href={link.path}
                            key={index}
                            className={`capitalize ${linkStyles}`}>

                            {link.path === path && (
                                <motion.span initial={{ y: '-100%' }} animate={{ y: 0 }} transition={{ type: 'tween' }} layoutId='underline' className={`${underlineStyles}`} />
                            )}
                            {link.name}
                        </Link>
                    );
                })}
                    <ThemeToggler />
            </nav>

            
        </>
    );
};

export default Nav;