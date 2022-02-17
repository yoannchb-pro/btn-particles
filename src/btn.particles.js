class BtnParticles{
    constructor(srcElement, config){
        const defaultParticlesConfig = {
            amount: 15,
            speed: 1500,
            appendTo: document.body,
            color: function(src, particle, index){
                return `hsl(${Math.random() * 90 + 270}, 70%, 60%)`;
            },
            position: function(src, particle, index){
                return {
                    x: (Math.random() - 0.5) * 2 * 90,
                    y: (Math.random() - 0.5) * 2 * 90
                }
            },
            computedStyle: function(src, particle, index){
                const size = (Math.random() + 0.5);
                return {
                    width: size + "rem",
                    height: size + "rem",
                }
            },
            style: {
                border: "thin solid #fff"
            }
        };
        
        this.$el = srcElement;
        this.$particles = [];

        this.config = Object.assign(defaultParticlesConfig, config);

        this.$listener = this.start.bind(this);
        this.$el.addEventListener("click", this.$listener);
    }

    start(event){
        if(this.$particles.length !=0 && this.config.unique) return;

        this.$particles.push([]);

        for(let i=0; i<this.config.amount; ++i){
            this.createParticle(event.pageX, event.pageY, i);
        }

        setTimeout(this.animateParticles.bind(this), 1);
    }

    stop(){
        document.removeEventListener("click", this.$listener);

        while(this.$particles.length != 0){
            this.reset();
        }
    }

    reset(){
        for(const particle of this.$particles[0]){
            particle.remove();
        }

        this.$particles = this.$particles.slice(1);
    }

    createParticle(x, y, index){
        const particle = document.createElement('particle');

        Object.assign(this.config.style, this.config.computedStyle(this.$el, particle, index))

        if(this.config.isRelative){
            const rect = {top: this.$el.offsetTop, left: this.$el.offsetLeft};
            x = x - rect.left;
            y = y - rect.top;
        }

        particle.style.position = "absolute";
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        particle.style.backgroundColor = this.config.color(this.$el, particle, index);
        particle.style.pointerEvents = "none";

        
        particle.style.transition = "all " + this.config.speed + "ms cubic-bezier(0, .9, .57, 1)";
        particle.style.opacity = "1";

        for(const cssProperty of Object.keys(this.config.style)){
            particle.style[cssProperty] = this.config.style[cssProperty];
        }

        this.config.appendTo.appendChild(particle);

        this.$particles[this.$particles.length-1].push(particle);
    }

    animateParticles(){
        for(let i=0; i<this.$particles[this.$particles.length-1].length; ++i){
            const particle = this.$particles[this.$particles.length-1][i];
            const position = this.config.position(this.$el, particle, i);
            
            particle.style.opacity = "0";

            const toStyle = this.config.toStyle ? this.config.toStyle() : {};
            for(const css of Object.keys(toStyle)){
                particle.style[css] = toStyle[css];
            }

            particle.style.transform += ` translateX(${position.x}px) translateY(${position.y}px)`;
        }

        setTimeout(this.reset.bind(this), this.config.speed);
    }
}
  
//EXPORT
if (typeof exports == "object") module.exports = {BtnParticles};