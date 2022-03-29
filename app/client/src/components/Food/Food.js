import React, {Component} from 'react';
import { connect } from 'react-redux';
import { retrieveItems } from '../../actions/items';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Food extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setItems = this.setItems.bind(this);
        this.state = {
            currentItems: null,
            searchTitle: "",
        };
    }

    componentDidMount() {
        this.props.retrieveItems();
    }
    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        this.setState({
            searchTitle: searchTitle,
        });
    }
    refreshData() {
        this.setState({
            currentItems: null
        });
    }

    setItems(item) {
        this.setState({
            currentItems: item
        });
    }

    render() {
        const { items } = this.props;
        console.log(this.props);
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
    };
};

export default connect(mapStateToProps, { retrieveItems })(Food);