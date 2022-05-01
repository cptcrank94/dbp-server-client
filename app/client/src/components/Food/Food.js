import React, {useState, useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { retrieveItems } from '../../actions/items';
import { retrieveCats } from '../../actions/categorys';
import Navbar from "../Navigation/Navbar";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from "../../store";

function Food() {
    const [items, setItems] = useState([]);
    const [cats, setCats] = useState([]);
    const [currentCat, setcurrentCat] = useState("Salat");
    const [isLoading, setisLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveItems(currentCat))
            .then(() => {
                setItems(store.getState().items);
            }).catch((err) => {
                console.log(err);
            });

        dispatch(retrieveCats())
            .then(() => {
                setCats(store.getState().cats);
            }).catch((err) => {
                console.log(err);
            });

        setisLoading(false);

    }, [currentCat])

    const onClickSwitchCat = (e) => {
        const selectedCat = e.target.id;
        if (selectedCat !== currentCat) {
            setcurrentCat(selectedCat);
        }
    }

    if (isLoading) return "Loading...";

    return(
        <>
            <Navbar />
            <div className="header">
                <div className="header-search">
                    <form>
                        <span className="search-icon">
                            <FontAwesomeIcon icon="fa-magnifying-glass" />
                        </span>
                        <input type="search" placeholder="Produkte suchen"></input>
                    </form>
                </div>
            </div>
            <div className="content">
                <div className="category-navigation">
                    <ul className="cat-nav">
                        {
                            cats &&
                                cats.map((item, index) => (
                                    <li
                                        key={index}
                                        id={item.title}
                                        className={(currentCat === item.title) ? 'cat-item active' : 'cat-item'}
                                        onClick={onClickSwitchCat}
                                    >
                                        {item.title}
                                    </li>
                                ))
                            
                        }
                    </ul>
                </div>
                <div className="item-container">
                    { items &&
                        items.map((item, index) => (
                            <div key={index} className="monthly-card-item">
                                <h3 className="monthly-card-item-title">{item.title}</h3>
                                <span className="monthly-card-item-desc">{item.description}</span>
                                <h3 className="monthly-card-item-price">{item.price.priceTag}</h3>
                                <Link 
                                    to={`/items/detail/${item.id}`}
                                    className="item-link">
                                        <span className="arrow arrow-right"></span>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        cats: state.cats
    };
};

export default connect(mapStateToProps)(Food);