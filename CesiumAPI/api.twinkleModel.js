define(function(){

  function twinkleModel(cesiumWidget, options){
    var scene = cesiumWidget.scene;

    var ellipsoid = cesiumWidget.centralBody.ellipsoid;
    
    var id = options.id;
    if(id) {
      require(['CesiumAPI/api.idManager.js'], function() {
        var ary = window.idManager.getByID(id);
        console.log(ary[0]);
        if(ary.length > 0) {
          var obj = ary[0];
          var timeId = setInterval(function() {
            console.log(obj.show);
            console.log(typeof(options.twinkle));
             if(options.twinkle=="true") {
               
              if(obj.show==true)

                obj.show=false;
              else if(obj.show==false)
                obj.show=true;
             }
             else if(options.twinkle=="false"){
                clearInterval(timeId);
              }
             },500);
           }
            


      });
    }
   
  } 
   return twinkleModel;
});