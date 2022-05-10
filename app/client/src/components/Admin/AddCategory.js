import React, { useState, useEffect } from 'react';

// Data Service
import CategoryDataService from '../../services/category.service';

// Material-UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Form React-hook-form
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import Admin from './Admin';

function AddCategory() {
  const [title, setTitle] = useState(""); // String
  const [prio, setPrio] = useState(0); // Number

  // react-hook-form register form
  const { handleSubmit, register } = useForm();

  // Form submit
  const onSubmit = (data, e) => {
    e.preventDefault();

    console.log(data);
    CategoryDataService.create(data);
  }

  return (
    <div className="admin-content">
      <div className="left-content"><Admin /></div>
      <div className="right-content">
        <h2>Neue Kategorie anlegen</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              required
              {...register("title")}
              id="title"
              label="Name"
              placeholder="Kategoriename"
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
              placeholder="Priorität festlegen (0-100)"
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

export default AddCategory