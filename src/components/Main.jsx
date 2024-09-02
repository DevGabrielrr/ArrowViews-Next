'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegCircle, FaDotCircle, FaSearch } from 'react-icons/fa'; 
import showsFetch from '@/pages/api/showsFetch';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Main() {
  const [shows, setShows] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await showsFetch.get();
        setShows(response.data);
      } catch (error) {
        setShows([]);
      }
    };
    fetchShows();
  }, []);

  const filteredShows = shows.filter(show => 
    show.season === selectedSeason && 
    show.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Carousel className="my-9 ">
        <div className="flex justify-center my-8 space-x-5">
          {[...Array(8)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setSelectedSeason(index + 1)}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform ${selectedSeason === index + 1
                  ? 'bg-primary dark:text-white scale-110 shadow-lg'
                  : 'bg-gray-300 dark:bg-zinc-800 dark:text-white hover:bg-green-600 dark:hover:bg-green-600 hover:text-white'
                }`}>
              <div className="flex items-center space-x-2">
                {selectedSeason === index + 1 ? <FaDotCircle /> : <FaRegCircle />}
                <span>Season {index + 1}</span>
              </div>
            </button>
          ))}
        </div>
        {/* Campo de busca com ícone */}
      <div className="flex justify-center my-6">
        <div className="relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 border border-gray-300 rounded-lg w-full dark:bg-zinc-800 dark:text-white"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-200" />
        </div>
      </div>

        <CarouselContent className="flex flex-wrap gap-1 justify-between px-16">
          {filteredShows.map(show => (
            <CarouselItem key={show.id} className="w-[24%]">
              <div className="p-4">
                <Card className="bg-gray-300 flex flex-col items-center max-h-96 dark:bg-zinc-900 p-6 shadow-2xl rounded-lg transform transition-transform duration-300 hover:scale-105 hover:translate-y-[-10px] cursor-pointer">
                  <Image
                    src={show.image.medium}
                    alt={show.name}
                    width={300}
                    height={400}
                    className="rounded-lg"
                    priority
                  />
                  <div className='absolute top-3 right-3 bg-black bg-opacity-50 text-white text-3xl px-2 py-1 rounded-full'>{show.number} </div>
                  <CardContent className="mt-4 text-center">
                    <h2 className="text-xl font-semibold">{show.name}</h2>
                    <p className="dark:text-gray-100">{show.summary.substring(0, 160)}...</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  );
}
