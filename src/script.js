if (typeof window !== 'undefined') {
    document.addEventListener("keydown", handleSpace);
    document.addEventListener("keydown", handleDirection);
    document.addEventListener("keypress", onEnter);
    const gameBoard = document.querySelector('.game-board')
    const mario = document.querySelector('.mario')
    const clouds = document.querySelector('.clouds')
    const pipe = document.querySelector('.pipe')
    const direction = document.getElementById('direction')

    function restartGame() {
        window.location.reload();
    }

    function onEnter(evt) {
        if (evt.key === "Enter") {
            if (direction.classList[0] === 'direction-top') {
                restartGame()
            } else {
                window.close()
            }
        }
    }

    function handleDirection(evt) {
        if (evt.code !== 'ArrowUp' && evt.code !== 'ArrowDown') {
            return;
        }
        direction.classList.remove('direction-top')
        direction.classList.remove('direction-bottom')

        if (evt.code === 'ArrowUp') {
            direction.classList.add('direction-top')
        }
        if (evt.code === 'ArrowDown') {
            direction.classList.add('direction-bottom')
        }
    }

    function handleSpace(evt) {
        if (evt.code === 'Space') {
            mario.classList.add('jump')
            setTimeout(() => mario.classList.remove('jump'), 500)
        }
    }

    const setPipeAnimation = (pipePosition) => {
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`
    }
    const setMarioAnimation = (marioPosition) => {
        mario.style.removeProperty('animation')
        mario.style.bottom = `${marioPosition}px`
        mario.style.width = '75px'
        mario.style.marginLeft = '45px'
    }
    const setGameOver = () => {
        mario.src = 'assets/game-over.png'
        const cloudPosition = clouds.offsetLeft
        clouds.style.removeProperty('animation')
        clouds.style.left = `${cloudPosition}px`
        setTimeout(() => {
            gameBoard.style.display = 'none'
        }, 1000)
    }
    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            setPipeAnimation(pipePosition)
            setMarioAnimation(marioPosition)
            setGameOver()
            clearInterval(loop)
        }
    }, 10)
}
