import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class ImageSlider extends React.Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      lazyLoad: true
    };

    return (
      <div style={{ width: this.props.width, display: "inline-block" }}>
        <Slider {...settings} className="ui">
          {
            this.props.images ?
              this.props.images
                .map(image => {
                  return (
                    <div key={image.path + image.fileName}>
                      <img width={this.props.width} src={
                        /*'https://s3.amazonaws.com/FMRealty/property/triangle/24/2305024_1.jpg'*/
                        '/assets/cdn' + image.path + '/' + image.fileName
                      } alt={image.fileName}></img>
                    </div>
                  )
                })
              : null
          }
        </Slider>
      </div>
    );
  }
}