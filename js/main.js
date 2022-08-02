// Images

let platformImg = new Image()
platformImg.src = './img/platform.png'

let platformSmallImg = new Image()
platformSmallImg.src = './img/platformSmallTall.png'

let hills = new Image()
hills.src = './img/hills.png'

let background = new Image()
background.src = './img/background.png'

// --------------------------------------------------


const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1

class Player {
    constructor() {
        this.speed = 5
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 30
        this.height = 30
        this.velocity = {
            x: 0,
            y: 0
        }
        this.direction = 1
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
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
        // this.width = 300
        // this.height = 20
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
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

// function createImage(imageSrc) {
//     const image = new Image()
//     image.src = platform
//     return image
// }

let player = new Player()
// const platform = new Platform()
let platforms = [
    // new Platform({
    // x: -1, 
    // y: 470,
    // image: platformImg
    // }),
    // new Platform({
    // x: platformImg.width - 3,
    // y: 470,
    // image: platformImg
    // }),
    // new Platform({
    // x: platformImg.width *2 + 100,
    // y: 470,
    // image: platformImg
    // }),
]

let genericObject = [
    // new GenericObject({
    //     x: -1,
    //     y: -1,
    //     image: background
    // }),
    // new GenericObject({
    //     x: -1,
    //     y: -1,
    //     image: hills
    // })
]



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
}

let scrollOffset = 0

function init(){

player = new Player()
// const platform = new Platform()
platforms = [
    new Platform({
    x: platformImg.width *4 + 300 - 3 + platformImg.width - platformSmallImg.width,
    y: 350,
    image: platformSmallImg
    }),
    new Platform({
    x: -1, 
    y: 470,
    image: platformImg
    }),
    new Platform({
    x: platformImg.width - 3,
    y: 470,
    image: platformImg
    }),
    new Platform({
    x: platformImg.width *2 + 100,
    y: 470,
    image: platformImg
    }),
    new Platform({
    x: platformImg.width *3 + 300,
    y: 470,
    image: platformImg
    }),
    new Platform({
    x: platformImg.width *4 + 300 - 3,
    y: 470,
    image: platformImg
    }),
    new Platform({
    x: platformImg.width *5 + 600 - 3,
    y: 470,
    image: platformImg
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

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if (
        (keys.left.pressed && player.position.x > 200) || 
        (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
    ){
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })

            genericObject.forEach(genericObject => {
                genericObject.position.x -= player.speed * 0.66
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed

            platforms.forEach(platform => {
                platform.position.x += player.speed
            })

            genericObject.forEach(genericObject => {
                genericObject.position.x += player.speed * 0.66
            })   
        }
    }

    

    // Platform collision
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height
            + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0;
        }
    })

    console.log(scrollOffset)

    // win
    if (scrollOffset > platformImg.width *5 + 500 - 3) {
        console.log('You Win!');
    }

    // lose
    if (player.position.y > canvas.height) {
        init()
    }
}

init()
animate()

addEventListener('keydown', ({ keyCode }) => {
    // console.log(keyCode)
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
        case 83:
            console.log('down')
            break   
        case 68:
            console.log('right')
            keys.right.pressed = true
            break
        case 87:
            console.log('up')
            player.velocity.y -= 25
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
            console.log('left')
            keys.left.pressed = false
            break
        case 83:
            console.log('down')
            break   
        case 68:
            console.log('right')
            keys.right.pressed = false
            break
        case 87:
            console.log('up')
            break
    }
})