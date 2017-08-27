import React, { Component } from 'react';
import {TimelineMax, Elastic} from 'gsap';
import GSAP from 'react-gsap-enhancer';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }



  render() {
    return (
      <div className="recipeContainer">
        <li className="recipePic" style={{
          backgroundImage: 'url(' + this.props.recipe.image_url + ')'
        }}></li>
        <li className="recipeData">{this.props.recipe.title}</li>
      </div>
    );
  }

}

export default Recipe;
