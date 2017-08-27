import React, { Component } from 'react';
import axios from 'axios';
import {TimelineMax} from 'gsap';
import GSAP from 'react-gsap-enhancer';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      gifVisibility: "notVisible"
    }
  }

  recipeChangeHandler(event) {
    const recipeSearch = event.target.value;
    this.setState({
      recipeSearch: recipeSearch
    });
  }

  searchSubmitHandler(event) {
    this.isLoading();

    axios.get("/api/recipes/" + this.state.recipeSearch)
      .then((response) => {
        const searchResults = response.data.recipes;
        console.log(searchResults);
        this.setState({
          searchResults: searchResults,
          gifVisibility: "notVisible"
        });
      });
    event.preventDefault();
  }

  isLoading() {
      this.setState({
        gifVisibility: "visibile"
      });
  }


  render() {
    return (
      <div className="pageWrapper">
        <div className="searchSide">
          <img src="/img/logo.png" alt="Foodies Find It A React Visual Experiment By Mike Dreiling"/>
          <form className="recipeSearchForm" onSubmit={this.searchSubmitHandler.bind(this)}>
            <input className="recipeSearchInput" type="text" onChange={this.recipeChangeHandler.bind(this)} placeholder="SEARCH FOR RECIPES" />
            <input className="recipeSearchSubmit" type="submit" value="submit" />
          </form>
          <div className="aboutContainer">
            <p className="aboutProjectText">A visual exploration of the <a href="#">Food2Fork API</a><br />from <a href="http://www.creativedesignsbymike.com" target="_blank">Mike Dreiling</a></p>
          </div>
        </div>
        <img src="img/ajax-loader.gif" className={this.state.gifVisibility} />
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
