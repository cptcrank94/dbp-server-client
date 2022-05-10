import React, { useEffect, useState } from 'react';
import Admin from './Admin';
import { useParams } from 'react-router-dom';

// Data Services
import ItemDataService from '../../services/item.service';
import CategoryDataService from '../../services/category.service';
import TokenService from "../../services/token.service";

// Form MUI
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';

// Form React-hook-form
import { useForm, Controller, useFieldArray } from 'react-hook-form';

function AdminEditArticle() {

  const [title, setTitle] = useState(""); // String
  const [description, setDescription] = useState(""); // String
  const [price, setPrice] = useState([]); // Object with n arrays
  const [extras, setExtras] = useState([]); // Object with n arrays
  const [allergies, setAllergies] = useState([]); // Array
  const [featured, setFeatured] = useState(""); // Boolean
  const [category, setCategory] = useState(""); // String
  const [cats, setCats] = useState({}); // Array
  const [isLoading, setLoading] = useState(true); // Boolean
  const params = useParams();

  // Auth
  const accessToken = TokenService.getLocalAccessToken();

  // Allergene Object
  const allergene = [ 'Eier', 'Erdnüsse', 'Fische', 'Gluten', 'Krebstiere', 'Lupinen', 'Milch', 'Schalenfrüchte', 'Schwefeldioxid', 'Sellerie', 'Senf', 'Sesam', 'Soja', 'Weichtiere'];

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data for Item with ID (XXX)
      let responseItem = await ItemDataService.get(params.id);
      // Fetch data for getting all possible categorys
      let responseCats = await CategoryDataService.getAll();

      // Set data
      setTitle(responseItem.data.title);
      setDescription(responseItem.data.description);
      setPrice(responseItem.data.price);
      setAllergies(responseItem.data.allergies);
      setExtras(responseItem.data.extras);
      setFeatured(responseItem.data.featured);
      setCategory(responseItem.data.category);
      setCats(responseCats.data);
      setLoading(false);
      
      console.log(responseItem.data);
    }
    fetchData();
    
}, []);

  function handleSelect(checkedAllergene) {
    const newAllergene = allergies?.includes(checkedAllergene)
      ? allergies?.filter(name => name !== checkedAllergene)
      : [...(allergies ?? []), checkedAllergene];
      setAllergies(newAllergene);
    return newAllergene;
  }

  // react-hook-form register form
  const { register, control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      price: price.map((price) => ({size: price.size, priceTag: price.priceTag})),
      extras: extras.map((extra) => ({name: extra.name, price: extra.price})),
      allergies: allergies
    }
  });

  // Reset react-hook-form default values after API call
  useEffect(() => {
    reset({
      price: price.map((price) => ({size: price.size, priceTag: price.priceTag})),
      extras: extras.map((extra) => ({name: extra.name, price: extra.price})),
      allergies: allergies
    })
  }, [price, extras, allergies])

  // useFieldArray for adding / removing fields for price
  const {
    fields: priceFields,
    append: priceAppend,
    remove: priceRemove
  } = useFieldArray({ control, name: "price" });

  // useFieldArray for adding / removing fields for extras
  const {
    fields: extraFields,
    append: extraAppend,
    remove: extraRemove
  } = useFieldArray({ control, name: "extras" });

  // Form submit
  const onSubmit = (data, e) => {
    e.preventDefault();

    console.log(data);
    ItemDataService.update(params.id, data);
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
                id="title"
                label="Name"
                defaultValue={title || "Artikelname"}
                onChange={(e) => setTitle(e.target.value)}
                { ...register("title") }
              />
            </div>
            <div>
              <TextField
                required
                id="description"
                label="Beschreibung"
                multiline
                maxRows={4}
                defaultValue={description || "Beschreibung zum Artikel hier einfügen"}
                onChange={(e) => setDescription(e.target.value)}
                { ...register("description") }
              />
            </div>
            <div>
              <Controller
                control={control}
                name="category"
                onChange={(e) => setCategory(e.target.value) }
                defaultValue={category}
                render={({ name, field }) => (
                  <TextField
                   {...field}
                   select
                   variant="outlined"
                   label="Kategorie"
                   required
                   helperText="Kategorie auswählen"
                  >
                    {
                      cats.map((cat) => (
                        <MenuItem key={cat.title} value={cat.title}>{cat.title}</MenuItem>
                      ))
                    }
                  </TextField>
                )}
              />
            </div>
            <div>
              <h4>Preise</h4>
              <ul className="price-list-container">
                { priceFields.map((item, index) => {
                    return (
                      <li className="price-list-item" key={item.id}>
                        <TextField
                          required
                          className="price-list-item-size"
                          {...register(`price.${index}.size`)} 
                        />

                        <Controller
                          render={({ field }) => <TextField {...field} />}
                          name={`price.${index}.priceTag`}
                          className="price-list-item-priceTag"
                          control={control}
                        />
                        <Button variant="contained" type="button" onClick={() => priceRemove(index)}>Löschen</Button>
                      </li>
                    )
                  })}
              </ul>
              <Button
                variant="contained"
                onClick={() => {
                  priceAppend({ size: "", priceTag: ""});
                }}
              >
                Hinzufügen
              </Button>
            </div>
            <div>
              <h4>Extras</h4>
              <ul className="extras-list-container">
                { extraFields.map((item, index) => {
                    return (
                      <li className="extras-list-item" key={item.id}>
                        <TextField
                          required
                          className="extras-list-item-size"
                          {...register(`extras.${index}.name`)} 
                        />

                        <Controller
                          render={({ field }) => <TextField {...field} />}
                          name={`extras.${index}.price`}
                          className="extras-list-item-price"
                          control={control}
                        />
                        <Button variant="contained" type="button" onClick={() => extraRemove(index)}>Löschen</Button>
                      </li>
                    )
                  })}
              </ul>
              <Button
                variant="contained"
                onClick={() => {
                  extraAppend({ name: "", price: ""});
                }}
              >
                Hinzufügen
              </Button>
            </div>
            <div>
              <FormGroup>
                <h4>Allergene</h4>
                <div className="article-allergene-checkboxes">
                  <Controller
                    control={control}
                    name="allergies"
                    render={() =>
                      allergene.map((item) => (
                        <>
                        <FormControlLabel
                          key={item}
                          label={item}
                          control={
                            <Checkbox
                              onChange={() => handleSelect(item)}
                              defaultChecked={allergies.includes(item)}
                            />
                          }
                        />
                        </>
                      ))
                    }
                  />
                </div>
              </FormGroup>
            </div>
            <FormGroup>
              <FormControlLabel
                label="In der Monatskarte anzeigen"
                control={
                  <Controller
                    name="featured"
                    onClick={(e) => setFeatured(e.target.value)}
                    control={control}
                    defaultValue={featured}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        defaultChecked
                      />
                    )}
                  />
                }
              />
            </FormGroup>
            <Button
              type="submit"
              variant="contained"
            >
              Artikel speichern
            </Button> 
          </form>
      </div>
    </div>
  )
}

export default AdminEditArticle