import React, { Component } from 'react';
import axios from 'axios';
import {TimelineMax, Elastic} from 'gsap';
import GSAP from 'react-gsap-enhancer';
import Recipe from './Recipe';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      gifVisibility: "notVisible",
      recipe: {}
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
          gifVisibility: "notVisible",
        });
        this.showResults();
      });
    event.preventDefault();
  }

  isLoading() {
      this.setState({
        gifVisibility: "visibile"
      });
  }

  showResults() {
    if (this.state.searchResults.length > 20) {
      const showRecipes = new TimelineMax();
      showRecipes.staggerFrom(".recipeContainer", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.01);
    }
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
            <p className="aboutProjectText">A visual exploration of the <a href="http://food2fork.com/about/api" target="_blank" alt="Link To The API used in this project">Food2Fork API</a><br />from <a href="http://www.creativedesignsbymike.com" target="_blank">Mike Dreiling</a></p>
          </div>
        </div>
        <img src="img/ajax-loader.gif" className={this.state.gifVisibility} />
        <ul className="gridSide">
          {this.state.searchResults.map((recipe) =>
            <Recipe recipe={recipe} />
          )}
        </ul>
      </div>
    );
  }
}

export default Home;
