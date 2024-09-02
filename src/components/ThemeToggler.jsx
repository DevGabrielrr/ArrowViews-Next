'use client'

import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div>
            <Button variant='outline' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                <div className="relative h-[1.1rem] w-[1.2rem] mt-2 hover:text-primary">
                    <SunIcon className='absolute inset-0 transition-transform duration-200 ease-in-out transform dark:rotate-90 dark:scale-0 scale-100' />
                    <MoonIcon className='absolute inset-0 transition-transform duration-200 ease-in-out transform rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
                </div>
            </Button>
        </div>
    );
}

export default ThemeToggler;
