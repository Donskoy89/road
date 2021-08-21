//class Road
//{
//    constructor(image, y)
//    {
//        this.x = 0;
//        this.y = y;
// 
//        this.image = new Image();
//        
//        this.image.src = image;
//    }
// 
//    Update(road) 
//    {
//        this.y += 5; //При обновлении изображение смещается вниз
// 
//        if(this.y > window.innerHeight) //Если изображение ушло за край холста, то меняем положение
//        {
//            this.y = road.y - this.image.height + speed; //Новое положение указывается с учётом второго фона
//        }
//    }
//}
//
//let mass = [
//    new Road("car.png", 0),
//    new Road("car-1.png", 600)
//]; //Массив с фонами


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Загрузка изображений
let carImg = new Image();
carImg.src = 'car-1.png';

let treeImg = new Image();
treeImg.src = 'tree.png';

let road1 = new Image();
road1.src = 'road.png';
let road2 = new Image();
road2.src = 'road.png';

let roadOne = {
    x: 0,
    y: -800,
    dy: 5
};
let roadTwo = {
    x: 0,
    y: 0,
    dy: 5
};

let car = {
    x: 236,
    y: canvas.height - 128,
    dx: 5
};

let tree = [];
let carOther = [];

let timer = 0;

road2.onload = ()=> {
    draw();
    function draw() {
        update();
        render();
        let requestId = requestAnimationFrame(draw);
    }
}
let dir = '';
window.addEventListener('keydown', function(Event) {
    if(Event.keyCode == 37) {
        dir = 'l';
    } else if(Event.keyCode == 39) {
        dir =  'r';
    }
});
window.addEventListener('keyup', function(Event) {
    dir = '';
});

function update() {
    timer++;
    
    roadOne.y += roadOne.dy;
    roadTwo.y += roadTwo.dy;
    
    if(roadOne.y >= 0 && roadTwo.y >= 800) {
        roadOne.y = -800;
        roadTwo.y = 0
    }
    
    if(dir == 'l') {
        car.x -= car.dx;
    } else if(dir == 'r') {
        car.x += car.dx;
    }
    
    if(car.x < 0) {
        car.x = 0;
    }
    if(car.x > 540) {
        car.x = 540;
    }
    
    if(timer%30 == 0) {
        tree.push({
            x: Math.random()*552,
            y: -48,
            dy: 5
        });
    }
    for(let i=0; i<tree.length; i++) {
        tree[i].y += tree[i].dy;
        
        if(tree[i].y >= 800) {
            tree.splice(i,1);
        }
    }
    
    if(timer%100 == 0) {
        carOther.push({
            x: Math.random()*540,
            y: -120,
            dy: 2
        });
    }
    for(let i=0; i<carOther.length; i++) {
        carOther[i].y += carOther[i].dy;
        
        if(carOther[i].y >= 800) {
            carOther.splice(i,1);
        }
    }
}

function render() {
    ctx.drawImage(road1, roadOne.x, roadOne.y, 600, 800);
    ctx.drawImage(road2, roadTwo.x, roadTwo.y, 600, 800);
    for(let i=0; i<tree.length; i++) {
        ctx.drawImage(treeImg, tree[i].x, tree[i].y, 48, 48);
    }
    for(let i=0; i<carOther.length; i++) {
        ctx.drawImage(carImg, 150, 0, 212, 512, carOther[i].x, carOther[i].y, 60, 120);
    }
//    ctx.drawImage(carImg, 150, 0, 212, 512, car.x, car.y, 60, 120);
    if(dir == 'l') {
        ctx.save();
        ctx.translate(car.x+30, car.y+60);
        ctx.rotate(-3 * Math.PI/180);
        ctx.drawImage(carImg, 150, 0, 212, 512, -30, -60, 60, 120);
        ctx.restore();
    } else if(dir == 'r') {
        ctx.save();
        ctx.translate(car.x+30, car.y+60);
        ctx.rotate(3 * Math.PI/180);
        ctx.drawImage(carImg, 150, 0, 212, 512, -30, -60, 60, 120);
        ctx.restore();
    } else {
        ctx.drawImage(carImg, 150, 0, 212, 512, car.x, car.y, 60, 120);
    }
}


//function Update() //Обновление игры
//{
//    roads[0].Update(roads[1]);
//    roads[1].Update(roads[0]);
// 
//    Draw();
//}







