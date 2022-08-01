import platform from './img/platform'

const hills = new Image()
hills.src = './img/hills.png'

const background = new Image()
background.src = './img/background.png'


const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1

class Player {
    constructor() {
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
        else this.velocity.y = 0
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

// function createImage(imageSrc) {
//     const image = new Image()
//     image.src = platform
//     return image
// }

const platformImg = new Image()
platformImg.src = 'img/platform.png'

const player = new Player()
// const platform = new Platform()
const platforms = [new Platform({
    x: -1, 
    y: 470,
    image: platformImg}),
     new Platform({x: image.width - 3, y: 470, image: platformImg})]

// const GenericObject = [
//     new GenericObject({
//         x: 0,
//         y: 0,
//         image: background
//     })
// ]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
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

    if (scrollOffset > 2000) {
        console.log('You Win!');
    }
}

animate();

addEventListener('keydown', ({ keyCode }) => {
    // console.log(keyCode)d
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
            player.velocity.y -= 20
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
        // case 87:
        //     console.log('up')
        //     player.velocity.y -= 20
        //     break
    }
})