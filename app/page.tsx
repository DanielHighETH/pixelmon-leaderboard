'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import PixelmonCard from '@/app/components/PixelmonCard';
import { Pixelmon } from '@/app/types/Pixelmon';
import Pagination from '@/app/components/Pagination';

const MAX_PER_PAGE = 100;

const Home: React.FC = () => {
  const [pixelmons, setPixelmons] = useState<Pixelmon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [sortType, setSortType] = useState<string>('totalCount');
  const [rarityFilter, setRarityFilter] = useState<string>('');
  const [tribeFilter, setTribeFilter] = useState<string>('');

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
  };

  const handleRarityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRarityFilter(event.target.value);
  };

  const handleTribeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTribeFilter(event.target.value);
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/getPixelmonData');
        const data: Pixelmon[] = await response.json();
        setPixelmons(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const indexOfLastPixelmon = currentPage * MAX_PER_PAGE;
  const indexOfFirstPixelmon = indexOfLastPixelmon - MAX_PER_PAGE;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const sortedAndFilteredPixelmons = [...pixelmons]
    .filter((pixelmon) => {
      return (rarityFilter ? pixelmon.rarity === rarityFilter : true) &&
        (tribeFilter ? pixelmon.tribe === tribeFilter : true);
    })
    .sort((a, b) => {
      if (sortType === 'totalCount') {
        return b.totalCount - a.totalCount;
      } else {
        const countA = a.relicsResponse.find(relic => relic.relicsType === sortType)?.count || 0;
        const countB = b.relicsResponse.find(relic => relic.relicsType === sortType)?.count || 0;
        return countB - countA;
      }
    });

  const currentPixelmons = sortedAndFilteredPixelmons.slice(indexOfFirstPixelmon, indexOfLastPixelmon);



  if (loading) return <div>Loading...</div>;
  if (!pixelmons.length) return <div>No data found.</div>;

  return (
    <div>

      <div className="p-4">
        <label htmlFor="sort">Sort By: </label>
        <select id="sort" value={sortType} onChange={handleSortChange} className="border rounded p-1">
          <option value="totalCount">Total Count</option>
          <option value="unRevealed">Unrevealed</option>
          <option value="wood">Wood</option>
          <option value="bronze">Bronze</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="diamond">Diamond</option>
        </select>
      </div>

      <div className="flex gap-4 p-4">
        <div>
          <label htmlFor="rarity">Rarity: </label>
          <select id="rarity" value={rarityFilter} onChange={handleRarityChange} className="border rounded p-1">
            <option value="">All</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legendary">Legendary</option>
            <option value="Mythical">Mythical</option>
          </select>
        </div>
        <div>
          <label htmlFor="tribe">Tribe: </label>
          <select id="tribe" value={tribeFilter} onChange={handleTribeChange} className="border rounded p-1">
            <option value="">All</option>
            <option value="Water">Water</option>
            <option value="Fire">Fire</option>
            <option value="Earth">Earth</option>
            <option value="Air">Air</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {currentPixelmons.map(pixelmon => (
          <PixelmonCard key={pixelmon._id} pixelmon={pixelmon} />
        ))}
      </div>
      <Pagination
        itemsPerPage={MAX_PER_PAGE}
        totalItems={pixelmons.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
