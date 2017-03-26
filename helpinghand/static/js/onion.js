var canvas = document.getElementById('myCanvas');
canvas.addEventListener('mousedown', mouseDown)
canvas.addEventListener('mouseup', mouseUp)
canvas.addEventListener('mousemove', myMouse)
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// Radius settings
var radius_increment = 50;
var radius_1 = 50 + (0 * radius_increment);
var radius_2 = 50 + (1 * radius_increment);
var radius_3 = 50 + (2 * radius_increment);
var radius_4 = 50 + (3 * radius_increment);
var radi = [radius_1, radius_2, radius_3, radius_4]

// Visual settings
var sticky_level = 1
var memory_sticky_level = sticky_level
var photo_path = "./faces/"

// Line color
stroke_style = '#000000'
stroke_width = 10

// Fill color
fill_color = '#00c0ff'
memory_fill_color = fill_color

// Title
context.font = "20px Helvetica";
context.fillStyle = 'black';
context.textAlign = "center"
context.fillText("What circles are you comfortable sharing this task with?", centerX, 40);
context.fillStyle = 'white';

// Faces
var patient_img_size = 63
var highlighted_img_size = 63
var highlighted_img = false;
var img_size = 35

patient = new Image()
patient.src = photo_path + "patient.png"

man1 = new Image()
man1.src = photo_path + "man1.png"

man2 = new Image()
man2.src = photo_path + "man2.png"

man3 = new Image()
man3.src = photo_path + "man3.png"

old_man1 = new Image()
old_man1.src = photo_path + "old_man1.png"

woman4 = new Image()
woman4.src = photo_path + "woman4.png"

woman1 = new Image()
woman1.src = photo_path + "woman1.png"

woman2 = new Image()
woman2.src = photo_path + "woman2.png"

woman3 = new Image()
woman3.src = photo_path + "woman3.png"

var images_level_2 = [man1, man3, woman4]
var images_level_3 = [man2, woman2]
var images_level_4 = [woman1, woman3, old_man1]

var image_wrapper_list = [images_level_2, images_level_3, images_level_4]
var positions_dictionary = getPosDict(image_wrapper_list)

function draw(fill){
    
    // Redraw blank canvas
    context.fillStyle = 'white';
    context.fill()

    // Draw circle 4
    context.beginPath();
    context.arc(centerX, centerY, radius_4, 0, 2 * Math.PI, false);
    context.lineWidth = stroke_width;
    context.strokeStyle = stroke_style;
    context.stroke();
    if (fill == 4 || sticky_level == 4) {
        context.fillStyle = fill_color;
        context.fill();
    } else{
        context.fill();
    }

    // Draw circle 3
    context.beginPath();
    context.arc(centerX, centerY, radius_3, 0, 2 * Math.PI, false);
    context.lineWidth = stroke_width;
    context.strokeStyle = stroke_style;
    context.stroke();
    
    if (fill == 3 || sticky_level == 3) {
        context.fillStyle = fill_color;
        context.fill();
    } else{
        context.fill();
    }

    // Draw circle 2
    context.beginPath();
    context.arc(centerX, centerY, radius_2, 0, 2 * Math.PI, false);
    context.lineWidth = stroke_width;
    context.strokeStyle = stroke_style;
    context.stroke();
    if (fill == 2 || sticky_level == 2) {
        context.fillStyle = fill_color;
        context.fill();
    }  else {
        context.fill();
    }

    // Draw circle 1
    context.beginPath();
    context.arc(centerX, centerY, radius_1, 0, 2 * Math.PI, false);
    context.lineWidth = stroke_width;
    context.strokeStyle = stroke_style;
    context.stroke();
    context.fillStyle = fill_color;
    context.fill();

    context.drawImage(patient,centerX-(patient_img_size/2),centerY-(patient_img_size/2));
    for (var i = 0; i < image_wrapper_list.length; i++){
        drawFaces(context, image_wrapper_list[i], i+1)    
    }
}

function drawFaces(context, images, level){
    num_images = images.length
    
    for(var i = 0; i < num_images; i++){
        image = images[i]
        image_pos = position_dictionary[image.src][0]

        if(highlighted_img != false){
            if(highlighted_img.src != image.src){
                context.drawImage(image,image_pos[0],image_pos[1]);
            } else{
                context.drawImage(image,image_pos[0],image_pos[1]);
                context.beginPath();
                context.arc(image_pos[0]+(img_size/2), (image_pos[1]+(img_size/2)), 17, 0, 2 * Math.PI, false);
                context.lineWidth = 6;
                context.strokeStyle = "#00c0ff";
                context.stroke();
            }
        } else {
            context.drawImage(image,image_pos[0],image_pos[1]);
        }
    }
}

function getPosDict(list_of_images){
    // Stores the positions in an array of length two under keys of image.src strings (should be unique any way)
    position_dictionary = {};
    for (var i = 0; i < list_of_images.length; i++){
        var images = list_of_images[i]
        var positions = getPositions(images.length, radi[i+1]-(radius_increment/2))

        for (var k = 0; k < images.length; k++){
            position_dictionary[images[k].src] = [positions[k], i+2];
        }
    }
    return (position_dictionary)
}

function getPositions(numberOfItems, radius) {
    
    step = (2*Math.PI) / numberOfItems
    angle = 0
    var positions = [];
    for(var i = 0; i < +numberOfItems; i++) {

        var x = Math.round(radius * Math.cos(angle - (Math.PI/2))) + centerX-(img_size/2);
        var y = Math.round(radius * Math.sin(angle - (Math.PI/2))) + centerY-(img_size/2);
        var temp_list = [x, y]

        angle += step;

        positions.push(temp_list)
    }
    return(positions)
}

function getMousePos(event){
    return [event.clientX, event.clientY]
}

function getCircle(x, y){
    var s1 = centerX-x
    var s2 = centerY-y
    var distance = Math.sqrt(Math.pow(s1, 2) + Math.pow(s2, 2))

    var fill;
    if (distance > radius_4){
        fill = 0
    } else if (distance > radius_3) {
        fill = 4
    } else if(distance > radius_2){
        fill = 3
    } else if(distance > radius_1){
        fill = 2
    } else if(distance < radius_1){
        fill = 1
    }

    return fill
}

function myMouse(event) {
    var mousePos = getMousePos(event)
    var mouse_x = mousePos[0]
    var mouse_y = mousePos[1]
    draw(getCircle(mouse_x, mouse_y))
}

var holdStart;
function mouseDown(event){
    holdStart = Date.now()
}

function mouseUp(event){
    var holdDur = Date.now() - holdStart

    if(holdDur < 750){

        var mousePos = getMousePos(event)
        var mouse_x = mousePos[0]
        var mouse_y = mousePos[1]

        var faceClicked = isFace(mouse_x, mouse_y)

        if(faceClicked == false){
            var circle = getCircle(mouse_x, mouse_y)
            sticky_level = circle
            
            if (highlighted_img != false && circle != 1){
                // Move the image to the selected circle, unless center was clicked
                prevCircle = positions_dictionary[highlighted_img.src][1]

                // Remove from list
                var index = image_wrapper_list[prevCircle-2].indexOf(highlighted_img)
                if (index > -1) {
                   image_wrapper_list[prevCircle-2].splice(index, 1);
                }

                // Add it to the new list
                image_wrapper_list[circle-2].push(highlighted_img)

                // Do clean up and image positioning
                highlighted_img = false
                image_wrapper_list = [images_level_2, images_level_3, images_level_4]
                positions_dictionary = getPosDict(image_wrapper_list)
                sticky_level = memory_sticky_level
                fill_color = memory_fill_color
            }

            if (sticky_level < 1){
                sticky_level = 1                
        }
            draw(circle) 
        }
        else{
            highlighted_img = faceClicked
            memory_sticky_level = sticky_level
            sticky_level = 1

            memory_fill_color = fill_color
            fill_color = "#fffff"
        }
    }
}

function isFace(x, y){      
    var faceClicked = false  
    for(var i = 0; i < image_wrapper_list.length; i++){
        images = image_wrapper_list[i]
        for(var k = 0; k < images.length; k++){
            var position = positions_dictionary[images[k].src][0]
            var face_x = position[0]
            var face_y = position[1]

            if(face_x < x && x < face_x+img_size && face_y < y && y < face_y+img_size){
                faceClicked = images[k]
                break
            }
        }
    }
    return(faceClicked)
}

draw(0)
