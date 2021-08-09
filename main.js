
// 캔버스 조작
let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');
let info = document.querySelector('.cnavas_info');

let hoveredColor = document.querySelector('.hovered-color');
let selectedContainer = document.querySelector('.selected_container');

//캔버스 영역 조작
let container = document.querySelector('.canvas_area');

let pos = {top: 0, left: 0, x: 0, y: 0};
let isDown = false;

//버튼 액션
let pasteBtn = document.getElementById('paste-btn');

//각각 요소들의 구분을 위한 변수
let cnt = 1;

//drag to scroll 기능
const mouseDownHandler = function(e){
    isDown = true;
    pos = {
        left: container.scrollLeft,
        top: container.scrollTop,
        x: e.clientX,
        y : e.clientY
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}
container.addEventListener('mousedown', mouseDownHandler);

const mouseMoveHandler = function(e){
    if(isDown){
        const  dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        container.scrollTop = pos.top - dy;
        container.scrollLeft = pos.left - dx;
    }
}

const mouseUpHandler = function(e){
    isDown = false;
}



//캔버스에 사진 추가
function addCanvasAction(e){
    
    let items = e.clipboardData.items;
    console.log(items)
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

document.onpaste = addCanvasAction;


//버튼 클릭으로 붙여넣기
pasteBtn.onclick = async function(){

    let blob;

    try{
        const clipboardItems = await navigator.clipboard.read();

        for(const clipboardItem of clipboardItems){
            for(const type of clipboardItem.types){
                blob = await clipboardItem.getType(type);
                if(type.startsWith('image')){
                    let urlCreator = window.URL || window.webkitURL;
                    let imageUrl = urlCreator.createObjectURL(blob);
                    addToCanvas(ctx, imageUrl);
                }
            }
        }
    }catch(error){
        console.log('paste error', error);
    }
}




function addToCanvas(ctx, image){
    info.innerText = '';
    let img = new Image();
    img.src = image;
    
    img.onload = function(){
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img,0,0, img.naturalWidth, img.naturalHeight);
    }

}


function rgbaToHex(data){
    let r = data[0].toString(16);
    let g = data[1].toString(16);
    let b = data[2].toString(16);

    if(r.length === 1) r = "0" + r;
    if(g.length === 1) g = "0" + g;
    if(b.length === 1) b = "0" + b;


    console.log(r, g, b)
    return '#' + r+g+b;
}

function pick(event, destination){
    let x = event.layerX;
    let y = event.layerY;
    let pixel = ctx.getImageData(x,y, 1,1);

    let data = pixel.data;

    let hexCode = rgbaToHex(data);

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    destination.style.background = rgba;
    destination.innerHTML = rgba + '<br/>' +  hexCode;

    return rgba;
}


function addpick(event){
    let x = event.layerX;
    let y = event.layerY;
    let pixel = ctx.getImageData(x,y,1,1);

    let data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

    let hexCode = rgbaToHex(data);

    let div = document.createElement('div');
    div.style.background = rgba;
    div.innerHTML = rgba + '<br/>' +  hexCode;
    div.className = 'selected-color';
    div.setAttribute('id', 'pick'+cnt);
    div.setAttribute('onclick', 'thisPick(' + cnt+ ")");
    div.setAttribute('ondblclick', 'thisDbPick(' + cnt + ')');

    selectedContainer.insertBefore(div, selectedContainer.firstChild);
    cnt++;
}

canvas.addEventListener('mousemove', function(event){
    pick(event, hoveredColor)
})

canvas.addEventListener('click', function(event){
    addpick(event);
})

let clickState = null;
let clickCount = 0;

function thisDbPick(cnt){
    ClearClickState();
    let getlist = document.getElementById('pick' + cnt);
    selectedContainer.removeChild(getlist);
}

function thisPick(cnt){
    if(clickState == null || clickCount < 2){
        clickState = setTimeout("thisPick("+cnt+")", 200);
        clickCount++;
    }else{
        ClearClickState();
        let getlist = document.getElementById('pick' + cnt);
        if(getlist !== null){
            console.log(getlist.innerHTML.substr(-7, 8));
            navigator.clipboard.writeText(getlist.innerHTML.substr(-7, 8));
        }
    }
}

function ClearClickState(){
    clearTimeout(clickState);
    clickState = null;
    clickCount = 0;
}