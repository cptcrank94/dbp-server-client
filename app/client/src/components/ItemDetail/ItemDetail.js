import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ItemDataService from '../../services/item.service';
import Navbar from "../Navigation/Navbar";

export const ItemDetail = (props) => {

    const [Item, setItem] = useState();
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        ItemDataService.get(params.id)
        .then((response) => {
            setItem(response.data);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e);
        })
    }, [params.id]);

    if(loading) return ('Loading...');

    return (
        <>
            <Navbar />
            <div className="header header-item-details">
                <div className="item-back-button">
                    <a onClick={() => { navigate(-1) }} className="arrow-box">
                        <span className="arrow arrow-left"></span>
                    </a>
                </div>
            </div>
            <div className="content-item-details">
                <div className="item-detail-container">
                    <div className="item-detail">
                        <h1 className="item-detail-title">{Item.title}</h1>
                        <span className="item-detail-desc">{Item.description}</span>
                        {
                            
                            Object.entries(Item.price).map(([key, value]) => (
                                <div key={key} className="item-detail-price">
                                    <span className="item-detal-price-portion-small">{value.size}</span>
                                    <div className="item-detail-order">
                                        <span className="item-detail-price-text">{value.priceTag} €</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="item-detail-ingredient">
                    <div className="ingredient-box">
                        <h2>Allergene</h2>
                        <div className="ingredient-container">
                            {
                                Item.allergies.map((item) => (
                                    <div key={item} className={`ingredient-item ${item.toLowerCase()}`}>
                                        <span className="ingredient-icon"></span>
                                        <span className="ingredient-text">{item}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default connect(null, null)(ItemDetail);