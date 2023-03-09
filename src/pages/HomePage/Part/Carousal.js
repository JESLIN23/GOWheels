import React from 'react';

import Carousel from 'react-material-ui-carousel';

import Item from '../Part/imgItems';
import car1 from '../IMG/Honda_Civic_White_background_Sedan_Grey_526338_1280x765.jpg';
import car2 from '../IMG/Hyundai_Tucson_White_background_Light_Blue_515412_3840x2160.jpg';
import car3 from '../IMG/t6e05sa_1478705.webp';

function Carousal() {
  var items = [
    {
      id: 1,
      img: car1,
      title: 'Hyundai Exend',
    },
    {
      id: 2,
      img: car2,
      title: 'Tata nexon',
    },
    {
      id: 3,
      img: car3,
      title: 'Homda City',
    },
  ];
  return (
    <Carousel
      indicatorIconButtonProps={{
        style: {
          padding: '5px',
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: '#43D7C8', // 2
        },
      }}
    >
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Carousel>
  );
}

export default Carousal;
