import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Carousel} from 'flowbite-react';

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-3/4 mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Data Carousel</h1>
      <Carousel className="h-96">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col items-center justify-between h-full bg-gray-100 p-4 rounded-md shadow-md">
            {/* Gambar */}
            <div className="relative h-3/4 w-full">
              <img src={`http://127.0.0.1:8000/storage/${item.photo}`} alt={item.name} className="absolute top-0 left-0 w-full h-full object-cover rounded-md" />
            </div>

            {/* Nama dan Alamat */}
            <div className="mt-4 text-center">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="font-semibold text-gray-700">{item.address}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DataList;
