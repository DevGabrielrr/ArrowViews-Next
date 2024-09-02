'use client';

import React, { useState, useEffect } from 'react';
import axiosFetch from '@/pages/api/axiosFetch';
import { StarFilledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

// Components
import Nav from './Nav';

export default function Header() {
    const [showData, setShowData] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosFetch.get();
                setShowData(response.data);
            } catch (error) {
                setShowData(null);
            }
        };
        fetchData();
    }, []);

    if (!showData) {
        return <div>Loading...</div>; // Renderiza um estado de carregamento enquanto os dados são buscados
    }

    return (
        <header>
            <div className="flex justify-end px-16">
                <Nav
                    containerStyles='flex gap-4 mt-3'
                    linkStyles='relative hover:text-primary transition-all'
                    underlineStyles='absolute left- top-full h-[2px] bg-primary w-full'
                />
            </div>
            <div className="flex flex-col md:flex-row mx-4 md:mx-8">
                <div className="flex-shrink-0 md:w-1/1 mb-4 md:mb-0">
                    <Image
                        src={showData.image.medium}
                        width={290}
                        height={280}
                        alt={showData.name}
                    />
                </div>

                <div className="flex-1 md:ml-8 px-12">
                    <h1 className="text-3xl md:text-5xl font-bold hover:text-primary mb-8">
                        {showData.name}
                    </h1>
                    <h2>
                        {showData.rating.average}
                        {/* Renderizar as estrelas */}
                        {[...Array(6)].map((_, index) => (
                            <StarFilledIcon
                                key={index}
                                className={`inline-block ml-1 text-yellow-500 ${index < showData.rating.average ? 'fill-current' : 'text-gray-400'}`}
                            />
                        ))}
                        <span className='mx-5 text-lg text-gray-600'>· 2012</span>
                    </h2>

                    <div className="flex flex-col md:flex-row md:gap-8 mb-6">
                        <div className="flex-1 mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white mb-2">Genres:</h3>
                            <p className="text-base text-gray-800 dark:text-white">{showData.genres.join(', ')}</p>
                        </div>

                        <div className="flex-1 mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white mb-2">Content Type:</h3>
                            <p className="text-base text-gray-800 dark:text-white">Superhero · Drama · Action · Crime; Mystery</p>
                        </div>

                        <div className="flex-1 mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white mb-2">Cast:</h3>
                            <p className="text-base text-gray-800 dark:text-white">Stephen Amell, Katie Cassidy, Grant Gustin, Emily Bett Rickards, mais..</p>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white mb-2 flex items-center">
                                Classification: <ExclamationTriangleIcon className="w-5 h-5 mx-2 text-red-500" />
                            </h3>

                            <p className="text-base text-gray-800 dark:text-white">Not recommended for children under 12 years old!</p>
                        </div>
                    </div>

                    <p className="text-base text-gray-800 dark:text-white leading-relaxed">
                        {showData.summary}
                    </p>
                </div>
            </div>
        </header>
    );
}
