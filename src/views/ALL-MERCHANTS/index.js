import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import Loader from 'views/Loader';

const MerchantsData = () => {
  const [merchantsData, setMerchantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sahajapi.vercel.app/merchant/API/businesses');
      setMerchantsData(response.data);
      setLoading(false);
      const uniqueCities = [...new Set(response.data.map(item => item.city))];
      setCities(uniqueCities);
    } catch (error) {
      console.error('Error fetching merchants data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/merchant/${id}`);
  };

  const getRowId = (row) => row._id;

  const columns = [
    { field: '_id', headerName: 'ID', hide: true },
    { field: 'businessName', headerName: 'Business Name', flex: 1 },
    { field: 'blockBuildingName', headerName: 'Block/Building Name', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'merchantName', headerName: 'Merchant Name', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleView(params.row._id)} variant="contained" sx={{ backgroundColor: '#673ab7', color: '#ffffff' }}>
            View
          </Button>
        </div>
      )
    }
  ];

  const filteredData = selectedCity
    ? merchantsData.filter((merchant) => merchant.city === selectedCity)
    : merchantsData;

  return (
    <MainCard title="ALL MERCHANTS DATA">
      {loading ? (
        <Loader />
      ) : (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              label="City"
            >
              <MenuItem value="">
                <em>All Cities</em>
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={filteredData} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} getRowId={getRowId} />
          </div>
        </>
      )}
    </MainCard>
  );
};

export default MerchantsData;
