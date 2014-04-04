define(['./api.utils.js'],function(utils){
  function createPolyline(cesiumWidget, options){
    
    var Cartographic = Cesium.Cartographic;
    var Primitive = Cesium.Primitive;
    var GeometryInstance = Cesium.GeometryInstance;
    var PolylineGeometry = Cesium.PolylineGeometry;
    var PolylineMaterialAppearance = Cesium.PolylineMaterialAppearance;
    var Material = Cesium.Material;
  
    
    var scene = cesiumWidget.scene;
    var centralBody = cesiumWidget.centralBody;

    var primitives = scene.primitives;
    var ellipsoid = centralBody.ellipsoid;

    var poses = [];
    for(var i = 0; i < options.positions.length; i ++){

      if(typeof options.positions[i].latitude == 'string'){
      options.positions[i].longitude = utils.ConvertDMStoDD(options.positions[i].longitude);
      options.positions[i].latitude = utils.ConvertDMStoDD( options.positions[i].latitude);
      }
      poses.push(
        ellipsoid.cartographicToCartesian(
          Cartographic.fromDegrees(options.positions[i].longitude, options.positions[i].latitude, options.positions[i].height || 0)
          )
        );
    }
    //added by ciyi 20140401 start
    //设置线宽
    //var w = options.width
    
    var w = options.width ? options.width : 1.0;
    //added by ciyi 20140401 end
    var material = null;
    if(options.arrow === 'head'){
      material = Cesium.Material.fromType(Cesium.Material.PolylineArrowType, {
        color: Cesium.Color.fromCssColorString(options.color)
      });
    } else if(options.arrow === 'tail'){
      material = Cesium.Material.fromType(Cesium.Material.PolylineArrowType, {
        color: Cesium.Color.fromCssColorString(options.color)
      });
      poses.reverse();
    } else {
      material = Cesium.Material.fromType(Cesium.Material.PolylineOutlineType, {
        width: w,
        outlineWidth: 1.0,
        color: Cesium.Color.fromCssColorString(options.color),
        outlineColor: Cesium.Color.fromCssColorString(options.outlineColor)
      });
    }

    var localPolylines = new Cesium.PolylineCollection();

    var localPolyline = localPolylines.add({
      positions : poses,
      width : w,
      material : material
    });
    primitives.add(localPolylines);

    require(['/CesiumAPI/api.idManager.js'], function(){
      var id = options.id || window.idManager.nextID();
      window.idManager.addObject(id, localPolylines, scene.primitives);
    });
  }

  return createPolyline;
});