// Sounds
let deathSound = new Audio('../sounds/death.mp3')
deathSound.volume = 0.15

let enemyDeath =  new Audio('../sounds/enemyDeath.mp3')
enemyDeath.volume = .1

let beep = new Audio("../sounds/ah.mp3")
let ambient = new Audio('../sounds/ambient.mp3')

beep.volume = 0.02
ambient.volume = 0.02



// ambient.play()

var resp = ambient.play();

if (resp !== undefined) {
    resp.then(_ => {
        ambient.play()
    }).catch(error => {
        // ambient.play()
    });
}

//ktman.style.scale = 3


// Images

let platformImg = new Image()
platformImg.src = './img/platform.png'

let platformSmallImg = new Image()
platformSmallImg.src = './img/platformSmallTall.png'

let hills = new Image()
hills.src = './img/hills.png'

let background = new Image()
background.src = './img/background.png'

let bulletSprite = new Image()
bulletSprite.src = './img/disk.png'


//Blender----------------
let blenderBullet = new Image()
blenderBullet.src = './img/blender/blenderBullet2.svg'

// c.drawImage(blenderBullet,
//     7 * this.bulletFrames + this.bulletFrames,0,
//     7, 4,
//     this.x,
//     this.y,
//     this.width,
//     this.height);
//-----------------------

//KTMAN------------------
let ktmanStayRight = new Image()
ktmanStayRight.src = './img/ktman/ktman-stayAnim.svg'

let ktmanStayLeft = new Image()
//ktmanStayLeft.src = './img/ktman/ktman-stayAnim.png'

let ktmanDisk = new Image()
ktmanDisk.src = './img/ktman/ktmanDisk.svg'


//-----------------------



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
        this.frames = 0;

    }
    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(ktmanStayRight,
                    12 * this.frames,0,
                    12, 17,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height);
    }

    update() {
        

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

//UPDATE//
    setInterval(()=>{
        player.frames++
        if(player.frames > 24) player.frames = 0;

        
    }, 30)
    setInterval(()=>{

        bullets.forEach(bullet => {
            bullet.bulletFrames++
            if(bullet.bulletFrames > 1) bullet.bulletFrames = 0;
        })
    }, 200)
//------//


class Enemy {
    constructor({ x, y }) {
        this.position = {
            x,
            y
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

class Bullet {
    constructor (x, y, color, velocity, target) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = velocity
        this.width = 36
        this.height = 36
        this.bulletFrames = 0
        this.needReturn = false

        this.target = target
    }

    draw() {

        //c.fillStyle = this.color
        //c.fillRect(this.x, this.y, this.width, this.height)
        
        c.drawImage(ktmanDisk,
            12 * this.bulletFrames + this.bulletFrames,0,
            12, 12,
            this.x,
            this.y,
            this.width,
            this.height);
    }
    intarget() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y 

        enemies.forEach(enemy => {
            if (this.x < enemy.position.x + enemy.width &&
                this.x + this.width > enemy.position.x &&
                this.y < enemy.position.y + enemy.height &&
                this.height + this.y > enemy.position.y){
                    this.needReturn = true
                    enemy.velocity += 100
                    enemyDeath.play()
            }
        })

        if ( this.x < this.target.x &&
             this.x + this.width > this.target.x &&
             this.y < this.target.y &&
             this.y + this.height > this.target.y)
        
        {
            this.needReturn = true;        
        }
    }
    return() {
        this.draw()
        

        const angle = Math.atan2((player.position.y + player.height / 2) - (this.y + this.height / 2),
         (player.position.x + player.width / 2) - (this.x + this.width / 2))
        // console.log(angle);
        
        
            this.velocity.x = Math.cos(angle) *8,
            this.velocity.y =  Math.sin(angle) *8

            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y
        
        
            //bullets.splice(bulle, 1)


        
        //Видалення кулі
        if (this.x < player.position.x + player.width && 
            this.x + this.width > player.position.x &&
            this.y < player.position.y + player.height &&
            this.height + this.y > player.position.y){
                if (bullets.indexOf(this) !== -1) {
                    bullets.splice(bullets.indexOf(this), 1);
                }  
        }

        enemies.forEach(enemy => {
        //Смерть ворогам! Слава Україні
        if (this.x < enemy.position.x + enemy.width &&
            this.x + this.width > enemy.position.x &&
            this.y < enemy.position.y + enemy.height &&
            this.height + this.y > enemy.position.y){
                this.needReturn = true
                enemy.velocity += 100
                enemyDeath.play()
        }
        })


    }
}



// Змінні ------------------------------------------------------------------------------


let player = new Player()

let platforms = []

let genericObject = []

let bullets = []

let enemies = []

canvas.addEventListener('click', (event) => {

   if(bullets.length <= 0)
   {

    const angle = Math.atan2(event.offsetY - ((player.position.y ) + player.height / 2), event.offsetX - ((player.position.x ) + player.width / 2))
    // console.log(angle);
    console.log((player.position.x + player.width / 2))
    const velocity = {
        x: Math.cos(angle) * 6.5,
        y: Math.sin(angle) * 6.5
    }
    
    const target = {
        x: event.offsetX,
        y: event.offsetY
    }
    let bullet = new Bullet(
        player.position.x + player.width / 2,
        player.position.y + player.height / 2,
        // event.offsetX,
        // event.offsetY,
        'yellow',
        velocity,
        target
        
    )
    bullet.x -= 18;
    bullet.y -= 18;
    // console.log(bullet)
    setTimeout(()=>{
        bullet.needReturn = true;
    }, 1000)

    console.log(target)

    // bullet.position.x = player.position.x + (player.width / 2) - (bullet.width / 2);
    // bullet.position.y = player.position.y + (player.height / 2) - (bullet.height / 2)
    beep.play()
    bullets.push(bullet)
    }
})






// Init Function ------------------------------------------------------------------------------

function init() {

    player = new Player()

    enemies = [
        new Enemy({
            x: 700,
            y: 100
        }),
        new Enemy({
            x: 400,
            y: 100
        }),
        new Enemy({
            x: 900,
            y: 100
        }),
        new Enemy({
            x: 530,
            y: 300
        })
    ]

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

    enemies.forEach(enemy => {
        enemy.update()
    })

    
    

    bullets.forEach(bullet => {
        if(bullet.needReturn == false)
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

            enemies.forEach(enemy => {
                enemy.position.x -= player.speed
            })
            
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })

            bullets.forEach(bullet => {
                bullet.x -= player.speed
                // bullet.target.a -= player.speed
            })

            genericObject.forEach(genericObject => {
                genericObject.position.x -= player.speed * 0.5
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed

            enemies.forEach(enemy => {
                enemy.position.x += player.speed
            })

            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            
            bullets.forEach(bullet => {
                bullet.x += player.speed
                // bullet.target.a += player.speed
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

       enemies.forEach(enemy => {
        if (enemy.position.y + enemy.height <= platform.position.y && enemy.position.y + enemy.height
            + enemy.velocity.y >= platform.position.y && enemy.position.x + enemy.width >= platform.position.x
            && enemy.position.x <= platform.position.x + platform.width) {
            enemy.velocity.y = 0;
        }
       })
    })

    platforms.forEach(platform => {
        // ---- Майбутній зпуск з платформи
        //     Далі буде
    })




    // enemy collision

    enemies.forEach(enemy => {
        if (player.position.y + enemy.height <= enemy.position.y && player.position.y + player.height
            + player.velocity.y >= enemy.position.y && player.position.x + player.width >= enemy.position.x
            && player.position.x <= enemy.position.x + enemy.width) {
            player.velocity.y -= 35
            player.isGround = false
            enemyDeath.play()
            enemy.velocity += 10
        }
    
        if (player.position.x < enemy.position.x + enemy.width &&
            player.position.x + player.width > enemy.position.x &&
            player.position.y < enemy.position.y + enemy.height &&
            player.height + player.position.y > enemy.position.y){
                deathSound.play()
                bullets = []
                init()
        }
    })


    
    // win
    if (scrollOffset > platformImg.width * 5 + 500 - 3) {
        console.log('You Win!');
    }

    // lose
    if (player.position.y > canvas.height){
        deathSound.play()
        bullets = []
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

