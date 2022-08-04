// Images
let deathSound = new Audio('../sounds/death.mp3')
deathSound.volume = 0.05

let ktman = new Image()
ktman.src = './img/ktman.png'
ktman.style.scale = 3

let enemyDeath =  new Audio('../sounds/enemyDeath.mp3')
enemyDeath.volume = .08

let platformImg = new Image()
platformImg.src = './img/platform.png'

let platformSmallImg = new Image()
platformSmallImg.src = './img/platformSmallTall.png'

let hills = new Image()
hills.src = './img/hills.png'

let background = new Image()
background.src = './img/background.png'

let bulletSprite = new Image()
bulletSprite.src = './img/disk.svg'
// bulletSprite.style.height = 24
// bulletSprite.style.width = 


// --------------------------------------------------


const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.8

class Player {
    constructor() {
        this.speed = 5
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 40
        this.height = 60
        this.velocity = {
            x: 0,
            y: 0
        }
        this.directionRight = true;
        this.isGround = true;
        this.image = ktman

    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(ktman, this.position.x, this.position.y);
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

class Bullet {
    constructor({ a, b }) {
        this.position = {
            x: player.position.x + (player.width / 2) - (this.width / 2),
            y: player.position.y + (player.height / 2) - (this.height / 2)
        }
        this.target = {
            a,
            b
        }
        this.width = 24
        this.height = 24
        this.velocity = {
            x: 0,
            y: 0
        }
        this.isReturn = false
        this.readyToFeturn = false
        
        this.image = bulletSprite
    }
    draw() {
        
         c.fillStyle = 'yellow'
        
         c.fillRect(this.position.x, this.position.y, this.width, this.height)
         c.drawImage(this.image, this.position.x, this.position.y)
    }

    intarget() {
        // console.log(this)
        this.draw()
        let targetPosX = this.target.a;
        let targetPosY = this.target.b;

        let diskPosX = this.position.x + (this.width / 2);
        let diskPosY = this.position.y + (this.height / 2);

        //coordination
        if (targetPosX < diskPosX) {

        }
        //------------
        if (targetPosX < diskPosX) {
            if (this.velocity.x > -4) this.velocity.x += -0.1;
            else if (this.velocity.x != 0) this.velocity.x -= -0.1;
        }
        else if (targetPosX > diskPosX) {
            if (this.velocity.x < 4) this.velocity.x += 0.1;
            else if (this.velocity.x != 0) this.velocity.x -= 0.1;
        }

        if (targetPosY < diskPosY) {
            if (this.velocity.y > -4) this.velocity.y += -0.1;
            else if (this.velocity.y != 0) this.velocity.y -= -0.1;
        }
        else if (targetPosY > diskPosY) {
            if (this.velocity.y < 4) this.velocity.y += 0.1;
            else if (this.velocity.y != 0) this.velocity.y -= 0.1;
        }

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;


        if (!this.readyToFeturn) {
            setTimeout(()=>{
            this.isReturn = true;
            this.velocity.y = 0;
            this.velocity.x = 0;
            },2000)
            this.readyToFeturn = true;
        }
    }
    return() {
        this.draw()
        let playerPosX = player.position.x + (player.width / 2);
        let playerPosY = player.position.y + (player.height / 2);

        let diskPosX = this.position.x + (this.width / 2);
        let diskPosY = this.position.y + (this.height / 2);

        if (playerPosX < diskPosX) {
            if (this.velocity.x > -4) this.velocity.x += -0.1;
            else if (this.velocity.x != 0) this.velocity.x -= -0.1;
        }
        else if (playerPosX > diskPosX) {
            if (this.velocity.x < 4) this.velocity.x += 0.1;
            else if (this.velocity.x != 0) this.velocity.x -= 0.1;
        }

        if (playerPosY < diskPosY) {
            if (this.velocity.y > -4) this.velocity.y += -0.1;
            else if (this.velocity.y != 0) this.velocity.y -= -0.1;
        }
        else if (playerPosY > diskPosY) {
            if (this.velocity.y < 4) this.velocity.y += 0.1;
            else if (this.velocity.y != 0) this.velocity.y -= 0.1;
        }

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.readyToFeturn) {
            setTimeout(()=>{
            if (bullets.indexOf(this) !== -1) {
                bullets.splice(bullets.indexOf(this), 1);
            }  
            },2000)
            this.readyToFeturn = false; //Скористання тимчасовою змінною
        }
    }
}

class Enemy {
    constructor() {
        this.position = {
            x: 700,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 40
    }
    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y,
            this.width, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}


class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)

    }
}


class GenericObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}




// Змінні ------------------------------------------------------------------------------


let player = new Player()

let enemy = new Enemy()

let platforms = []

let genericObject = []

let bullets = []

canvas.addEventListener('click', (event) => {
    let bullet = new Bullet({ a: event.offsetX, b: event.offsetY })
    bullet.position.x = player.position.x + (player.width / 2) - (bullet.width / 2);
    bullet.position.y = player.position.y + (player.height / 2) - (bullet.height / 2)
    bullets.push(bullet)
})






// Init Function ------------------------------------------------------------------------------

function init() {

    player = new Player()

    enemy = new Enemy()

    platforms = [
        new Platform({
            x: platformImg.width * 4 + 300 - 3 + platformImg.width - platformSmallImg.width,
            y: 350,
            image: platformSmallImg,

        }),
        new Platform({
            x: platformImg.width - 6 - platformSmallImg.width + 100,
            y: 245,
            image: platformSmallImg,
        }),
        new Platform({
            x: platformImg.width - 3 - platformSmallImg.width,
            y: 360,
            image: platformSmallImg,
        }),
        new Platform({
            x: -1,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width - 4 + platformSmallImg.width,
            y: 360,
            image: platformSmallImg,
        }),
        new Platform({
            x: platformImg.width - 3,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 2 + 100,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 3 + 300,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 4 + 300 - 3,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 5 + 550 - 3,
            y: 470,
            image: platformImg,
        }),
    ]

    genericObject = [
        new GenericObject({
            x: -1,
            y: -1,
            image: background
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image: hills
        })
    ]


    scrollOffset = 0

}


// Keys Array --------------------------------------------------------------------------------

const keys = {
    space: {
        pressed: false
    },
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    down: {
        pressed: false,
        isDownAlready: false
    }
}



let scrollOffset = 0


// Animate ---------------------------------------------------------------------------------------

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObject.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })

    player.update()
    enemy.update()

    bullets.forEach(bullet => {
        if(bullet.isReturn == false)
        {
            bullet.intarget()    
        }
        else{
            bullet.return();   
        }
        
    })


    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if (
        (keys.left.pressed && player.position.x > 200) ||
        (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
    ) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0
        

        if (keys.right.pressed) {
            scrollOffset += player.speed

            enemy.position.x -= player.speed

            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })

            bullets.forEach(bullet => {
                bullet.position.x -= player.speed
                bullet.target.a -= player.speed
            })

            genericObject.forEach(genericObject => {
                genericObject.position.x -= player.speed * 0.5
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed

            enemy.position.x += player.speed

            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            
            bullets.forEach(bullet => {
                bullet.position.x += player.speed
                bullet.target.a += player.speed
            })

            genericObject.forEach(genericObject => {
                genericObject.position.x += player.speed * 0.5
            })
        }
        
    }



    // Platform collision -----------------------------------------------------------------

    platforms.forEach(platform => {
        //Player on platform ---------------------------------------------------------
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height
            + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
            player.isGround = true
        }
       //Enemy on platform ------------------------------------------------------------
        if (enemy.position.y + enemy.height <= platform.position.y && enemy.position.y + enemy.height
            + enemy.velocity.y >= platform.position.y && enemy.position.x + enemy.width >= platform.position.x
            && enemy.position.x <= platform.position.x + platform.width) {
            enemy.velocity.y = 0;
        }
    })

    platforms.forEach(platform => {
        // ---- Майбутній зпуск з платформи
    })




    // enemy collision
    if (player.position.y + enemy.height <= enemy.position.y && player.position.y + player.height
        + player.velocity.y >= enemy.position.y && player.position.x + player.width >= enemy.position.x
        && player.position.x <= enemy.position.x + enemy.width) {
        player.velocity.y -= 20;
        enemyDeath.play()
        enemy.velocity += 10
    }

    bullets.forEach(bullet =>{
        

     if (bullet.position.x < enemy.position.x + enemy.width &&
        bullet.position.x + bullet.width > enemy.position.x &&
        bullet.position.y < enemy.position.y + enemy.height &&
        bullet.height + bullet.position.y > enemy.position.y){
            enemyDeath.play()
            enemy.velocity += 10
        }
    })

    if (player.position.x < enemy.position.x + enemy.width &&
        player.position.x + player.width > enemy.position.x &&
        player.position.y < enemy.position.y + enemy.height &&
        player.height + player.position.y > enemy.position.y){
            deathSound.play()
            init()
        }



    
    // win
    if (scrollOffset > platformImg.width * 5 + 500 - 3) {
        console.log('You Win!');
    }

    // lose
    if (player.position.y > canvas.height){
        deathSound.play()
        init()
    }


}




init()
animate()


let timer
let goDown;

addEventListener('keydown', ({ keyCode }) => {
    // console.log(keyCode)
    switch (keyCode) {
        case 65: //LEFT
            keys.left.pressed = true
            break
        case 83:  //DOWN
            if(!timer && keyCode === 83 && player.position.y < 500){
                player.isGround = false
                timer = setTimeout(()=>(timer = clearTimeout(timer)), 1000);
            }
            break
        case 68: //RIGHT

            keys.right.pressed = true
            break
        case 87:

            if (player.isGround) {
                player.velocity.y -= 20
                player.isGround = false
            }
            break
        case 32:
            console.log('space')
            break
    }
})



addEventListener('keyup', ({ keyCode }) => {


    // console.log(keyCode)
    switch (keyCode) {
        case 65:
            keys.left.pressed = false
            break
        case 83: //DOWN

            // console.log('up now')
            keys.down.pressed = false
            keys.down.isDownAlready = false
            break
        case 68:
            keys.right.pressed = false
            break
        case 87:
            break
    }
})

let beep = new Audio("../sounds/ah.mp3")
let ambient = new Audio('../sounds/ambient.mp3')

beep.volume = 0.02
ambient.volume = 0.02


addEventListener('click', () => {
    beep.play()
})

// ambient.play()

var resp = ambient.play();

if (resp !== undefined) {
    resp.then(_ => {
        ambient.play()
    }).catch(error => {
        // ambient.play()
    });
}