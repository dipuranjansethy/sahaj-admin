import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Typography, Paper, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';

const UserData = () => {
  const [merchantsData, setMerchantsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('All');

  const fetchCityName = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      return response.data.locality || 'Unknown';
    } catch (error) {
      console.error('Error fetching city name:', error);
      return 'Unknown';
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sahajapi.vercel.app/user/getAllUsers');
      const dataWithCities = await Promise.all(response.data.map(async (merchant) => {
        if (merchant.location && merchant.location.coordinates && merchant.location.coordinates.length === 2) {
          const [longitude, latitude] = merchant.location.coordinates;
          const city = await fetchCityName(latitude, longitude);
          return { ...merchant, city };
        }
        return { ...merchant, city: 'Unknown' };
      }));

      // Extract unique cities for dropdown
      const uniqueCities = Array.from(new Set(dataWithCities.map(merchant => merchant.city)));
      setCities(['All', ...uniqueCities]); // Include 'All' option for no filtering

      setMerchantsData(dataWithCities);
      setFilteredData(dataWithCities); // Initialize filteredData
    } catch (error) {
      console.error('Error fetching merchants data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  useEffect(() => {
    if (selectedCity === 'All') {
      setFilteredData(merchantsData);
    } else {
      setFilteredData(merchantsData.filter(merchant => merchant.city === selectedCity));
    }
  }, [selectedCity, merchantsData]);

  const handleView = (id) => {
    const selectedMerchantData = filteredData.find((merchant) => merchant._id === id);
    setSelectedMerchant(selectedMerchantData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sahajapi.vercel.app/merchant/API/businesses/${id}`);
      console.log('Delete merchant with id:', id);
      setOpenModal(false);
      fetchData();
    } catch (error) {
      console.error('Error deleting merchant:', error);
    }
  };

  const getRowId = (row) => row._id;

  const columns = [
    { field: '_id', headerName: 'ID', hide: true },
    { field: 'userName', headerName: 'User Name', flex: 1 },
    { field: 'Mobile', headerName: 'Mobile', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'date', headerName: 'Join Date', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
  ];

  return (
    <MainCard title="ALL USER DATA">
      <div style={{ padding: '16px' }}>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            label="City"
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={filteredData} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} getRowId={getRowId} />
      </div>
    </MainCard>
  );
};

export default UserData;
