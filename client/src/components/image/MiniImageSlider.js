import React from "react";
import ImageSlider from './ImageSlider';


export default class MiniImageSlider extends React.Component {
    render() {
        return (
            <ImageSlider width="100%" images={this.props.images}></ImageSlider>
        );
    }
}