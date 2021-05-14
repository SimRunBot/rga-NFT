import React, { useEffect, useState } from "react";
import colordict from "./Colordict";
import Sketch from "react-p5";
// TODO improve RGA artwork by better random p5 code

const map_col = value => Math.round((value * 255) / 100);


function Artworksketch({ artwork }) {
  const random_value = artwork.random_value.toString();
  const rv1 = artwork.random_value.mod(100);
  const rv2 = artwork.random_value.div(100).mod(100);
  const rv3 = artwork.random_value.div(10000).mod(100);
  let colorCounter = 0;
  let colorPalette = rv2.toNumber() % colordict.length;
  let colorPaletteLimit = colordict[colorPalette].length;
  let framerate = 25;//rv1.toNumber() % 50;


  let rStep = rv1.toNumber();
  let rMax = 250;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.noStroke();
    p5.frameRate(framerate);
  }


  const draw = (p5) => {
    p5.background(0);
    p5.textSize(32);
    p5.fill(244);
    p5.text("fps " + framerate, 10, 55);
    p5.text("rstep: " + rStep, 10, 24);
    p5.text("color: " + colorPalette, 10, 95);
    p5.translate(p5.width / 2, p5.height / 2);


    for (let r = 0; r < rMax; r += rStep) {
      let c = 2 * p5.PI * r;
      let cSegment = p5.map(r, 0, rMax, rStep * 3 / 4, rStep / 2);
      let aSegment = p5.floor(c / cSegment);
      let ellipseSize = p5.map(r, 0, rMax, rStep * 3 / 4 - 1, rStep / 4);

      for (let a = 0; a < 360; a += 360 / aSegment) {

        colorCounter = colorCounter % colorPaletteLimit;
        p5.fill(colordict[colorPalette][colorCounter]);

        p5.push();
        p5.rotate(p5.radians(a));
        p5.ellipse(r, 0, ellipseSize, ellipseSize);
        p5.pop();
        colorCounter++;
      }
    }
  };

  return (
    <Sketch setup={setup} draw={draw} />
  );
}

export default Artworksketch;

