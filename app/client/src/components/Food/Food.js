import React, {Component, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { retrieveItems } from '../../actions/items';
import { retrieveCats } from '../../actions/categorys';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Food extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.onClickSwitchCat = this.onClickSwitchCat.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setItems = this.setItems.bind(this);
        this.setCats = this.setCats.bind(this);
        this.setCurrentCat = this.setCurrentCat.bind(this);
        this.state = {
            currentItems: null,
            currentCats: null,
            currentCat: "Salat",
            searchTitle: "",
        };
    }

    componentDidMount() {
        this.props.retrieveItems(this.state.currentCat);
        this.props.retrieveCats();
    }

    componentDidUpdate() {
        this.props.retrieveItems(this.state.currentCat);
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        this.setState({
            searchTitle: searchTitle,
        });
    }

    onClickSwitchCat(e) {
        const selectedCat = e.target.id;
        this.setState({
            currentCat: selectedCat
        });
    }

    refreshData() {
        this.setState({
            currentItems: null,
            currentCats: null
        });
    }

    setItems(item) {
        this.setState({
            currentItems: item
        });
    }

    setCurrentCat(currentCat) {
        this.setState({
            currentCat: currentCat
        })
    }

    setCats(cat) {
        this.setState({
            currentCats: cat
        })
    }

    render() {
        const { items, cats } = this.props;
        return(
            <>
                <div className="header">
                    <div className="header-search">
                        <form>
                            <span className="search-icon">
                                <FontAwesomeIcon icon="fa-magnifying-glass" />
                            </span>
                            <input type="search" onChange={this.onChangeSearchTitle} placeholder="Produkte suchen"></input>
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
                                            className={(this.state.currentCat === item.title) ? 'cat-item active' : 'cat-item'}
                                            onClick={this.onClickSwitchCat}
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
                                        to={`/items/${item.id}`}
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
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        cats: state.cats
    };
};

export default connect(mapStateToProps, { retrieveItems, retrieveCats })(Food);