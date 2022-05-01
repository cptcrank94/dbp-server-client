import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { retrieveFeaturedItems } from '../../actions/items';
import ItemDataService from '../../services/item.service';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from "../Navigation/Navbar";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    ItemDataService.getFeatured()
        .then((response) => {
          setFeatured(response.data);
        })
        .catch((e) => {
            console.log(e);
        })

        setLoading(false);
  }, []);

  if (isLoading) return "Loading...";

  return (
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
        <div className="monthly-card-container">
            { featured && <h1>Monatskarte</h1>}
            { featured &&
                <div className="monthly-card-items">
                {
                  featured.map((item, index) => (
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

export default connect(mapStateToProps, { retrieveFeaturedItems })(Home);