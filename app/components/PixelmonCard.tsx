'use client'
import React from 'react';
import { Pixelmon, RelicResponse } from '../types/Pixelmon';
import Image from 'next/image';

interface PixelmonCardProps {
    pixelmon: Pixelmon;
}

const PixelmonCard: React.FC<PixelmonCardProps> = ({ pixelmon }) => {

    return (
        <div className="border rounded shadow p-4">
            <img src={pixelmon.imageUrl} alt={pixelmon.name} className="w-full h-auto" />
            <h2 className="text-lg font-bold mt-2">{pixelmon.name}</h2>
            <p>Rarity: {pixelmon.rarity}</p>
            <p>Tribe: {pixelmon.tribe}</p>

            {/* Display relics leaderboard */}
            <div className="mt-4">
                <h3 className="font-bold">Relics:</h3>
                <ul>
                {pixelmon.relicsResponse.map((relic: RelicResponse, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                        <Image 
                            width='32' 
                            height='32' 
                            alt='Relic' 
                            src={`/relics/${relic.relicsType.toLowerCase()}.png`}
                        />
                        <span>{`${relic.relicsType}: ${relic.count}`}</span>
                    </li>
                ))}
            </ul>
            </div>
            <div className='mt-4'>
                <h3 className='font-bold'>Total Relics: {pixelmon.totalCount}</h3>
            </div>
        </div>
    );
}

export default PixelmonCard;