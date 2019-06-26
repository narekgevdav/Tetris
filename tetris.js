let iBlock,jBlock,lBlock,oBlock,sBlock,tBlock,zBlock,tetrisShapes;
let rotationState = 0;
let gameboardState = []

function makeshapes() {
    iBlock = [[[0,0],[1,0],[2,0],[3,0]],[[0,0],[0,1],[0,2],[0,3]],[[0,0],[1,0],[2,0],[3,0]],[[0,0],[0,1],[0,2],[0,3]]]
    jBlock = [[[0,1],[1,1],[2,1],[2,0]],[[0,0],[1,0],[1,1],[1,2]],[[0,2],[0,1],[1,1],[2,1]],[[1,0],[1,1],[1,2],[2,2]]]
    lBlock = [[[0,0],[1,0],[2,0],[2,1]],[[0,0],[0,1],[0,2],[1,2]],[[0,2],[1,2],[2,2],[2,1]],[[1,0],[2,0],[2,1],[2,2]]]
    oBlock = [[[0,0],[0,1],[1,1],[1,0]],[[0,0],[0,1],[1,1],[1,0]],[[0,0],[0,1],[1,1],[1,0]],[[0,0],[0,1],[1,1],[1,0]]]
    sBlock = [[[0,1],[0,2],[1,0],[1,1]],[[0,1],[1,1],[1,2],[2,2]],[[0,1],[0,2],[1,0],[1,1]],[[0,1],[1,1],[1,2],[2,2]]]
    tBlock = [[[0,1],[1,0],[1,1],[1,2]],[[0,1],[1,1],[1,2],[2,1]],[[1,0],[1,1],[1,2],[2,1]],[[1,0],[0,1],[1,1],[2,1]]]
    zBlock = [[[0,0],[0,1],[1,1],[1,2]],[[0,2],[1,2],[1,1],[2,1]],[[0,0],[0,1],[1,1],[1,2]],[[0,2],[1,2],[1,1],[2,1]]]
    tetrisShapes =[iBlock,jBlock,lBlock,oBlock,sBlock,tBlock,zBlock]


}



let shape;
let canmove = true



function makeGameBoard() {
    const gameBoard = document.getElementById("gameboard")
        for(let i = 0; i<20;i++){
            let row = document.createElement('div')
            row.className = "row"
            row.dataset.row = i
            let arr =[]
            for(let j = 0; j<10;j++){
                let box = document.createElement('div')
                box.className = "box"
                box.dataset.index = `${i},${j}`
                box.dataset.state = "0";
               box.innerHTML = `.`
                row.appendChild(box)
                arr.push('0')

            }
            gameBoard.appendChild(row)
            gameboardState.push(arr)
        }

}
function getRandomShape() {
    makeshapes()
    let randomShape = Math.floor(Math.random()*7)
    shape = tetrisShapes[randomShape]

}

    function drowShape() {



        for (let item of shape[rotationState]) {
            let activeShape = document.querySelector(`[data-index = "` + item[0] + `,` + (item[1] + 4) + `"]`)
            activeShape.dataset.state = "1"

        }
        document.addEventListener("keydown", move)


    }

    makeGameBoard();
    getRandomShape();
    drowShape();

    function move(direction) {
        switch (direction.key) {
            case "ArrowDown":
                goDown(shape);
                break;
            case "ArrowLeft":
                goLeft(shape);
                break;
            case "ArrowRight":
                goRight(shape);
                break;
            case  "ArrowUp":
                rotate(shape);
                break;


        }
    }

    function goDown(shape) {



        for (let item of shape[rotationState]) {
            if ((item[0] < 19 && item[0] < 19 && item[0] < 19 && item[0] < 19)) {
                if (document.querySelector(`[data-index = "` + (item[0] + 1) + `,` + (item[1] + 4) + `"]`).dataset.state === "2") {
                    canmove = false
                }
            } else {
                canmove = false
                break;
            }
        }


        if (canmove) {
            for (let item of shape) {
                if (item != shape[rotationState]){
                    for (el of item) {
                        el[0] += 1

                    }

                }
            }

            for (let item of shape[rotationState]) {
                let clearedBox = document.querySelector(`[data-index = "` + item[0] + `,` + (item[1] + 4) + `"]`)
                clearedBox.dataset.state = "0"

            }
            for (let item of shape[rotationState]) {
                let activeShape = document.querySelector(`[data-index = "` + (item[0] + 1) + `,` + (item[1] + 4) + `"]`)
                activeShape.dataset.state = "1"

                item[0] += 1
            }

        } else {
            for (let item of shape[rotationState]) {
                let activeShape = document.querySelector(`[data-index = "` + item[0] + `,` + (item[1] + 4) + `"]`)
                activeShape.dataset.state = "2"
                gameboardState[(item[0])][(item[1]+4)]="2"
                rotationState = 0


            }
            canmove = true
            getRandomShape();
            drowShape()
        }
    }
    function goLeft(shape) {



        for (let item of shape[rotationState]) {
            if (((item[1] + 4) > 0 && (item[1] + 4) > 0 && (item[1] + 4) > 0 && (item[1] + 4) > 0)) {
                if (document.querySelector(`[data-index = "` + (item[0]) + `,` + (item[1] + 3) + `"]`).dataset.state === "2") {
                    canmove = false
                }
            } else {
                canmove = false
            }
        }


        if (canmove) {
            for (let item of shape) {
                if (item != shape[rotationState]){
                    for (el of item) {
                        el[1] -= 1

                    }

                }
            }

            for (let item of shape[rotationState]) {
                let clearedBox = document.querySelector(`[data-index = "` + item[0] + `,` + (item[1] + 4) + `"]`)
                clearedBox.dataset.state = "0"

            }
            for (let item of shape[rotationState]) {
                let activeShape = document.querySelector(`[data-index = "` + (item[0]) + `,` + (item[1] + 3) + `"]`)
                activeShape.dataset.state = "1"

                item[1] -= 1
            }


        } else {
            canmove = true
        }
    }

function goRight(shape) {


    for (let item of shape[rotationState]) {
        if (((item[1] + 4) < 9 && (item[1] + 4) < 9 && (item[1] + 4) < 9 && (item[1] + 4) < 9)) {
            if (document.querySelector(`[data-index = "` + (item[0]) + `,` + (item[1] + 5) + `"]`).dataset.state === "2") {
                canmove = false
            }
        } else {
            canmove = false
        }
    }


    if (canmove) {
        for (let item of shape) {
            if (item != shape[rotationState]){
                for (el of item) {
                    el[1] += 1

                }

            }
        }

        for (let item of shape[rotationState]) {
            let clearedBox = document.querySelector(`[data-index = "` + item[0] + `,` + (item[1] + 4) + `"]`)
            clearedBox.dataset.state = "0"

        }
        for (let item of shape[rotationState]) {
            let activeShape = document.querySelector(`[data-index = "` + (item[0]) + `,` + (item[1] + 5) + `"]`)
            activeShape.dataset.state = "1"

            item[1] += 1
        }



    } else {
        canmove = true
    }
}

function  rotate(shape) {
        let canrotate = true;
    for (let item of shape[rotationState]) {
        if (((item[1] + 4) > 0 && (item[1] + 4) > 0 && (item[1] + 4) > 0 && (item[1] + 4) > 0)
            &&((item[1] + 4) < 9 && (item[1] + 4) < 9 && (item[1] + 4) < 9 && (item[1] + 4) < 9)&&
            (item[0] < 19 && item[0] < 19 && item[0] < 19 && item[0] < 19)
        ) {
            if ((document.querySelector(`[data-index = "` + (item[0]) + `,` + (item[1] + 3) + `"]`).dataset.state === "2")||
                (document.querySelector(`[data-index = "` + (item[0]) + `,` + (item[1] + 5) + `"]`).dataset.state === "2")||
                (document.querySelector(`[data-index = "` + (item[0] + 1) + `,` + (item[1] + 4) + `"]`).dataset.state === "2")
            ) {
                canrotate = false
            }
        } else {
            canrotate = false
        }
    }
if(canrotate) {
    for (let item of shape[rotationState]) {
        let clearedBox = document.querySelector(`[data-index = "` + item[0] + `,` + (item[1] + 4) + `"]`)
        clearedBox.dataset.state = "0"
    }


    if (rotationState < 3) {
        rotationState += 1
    } else {
        rotationState = 0
    }


    for (let item of shape[rotationState]) {
        let activeShape = document.querySelector(`[data-index = "` + (item[0]) + `,` + (item[1] + 4) + `"]`)
        activeShape.dataset.state = "1"
    }


}
}


