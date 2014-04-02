define(function(){
    function loadModel(cesiumViewer, options){
        var id = options.id;
   	var Cartographic = Cesium.Cartographic;
    var scene = cesiumViewer.scene;
    var primitives = scene.primitives;
    var ellipsoid = scene.primitives.centralBody.ellipsoid;
    var CartoFromDegrees = Cartographic.fromDegrees(options.position.longitude, options.position.latitude, options.position.height || 0);
    var modelpose = ellipsoid.cartographicToCartesian(CartoFromDegrees);
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(modelpose);
      //  primitives.removeAll(); // Remove previous model
    var creatMode = Cesium.Model;
    var model = primitives.add(
        creatMode.fromGltf({
            url : options.url,
            modelMatrix : modelMatrix
            })
    	);
        
            model.readyToRender.addEventListener(function(model) {
            model.activeAnimations.addAll({
                speedup : 0.5,
                loop : Cesium.ModelAnimationLoop.REPEAT
               });
    
            // Zoom to model
            var worldBoundingSphere = model.computeWorldBoundingSphere();
           // var center = worldBoundingSphere.center;
           // var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
            var r = 10 * worldBoundingSphere.radius;
            var destination = Cesium.Cartographic.fromDegrees(options.position.longitude, options.position.latitude, options.position.height+r);

            var flight = Cesium.CameraFlightPath.createAnimationCartographic(scene, {
            destination : destination
              });
            scene.animations.add(flight);
            });

           require(['CesiumAPI/api.idManager.js'], function(){
      var id = options.id || window.idManager.nextID();
      window.idManager.addObject(id, model, scene.primitives);
    });
            };

    


   return loadModel;
});