(function(w,d){
    var sign = 1;
    //用户自定义配置信息
    function Carousel(obj){
        this.obj = obj;
    }
    //配置信息
    Carousel.prototype.obj = {
        time:3000,
        num:5,
        src:['img/b1.png','img/b2.png','img/b3.png','img/b4.png','img/b5.png','img/b1.png'],
        width:1200
    }
    //初始化
    Carousel.prototype.init = function(){
        console.log(this.__proto__.obj);
        //左右按钮
        var isRun = false;
        var left = d.createElement('span');
        var right = d.createElement('span');
        left.innerHTML = '<';
        right.innerHTML = '>';
        left.id = 'left';
        right.id = 'right';
        left.onclick = (e)=>{
            if(isRun)
                return;
            else{
                isRun = true;
                this.__proto__.last(e,isRun);
                setTimeout(()=>{isRun = false;},this.__proto__.obj.time);
            }
        } ;
        right.onclick = (e)=>{
            if(isRun)
                return;
            else{
                isRun = true;
                this.__proto__.next(e,isRun);
                setTimeout(()=>{isRun = false},this.__proto__.obj.time)
            }
        };
        //序号
        var ul = d.createElement('ul');
        ul.className = 'nav';
        ul.id = 'navs';
        for(var j = 0;j<this.__proto__.obj.num;j++){
            //
            var li = d.createElement('li');
            li.innerText = j+1;
            li.className = 'li';
            li.onclick = (e)=>{
                let li = d.getElementsByTagName('li');
                for(var i =0;i<li.length;i++){
                    li[i].style.backgroundColor = '#ccc';
                }
                e.target.style.backgroundColor = 'red';
                this.__proto__.clickNum(e.target.innerText);
            }
            ul.appendChild(li);
        };
        //容器
        var container = d.createElement('div');
        container.id = 'slider';
        container.className = 'slider';
        //图片加载
        for(var i = 0 ; i < this.__proto__.obj.num+1 ; i++){
            //
            var slider = d.createElement('div');
            slider.className = 'slide';
            //
            var img = d.createElement('img');
            img.src = this.__proto__.obj.src[i];
            //
            slider.append(img);
            container.append(slider);
        }
        var li = d.getElementsByClassName('li');
        setInterval(()=>{
            for(var i = 0;i < this.__proto__.obj.num;i++){
                if(li[i].innerText == this.__proto__.obj.index){
                    li[i].style.backGroundColor = 'red';
                }
            }
        },500)
        d.getElementById('box').appendChild(container);
        d.getElementById('box').appendChild(ul);
        d.getElementById('box').appendChild(left);
        d.getElementById('box').appendChild(right);
        d.getElementsByTagName('li')[0].style.backgroundColor='red';
    }
    //下一个
    Carousel.prototype.next = function(){
        var slider = d.getElementById('slider');
        var i = 0,arr=[25,25,50,100,100,150,300,150,100,100,50,25,25];
        var li = d.getElementsByTagName('li');
        console.log(this.__proto__.obj);
        clearInterval(timer);
        var timer = setInterval(()=>{
            if(i == arr.length){
                clearInterval(timer);
            }else if(slider.offsetLeft == -1200*5){
                slider.style.left = 0 + 'px';
                i = 0;
                sign = 1;
            }else{
                slider.style.left = slider.offsetLeft - arr[i] + 'px';
                i+=1;
            }
        },50);
        if(sign == 5)
            sign = 1;
        else
            sign++;
        for(var j = 0;j<5;j++){
            if(li[j].innerText == sign){
                li[j].style.backgroundColor = 'red';
            }else{
                li[j].style.backgroundColor = '#ccc';
            }
        };
        console.log(sign);
    }
    //上一个
    Carousel.prototype.last = function(){
        var slider = d.getElementById('slider');
        var i = 0,arr=[25,25,50,100,100,150,300,150,100,100,50,25,25];
        var li = d.getElementsByTagName('li');
        clearInterval(timer);
        var timer = setInterval(()=>{
            if(i == arr.length){
                clearInterval(timer);
            }else if(slider.offsetLeft == -1200*0){
                slider.style.left = -1200*5 + 'px';
                i = 0;
            }else{
                slider.style.left = slider.offsetLeft + arr[i] + 'px';
                i+=1;
            }
        },50)
        console.log('上一个');
        if(sign == 1)
            sign = 5;
        else
            sign --;
        for(var j = 0;j<5;j++){
            if(li[j].innerText == sign){
                li[j].style.backgroundColor = 'red';
            }else{
                li[j].style.backgroundColor = '#ccc';
            }
        };
        console.log(sign);
    }
    //
    Carousel.prototype.clickNum = function(num){
        sign = num;
        var slider = d.getElementById('slider');
        slider.style.left = -1200 * num + 'px';
        console.log(num,1200*num);
    }
    //
    Carousel.prototype.autoPlay = function(){
        var li = d.getElementsByTagName('li');
        setInterval(
            ()=>{
                this.__proto__.next()
                for(var j = 0;j<this.__proto__.obj.num;j++){
                    if(li[j].innerText == sign){
                        li[j].style.backgroundColor = 'red';
                    }else{
                        li[j].style.backgroundColor = '#ccc';
                    }
                };
        },this.__proto__.obj.time);

    }
    w.Carousel = Carousel;
})(window,document)