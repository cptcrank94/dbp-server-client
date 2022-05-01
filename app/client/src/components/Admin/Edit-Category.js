import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import CategoryDataService from '../../services/category.service';

import Admin from './Admin';

function AdminEditCategory() {
  const [item, setItem] = useState({
    title: "",
    prio: 0,
  });
  const [isLoading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchData = async() => {
      const response = await CategoryDataService.getAll();
      setItem(response.data);
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  const handleTextFieldChange = (e) => {
    setItem({
      ...item,
      [e.target.id]: e.target.value
    })
  }

  if(isLoading) return ('Loading...');

  return (
    <div className="admin-content">
      <div className="left-content"><Admin /></div>
      <div className="right-content">
        <h2>Artikel bearbeiten (ID: {params.id})</h2>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: "50%" },
            marginTop: '20px',
          }}
        >
          <div>
            <TextField
              required
              id="title"
              label="Name"
              defaultValue={item.title || "Kategoriename"}
              onChange={handleTextFieldChange}
            />
          </div>
          <div>
            <TextField
              required
              id="prio"
              label="Reihenfolge"
              defaultValue={item.prio || "Priorität festlegen (0-100)"}
              onChange={handleTextFieldChange}
            />
          </div>
        </Box>
      </div>
    </div>
  )
}

export default AdminEditCategory