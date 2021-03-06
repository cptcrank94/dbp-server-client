import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Data Service
import CategoryDataService from '../../services/category.service';

// Material-UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Form React-hook-form
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import Admin from './Admin';

function AdminEditCategory() {
  const [title, setTitle] = useState(""); // String
  const [prio, setPrio] = useState(0); // Number
  const [isLoading, setLoading] = useState(true); // Boolean
  const params = useParams();

  useEffect(() => {
    const fetchData = async() => {
      const response = await CategoryDataService.get(params.id);
      setTitle(response.data.title);
      setPrio(response.data.prio);
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  // react-hook-form register form
  const { handleSubmit, register } = useForm();

  // Form submit
  const onSubmit = (data, e) => {
    e.preventDefault();

    console.log(data);
    CategoryDataService.update(params.id, data);
  }

  if(isLoading) return ('Loading...');

  return (
    <div className="admin-content">
      <div className="left-content"><Admin /></div>
      <div className="right-content">
        <h2>Artikel bearbeiten (ID: {params.id})</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              required
              {...register("title")}
              id="title"
              label="Name"
              defaultValue={title || "Kategoriename"}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              {...register("prio", {
                required: {
                  value: true,
                  message: "Bitte das Feld ausfüllen."
                },
                pattern: {
                  value: /^[1-9]\d*(\d+)?$/i,
                  message: "Bitte eine ganze Zahl angeben."
                },
              })}
              id="prio"
              label="Reihenfolge"
              defaultValue={prio || "Priorität festlegen (0-100)"}
              onChange={(e) => setPrio(e.target.value)}
            />
          </div>
          <Button
              type="submit"
              variant="contained"
            >
              Kategorie speichern
            </Button> 
        </form>
      </div>
    </div>
  )
}

export default AdminEditCategory