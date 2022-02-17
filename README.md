# btn-particles

Create beautiful ripple effect or particles effect on buttons

## Update

v1.0.0
- Initial Commit

## Installation
- NPM
```
npm i btn-particles
```
- GITHUB
```html
<script type="text/javascript" src="./src/btn.particles.js"></script>
<!-- OR -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/yoannchb-pro/btn-particles/src/btn.particles.min.js"></script>
```

## Example

- [Documentation on the github page](https://yoannchb-pro.github.io/btn-particles/index.html)

## How to use ?
```js
const event = new BtnParticles(element, config = {
    amout: number, //amount of particles
    appendTo: HTMLElement, //by default it's the body
    isRelative: boolean, //if parent is in position relative
    speed: number, //number in ms for animation duration
    style: json, //particle css style
    computedStyle: Function, //particle css computed style
    color: Function, //particle color
    position: Function, //particle position at the end of the animation
    toStyle: Function, //Final particle css computed style
});

event.start();
event.stop();
event.reset();

//Simple effect
new BtnParticles(document.querySelector('#btn1'));

//Round effect
new BtnParticles(document.querySelector('#btn4'), {
    amount: 5,
    color: function(){
        return `hsl(0, 70%, 60%)`
    },
    style: {
        borderRadius: "50%"
    }
});

//Firework effect
new BtnParticles(document.querySelector('#btn2'), {
    amount: 10,
    speed: 1000,
    computedStyle: function(src, particle, index){
        return {
            transform: "rotate(" + 360/(10/(10-index)) + "deg)"
        }
    },
    position: function(src, particle, index){
        return {
            x: Math.sin(index/100)*75,
            y: Math.cos(index/100)*75
        }
    },
    color: function(){
        return `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
    },
    style: {
        width: "0.2rem",
        height: "2rem",
        border: "thin solid #00000090",
        transformOrigin: "center",
        borderRadius: "0.25rem"
    }
});

//Ripple effect
new BtnParticles(document.querySelector('#btn3'), {
    amount: 1,
    speed: 1500,
    appendTo: document.querySelector('#btn3'),
    isRelative: true,
    position: function(){
        return {x: 0, y: 0}
    },
    toStyle: function(){
        return {
            width: "15rem",
            height: "15rem",
            opacity: "0"
        }
    },
    style: {
        opacity: 0.8,
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        borderRadius: "50%",
        width: "0rem",
        height: "0rem"
    }
});
```