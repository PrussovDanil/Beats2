/////////////////////////////////////////////////////////////////////////
///                        MAPS.JS                                      /
/////////////////////////////////////////////////////////////////////////



let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
// Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.731475, 37.608342],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 14,
            controls: []
    });

    const places = [
        [55.723498, 37.610035], 
        [55.736809, 37.618472], 
        [55.731326, 37.636255]
    ]; 

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./../icon/marker.png",
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
    });
    places.forEach(places => {
        myCollection.add(new ymaps.Placemark(places));
    });

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
    myMap.behaviors.disable('multiTouch');
};

ymaps.ready(init);