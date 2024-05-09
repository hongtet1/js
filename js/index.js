let pageAll = document.getElementsByClassName("page");
var pageH = document.getElementById("box").offsetHeight;
let myMusic = document.getElementById("music");
let bgm = document.getElementById("bgm");
let startY, endY, val = 0;
let curPage = 0; 
let nextPage = 1;
let ifDown = false;
let ifOK = true;
let playBgm = false;


bgm.addEventListener("click", function () {
    if (myMusic.paused) {
        myMusic.play();
        bgm.style.animationPlayState = "running"
    } else {
        myMusic.pause();
        bgm.style.animationPlayState = "paused"
    }
})

document.addEventListener("click", function (e) {
    if (!playBgm && myMusic.paused) {
        playBgm = true;
        myMusic.play();
        bgm.style.animationPlayState = "running"
    }

    setTimeout(function () {
        fp();
    }, 800)
    $(".cfgy").animate({
        left: "34%"
    }, 800)
    $("#dian").hide();

})





document.addEventListener("touchstart", function (e) {
    if (ifOK) {
        ifDown = true;
        ifOK = false;
        startY = e.touches[0].pageY;
    }

})
document.addEventListener("touchmove", function (e) {
    if (!ifDown) {
        return;
    }
    endY = e.touches[0].pageY;
    val = startY - endY;
    moveF();
})

document.addEventListener("touchend", function (e) {
    if (!ifDown) {
        return;
    }
    console.log("mouseup", val)
    ifDown = false;
    pageF();
})


document.addEventListener("mousedown", function (e) {
    if (ifOK) {
        ifDown = true;
        ifOK = false;
        console.log("mousedown", e.offsetY)
        startY = e.offsetY;
    }
})
document.addEventListener("mousemove", function (e) {

    if (!ifDown) {
        return;
    }
    endY = e.offsetY;
    val = startY - endY;
    moveF();
})
document.addEventListener("mouseup", function (e) {
    if (!ifDown) {
        return;
    }
    console.log("mouseup", val)
    ifDown = false;
    pageF();
})
function pageF() {
    if (Math.abs(val) > 60) {
        startF();
    } else {
        pageAll[nextPage].classList.remove("active");
        pageAll[nextPage].style.transform = "translateY(0px)";
        clearF();
    }
}
function clearF() {
    val = 0;
    startY = 0;
    endY = 0;
    ifOK = true;
}
function startF() {
    if (val > 0) {
        val += 15;
        let a = pageH - val;
        if (a <= 0) {
            setCur();
        } else {
            pageAll[nextPage].style.transform = "translateY(" + a + "px)";
            window.requestAnimationFrame(startF);
        }
    } else {
        val -= 15;
        let a = -(pageH + val);
        if (a >= 0) {
            setCur();
        } else {
            pageAll[nextPage].style.transform = "translateY(" + a + "px)";
            window.requestAnimationFrame(startF);
        }
    }
}
function setCur() {
    pageAll[nextPage].style.transform = "translateY(0px)";
    pageAll[curPage].classList.remove("current");
    curPage = nextPage;
    pageAll[nextPage].classList.remove("active");
    pageAll[curPage].classList.add("current");
    clearF();
}
function moveF() {
    nextPage = curPage;
    let h;
    if (val > 0) {
        if (curPage < pageAll.length - 1) {
            nextPage++;
        } else {
            nextPage = 0;
        }
        h = pageH - val;
    } else {
        if (curPage != 0) {
            nextPage--;
        } else {
            nextPage = pageAll.length - 1;
        }
        h = - (pageH + val);
    }
    pageAll[nextPage].classList.add("active");
    pageAll[nextPage].style.transform = "translateY(" + h + "px)";
}
function randNum(min, max) {
    return min + Math.random() * (max - min);
}
class Snowflake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 0;
        this.alpha = 0;
        this.reset();
    }
    reset() {
        this.x = randNum(0, window.innerWidth);
        this.y = randNum(0, -window.innerHeight);
        this.vx = randNum(-3, 3);
        this.vy = randNum(2, 5);
        this.radius = randNum(2, 6);
        this.alpha = randNum(0.4, 0.9);
    }
    update() {
        this.x += this.vx;

        this.y += this.vy;
        if (this.y + this.radius > window.innerHeight) {
            this.reset();
        }
    }
}
class Snow {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        window.addEventListener("resize", () => this.onResize());
        this.onResize();
        this.updateF = this.update.bind(this);
        requestAnimationFrame(this.updateF);

        this.createSnowflakes();
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createSnowflakes() {
        const num = window.innerWidth / 3;
        this.snowflakes = [];
        for (let s = 0; s < num; s++) {
            this.snowflakes.push(new Snowflake());
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let flake of this.snowflakes) {
            flake.update();

            this.ctx.save();
            this.ctx.fillStyle = "#FFF";
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.globalAlpha = flake.alpha;
            this.ctx.fill();
            this.ctx.restore();
        }
        requestAnimationFrame(this.updateF);
    }
}

new Snow();
var $body = $('body');
var $bp = $body.find('.phaono');
var $bomb = $body.find('.bomb');
var $bpmp3 = $body.find('#phaono');


var speed = 20;

var fpFlag = false;
function fp() {
    if (fpFlag) {
        return;
    }
    var end = false;
    var shiza = true;
    fpFlag = true;
    var top = ($bomb.position().top >= 460 || !$bomb.position().top) ? 460 : $bomb.position().top;
    timer = setInterval(function () {
        $(".cfgy").hide();

        var bombClassName = 'bomb';
        var height = $bp.height();
        

        if (end) {
            clearInterval(timer);
            $bomb.hide();
            $(".bgm").show();
            setTimeout(function () {
                $bpmp3[0].pause();
                $(".bp-box").animate({
                    opacity: '0'
                });
                
                setTimeout(function () {
                    val = 1;
                    startF();
                }, 4000)

            }, 500);



        } else {

            if (height % 2 == 0) {
                $bomb.removeClass('bomb2').addClass('bomb1').show();
                $bp.removeClass('phaono2').addClass('phaono1');
            } else {
                $bomb.removeClass('bomb1').addClass('bomb2').show();
                $bp.removeClass('phaono1').addClass('phaono2');
            }
            top = $bomb.position().top;
            $bomb.css('top', top - speed);
            let h = height - speed;
            if (h < 0) {
                shiza = !shiza;
                h = shiza ? 1 : 0;
                setTimeout(function () {
                    end = true;
                }, 1000)
            }

            $bp.css('height', h);
            $bpmp3[0].play();

        }
    }, 100);

}



