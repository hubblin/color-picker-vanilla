let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

let hoveredColor = document.querySelector('.hovered-color')
let selectedColor = document.querySelector('.selected-color')

document.onpaste = function(e){
    let items = e.clipboardData.items;
    for(index in items){
        let item = items[index];
        if(item.kind === 'file'){
            let blob = item.getAsFile();
            let reader = new FileReader();
            reader.onload = function(event){
                console.log(event.target.result);
            }
            reader.readAsDataURL(blob);
            
            let urlCreator = window.URL || window.webkitURL;

            let imageUrl = urlCreator.createObjectURL(blob);

            
            

            addToCanvas(ctx, imageUrl);
        }

    }
}


function addToCanvas(ctx, image){
    let img = new Image();
    img.src = image;
    
    img.onload = function(){
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img,0,0, img.naturalWidth, img.naturalHeight);
    }

}

function pick(event, destination){
    let x = event.layerX;
    let y = event.layerY;
    let pixel = ctx.getImageData(x,y, 1,1);

    let data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    destination.style.background = rgba;
    destination.textContent = rgba;

    return rgba;
}

canvas.addEventListener('mousemove', function(event){
    pick(event, hoveredColor)
})

canvas.addEventListener('click', function(event){
    pick(event, selectedColor)
})