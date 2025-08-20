
// DrawRectangle.js

function main() {

    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');

    if (!canvas) {

        console.log('Failed to retrieve the <canvas> element');
        return;

    }
    
    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');

    // canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //v1 
    var v1 = new Vector3([2.25, 2.25, 0]); 

    //draw vector button
    document.getElementById('drawButton').addEventListener('click', function(){

        handleDrawEvent(ctx);

    });

    //op button
    document.getElementById('opButton').addEventListener('click', function(){

        handleDrawOperationEvent(ctx);

    });

}

function handleDrawOperationEvent(ctx){

    //reset canvas
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);

    //read input 
    var x1 = parseFloat(document.getElementById('x1').value);
    var y1 = parseFloat(document.getElementById('y1').value);

    var x2 = parseFloat(document.getElementById('x2').value);
    var y2 = parseFloat(document.getElementById('y2').value);
    
    //create vectors
    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);
 
    //draw v1
    drawVector(ctx, v1, "red");

    //draw v2
    drawVector(ctx, v2, "blue");

    //get op and scalar
    var op = document.getElementById('selector').value;

    var scalar = document.getElementById('scalar').value;

    console.log(scalar)
    //add
    if(op === 'add'){

        var v3 = new Vector3(v1.elements).add(v2);
        drawVector(ctx, v3, "green");
    
    //sub
    }else if(op === 'sub'){

        var v3 = new Vector3(v1.elements).sub(v2);
        drawVector(ctx, v3, "green");

    //mult
    }else if(op === 'mul'){

        var v3 = new Vector3(v1.elements).mul(scalar);
        var v4 = new Vector3(v2.elements).mul(scalar);
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");

    //div
    }else if(op === 'div'){

        var v3 = new Vector3(v1.elements).div(scalar);
        var v4 = new Vector3(v2.elements).div(scalar);
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");

    }else if(op === 'mag'){

        v1.magnitude();
        v2.magnitude();


    }else if(op === 'norm'){

        var v3 = new Vector3(v1.elements).normalize();
        var v4 = new Vector3(v2.elements).normalize();
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");

    }else if(op === 'angle'){

        let dot = Vector3.dot(v1, v2);
        let mag1 = v1.magnitude();
        let mag2 = v2.magnitude();
        let angle = Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI);

        console.log("Angle between v1 and v2:", angle, "degrees");

    }else if(op === 'area'){

        let cross = Vector3.cross(v1, v2);
        let area = cross.magnitude() / 2;
        console.log("Area of the triangle formed by v1 and v2:", area);

    }
    




}

function handleDrawEvent(ctx){

    //reset canvas
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);
 
    //read input 
    var x1 = parseFloat(document.getElementById('x1').value);
    var y1 = parseFloat(document.getElementById('y1').value);

    var x2 = parseFloat(document.getElementById('x2').value);
    var y2 = parseFloat(document.getElementById('y2').value);
    
    //create vectors
    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);
 
    //draw v1
    drawVector(ctx, v1, "red");

    //draw v2
    drawVector(ctx, v2, "blue");

}


//draw vector (canvas, vector, color)
function drawVector(ctx, v, color){

    //scale by 20 due to canvas being 400x400
    var scale = 20;

    //x and y for vector
    var x = v.elements[0] * scale; 
    var y = v.elements[1] * scale; 

    //vector color
    ctx.strokeStyle = color;

    //draw
    ctx.beginPath();

    //start at center of canvas
    ctx.moveTo(200, 200); 

    //go to enpoint
    ctx.lineTo(200 + x, 200 - y); 

    //draw
    ctx.stroke(); 

}