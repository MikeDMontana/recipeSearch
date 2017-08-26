import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    }
  }

  recipeChangeHandler(event) {
    const recipeSearch = event.target.value;
    this.setState({
      recipeSearch: recipeSearch
    });
  }

  searchSubmitHandler(event) {
    axios.get("/api/recipes/" + this.state.recipeSearch)
      .then((response) => {
        const searchResults = response.data.recipes;
        console.log(searchResults);
        this.setState({
          searchResults: searchResults
        });
      });
    event.preventDefault();
  }

  hoverHandler(event) {
    console.log(event.target.value);
  }


  render() {
    return (
      <div className="pageWrapper">
        <div className="searchSide">
          <img src="/img/logo.png" />
          <form className="recipeSearchForm" onSubmit={this.searchSubmitHandler.bind(this)}>
            <input className="recipeSearchInput" type="text" onChange={this.recipeChangeHandler.bind(this)} placeholder="SEARCH FOR RECIPES" />
            <input className="recipeSearchSubmit" type="submit" value="submit" />
          </form>
        </div>
        <ul className="gridSide">
            {this.state.searchResults.map((recipe) =>
              <div className="recipeContainer">
                <li className="recipePic" style={{
                  backgroundImage: 'url(' + recipe.image_url + ')'
                }}></li>
                <li className="recipeData">{recipe.title}</li>
              </div>
            )}
        </ul>
      </div>
    );
  }
}

export default Home;
