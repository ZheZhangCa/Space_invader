(function(){
	 var oBtn = document.getElementById('gameBtn');
	
           
    oBtn.onclick = function () {
        this.style.display = 'none';
        Game.init('game'); //Game Start
    };

    var Game = {
        oEnemy: {
            e1: { style: 'invader1', blood: 1, speed: 2, score: 1
            },
            e2: { style: 'invader2', blood: 1, speed: 2, score: 2
            }
        },
        gk: [
					{
					    eMap: ['e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1',
									'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1',
									'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e2',
									'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e1', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2'
									],
					    colNum: 9,
					    iSpeedX: 10,
					    iSpeedY: 10,
					    times: 1000
					},
					{
					    eMap: ['e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1',
										'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2',
										'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e1',
										'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2'
										],
					    colNum: 9,
					    iSpeedX: 10,
					    iSpeedY: 10,
					    times: 1000
					}
			],
        air: {
            style: 'ship1',
            bulletStyle: 'bullet'
        },

        //Game init
        init: function (id) {
           
		    this.oParent = document.getElementById(id);

            this.createScore();
            this.createInvader(0);
            this.createShip();
		
			
			
        },
        createScore: function () {
            var oS = document.createElement('div');
            oS.id = 'score';
            oS.innerHTML = 'Score��<span>0</span>';
            this.oParent.appendChild(oS);

            this.oSNum = oS.getElementsByTagName('span')[0]; //Score
        },
        createInvader: function (iNow) {

            if (this.oUl) {
                clearInterval(this.oUl.timer);
                this.oParent.removeChild(this.oUl);
            }
            document.title = '��'+(iNow+1)+'��';
            var gk = this.gk[iNow];
            var arr = [];
            var oUl = document.createElement('ul');
            oUl.id = 'bee';
            oUl.style.width = gk.colNum * 30 + 'px';
            this.oParent.appendChild(oUl);
            oUl.style.left = (this.oParent.offsetWidth - oUl.offsetWidth) / 2 + 'px';

            this.oUl = oUl;
            for (var i = 0; i < gk.eMap.length; i++) {
                var oLi = document.createElement('li');
                oLi.className = this.oEnemy[gk.eMap[i]].style;
                oLi.blood = this.oEnemy[gk.eMap[i]].blood;
                oLi.speed = this.oEnemy[gk.eMap[i]].speed;
                oLi.score = this.oEnemy[gk.eMap[i]].score;

                oUl.appendChild(oLi);
            }

            this.aLi = oUl.getElementsByTagName('li');

            for (var i = 0; i < this.aLi.length; i++) {
                arr.push([this.aLi[i].offsetLeft, this.aLi[i].offsetTop]);
            }
            for (var i = 0; i < this.aLi.length; i++) {
                this.aLi[i].style.position = 'absolute';
                this.aLi[i].style.left = arr[i][0] + 'px';
                this.aLi[i].style.top = arr[i][1] + 'px';
            }

            this.runEnemy(gk);
        },
        runEnemy: function (gk) {
            var that = this;
            var L = 0,
			R = this.oParent.offsetWidth - this.oUl.offsetWidth;
            this.oUl.timer = setInterval(function () {
                if (that.oUl.offsetLeft > R) {
                    gk.iSpeedX *= -1;
                    that.oUl.style.top = that.oUl.offsetTop + gk.iSpeedY + 'px';
                }
                else if (that.oUl.offsetLeft < L) {
                    gk.iSpeedX *= -1;
                    that.oUl.style.top = that.oUl.offsetTop + gk.iSpeedY + 'px';
                }

                that.oUl.style.left = that.oUl.offsetLeft + gk.iSpeedX + 'px';

            }, 200);
            setInterval(function () {
                that.oneMove();
            }, gk.times);
        },

        oneMove: function () {
            var nowLi = this.aLi[Math.floor(Math.random() * this.aLi.length)];
            var that = this;
            nowLi.timer = setInterval(function () {
                var a = (that.oA.offsetLeft + that.oA.offsetWidth / 2) - (nowLi.offsetLeft + nowLi.parentNode.offsetLeft + that.oA.offsetWidth / 2)
                var b = (that.oA.offsetTop + that.oA.offsetHeight / 2) - (nowLi.offsetTop + nowLi.parentNode.offsetTop + that.oA.offsetHeight / 2)
                var c = Math.sqrt(a * a + b * b);

                var iSX = nowLi.speed * a / c;
                var iSY = nowLi.speed * b / c;

                //nowLi.style.left = nowLi.offsetLeft + iSX + 'px';
                nowLi.style.top = nowLi.offsetTop + iSY + 'px';

                if (that.pz(that.oA, nowLi)) {
                    alert('game over');
                    window.location.reload();
                }

            }, 30);
        },




        createShip: function () {//create ship
            var oA = document.createElement('div');
            oA.className = this.air.style;
            this.oParent.appendChild(oA);

            this.oA = oA;
            oA.style.left = (this.oParent.offsetWidth - oA.offsetWidth) / 2 + 'px';
            oA.style.top = this.oParent.offsetHeight - oA.offsetHeight + 'px';
            this.bindAir();
        },
        bindAir: function () {//ship move

            var timer = null;
            var iNum = 0;
            var that = this;
            document.onkeydown = function (ev) {
                var ev = ev || window.event;
                if (!timer) {
                    timer = setInterval(show, 25);
                }

                if (ev.keyCode == 37 || ev.keyCode == 65) {
                    iNum = 1;
                }
                else if (ev.keyCode == 39 || ev.keyCode == 68) {
                    iNum = 2;
                }
                /*else if (ev.keyCode == 32) {
                    return false;
				}*/
            
		       
 
             
                if (ev.keyCode == 32) {
                    that.createBullet();
                }
				
			};

            document.onkeyup = function (ev) {//createBullet
                var ev = ev || window.event;
                clearInterval(timer);
                timer = null;
                iNum = 0;
                if (ev.keyCode == 32) {
                    that.createBullet();
                }
            };

            function show() {
                var L = 0,
		R = that.oParent.offsetWidth - that.oA.offsetWidth;
                if (iNum == 1) {
                    if (that.oA.offsetLeft > 0) {
                        that.oA.style.left = that.oA.offsetLeft - 10 + 'px';
                    }
                }
                else if (iNum == 2) {
                    if (that.oA.offsetLeft < R) {
                        that.oA.style.left = that.oA.offsetLeft + 10 + 'px';
                    }
                }
            }
        },
        createBullet: function () {//createBullet
            var oB = document.createElement('div');
            oB.className = this.air.bulletStyle;
            this.oParent.appendChild(oB);
            oB.style.left = this.oA.offsetLeft + this.oA.offsetWidth / 2 + 'px';
            oB.style.top = this.oA.offsetTop - 10 + 'px';
            this.runBullet(oB);
        },
        runBullet: function (oB) {   //Bullet move

            var that = this;
            oB.timer = setInterval(function () {
                if (oB.offsetTop < -10) {
                    clearInterval(oB.timer);
                    that.oParent.removeChild(oB);
                }
                else {
                    oB.style.top = oB.offsetTop - 10 + 'px';
                }
                for (var i = 0; i < that.aLi.length; i++) {
                    if (that.pz(oB, that.aLi[i])) {

                        if (that.aLi[i].blood == 1) {
                            clearInterval(that.aLi[i].timer);
                            that.oSNum.innerHTML = parseInt(that.oSNum.innerHTML) + that.aLi[i].score;
                            that.oUl.removeChild(that.aLi[i]);
                        } else {
                            that.aLi[i].blood--;
                        }

                        clearInterval(oB.timer);
                        that.oParent.removeChild(oB);
                    }
                }
                if (!that.aLi.length) {
                    that.createInvader(1);
                }
            }, 30);
        },
        pz: function (obj1, obj2) { //intersection detection
            var L1 = obj1.offsetLeft;
            var R1 = obj1.offsetLeft + obj1.offsetWidth;
            var T1 = obj1.offsetTop;
            var B1 = obj1.offsetTop + obj1.offsetHeight;

            var L2 = obj2.offsetLeft + obj2.parentNode.offsetLeft;
            var R2 = obj2.offsetLeft + obj2.parentNode.offsetLeft + obj2.offsetWidth;
            var T2 = obj2.offsetTop + obj2.parentNode.offsetTop;
            var B2 = obj2.offsetTop + obj2.parentNode.offsetTop + obj2.offsetHeight;

            if (R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2) {
                return false;
            }
            else {
                return true;
            }
        }
    }
})();



  