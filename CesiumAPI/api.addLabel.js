define(['./api.utils.js'],function(utils){
  function addLabel(cesiumWidget, options){
    var scene = cesiumWidget.scene;
    var primitives = scene.primitives;
    var ellipsoid = cesiumWidget.centralBody.ellipsoid;
    var labels = new Cesium.LabelCollection();
    var fontObj = options.font || {};
    var fontStr = (fontObj.height || 12) + 'px ' + (fontObj.name || 'Helvetica');
   if(typeof options.position.longitude == 'string'){
      options.position.longitude = utils.ConvertDMStoDD(options.position.longitude);
      options.position.latitude = utils.ConvertDMStoDD(options.position.latitude);
    }
    labels.add({
      position: ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(options.position.longitude, options.position.latitude, options.position.height || 0)),
      text: options.text,
      font: fontStr,
      fillColor : Cesium.Color.fromCssColorString(options.fillColor),
      outlineColor : Cesium.Color.fromCssColorString(options.outlineColor),
      outlineWidth : options.outlineWidth,
      style : Cesium.LabelStyle.FILL_AND_OUTLINE,
      scale: options.scale
    });

    primitives.add(labels);

    require(['CesiumAPI/api.idManager.js'], function(){
      var id = options.id || window.idManager.nextID();
      window.idManager.addObject(id, labels, scene.primitives);
    });
  }

  return addLabel;
});
