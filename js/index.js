//顶部和导航栏的点击事件
(function () {
    let loginbtn = document.querySelector('.login');
    let loginbg = document.querySelector('.login-bg');
    let loginCon = document.querySelector('.login-container');
    let codebtn = document.querySelector('.code');
    let loginpic = document.querySelector('.login-a');
    let secNav = document.querySelector('.sec-nav'),
        zhushou = secNav.querySelector('.zhushou'),
        weiquan = secNav.querySelector('.weiquan'),
        weixin = secNav.querySelector('.weixin'),
        shouq = secNav.querySelector('.shouq'),
        kf = secNav.querySelector('.kf'),
        codebg = document.querySelector('.code-bg'),
        piccode1 = codebg.querySelector('.pic-code1'),
        piccode2 = codebg.querySelector('.pic-code2'),
        piccode3 = codebg.querySelector('.pic-code3'),
        piccode4 = codebg.querySelector('.pic-code4'),
        piccode5 = codebg.querySelector('.pic-code5');

    /* 登录 */
    loginbtn.onclick = function (e) {
        let target = e.target;
        if (target.tagName === "A") {
            loginbg.style.display = 'block';
        }
    }
    loginbg.onclick = function (e) {
        let target = e.target;
        if (target.tagName === "A") {

            let btm = target.getAttribute('class')
            if (btm === 'btn1') {
                loginbg.style.display = 'none';
            }
            if (btm === 'btn2' || btm === 'btn3') {
                console.log(11111);
                loginCon.style.display = 'none';
                codebtn.style.display = 'block';
            }
            if (btm === '×') {
                loginbg.style.display = 'none';
            }
        }
    }
    loginpic.onclick = function () {
        loginbg.style.display = 'block';
    }
    secNav.onclick = function (e) {
        let target = e.target;
        if (target.tagName === "A") {
            let btm = target.getAttribute('class');
            switch (btm) {
                case 'zhushou': {
                    codebg.style.display = 'block';
                    piccode1.style.display = 'block';
                    break;
                };
                case 'weiquan': {
                    codebg.style.display = 'block';
                    piccode2.style.display = 'block';
                    break;
                };
                case 'weixin': {
                    codebg.style.display = 'block';
                    piccode3.style.display = 'block';
                    break;
                };
                case 'shouq': {
                    codebg.style.display = 'block';
                    piccode4.style.display = 'block';
                    break;
                };
                case 'kf': {
                    codebg.style.display = 'block';
                    piccode5.style.display = 'block';
                    break;
                };
                default: break;
            }
        }
    }
    codebg.onclick = function (e) {
        let target = e.target;
        if (target.tagName === "A") {
            codebg.style.display = 'none';
            piccode1.style.display = 'none';
            piccode2.style.display = 'none';
            piccode3.style.display = 'none';
            piccode4.style.display = 'none';
            piccode5.style.display = 'none';
        }
    }
})()

//轮播事件
let topScr = function () {
    let container = document.querySelector('.main-top-container'),
        wrapper = container.querySelector('.main-top-left'),
        slideList = Array.from(wrapper.querySelectorAll('.ggpic')),
        paginationList = Array.from(container.querySelectorAll('.ggpic-list a'));
    /*
    count:记录轮播图的数量
    step:记录当前展示这张的索引
    interval:自动轮播每隔多久执行一次
    speed:每次运动花费的时间
    autoTimer:存储自动轮播的定时器
    w:可视窗口的宽度
    */
    let count = slideList.length,
        step = 0,
        interval = 4000,
        speed = 300,
        autoTimer = null,
        w = container.offsetWidth;

    /* 初始化样式 */

    const atuoFocus = function atuoFocus() {
        let temp = step;
        if (temp >= count - 1) temp = 0;
        paginationList.forEach((pagination, index) => {
            if (index === temp) {
                pagination.className = 'active';
                return;
            }
            pagination.className = '';
        })
    }

    const swiperInt = function swiperInt() {
        let clone = slideList[0].cloneNode(true);
        wrapper.appendChild(clone);
        count++;
        slideList.push(clone);
        wrapper.style.width = `${count * w}px`;

        if (step < 0) step = 0;
        if (step > count - 1) step = count - 1;
        wrapper.style.transitionDuration = '0ms';
        wrapper.style.left = `${-step * w}px`;
        atuoFocus();

    };
    //调用该方法
    swiperInt()

    /* 控制切换 */
    const moveToNext = function moveToNext() {
        step++;
        if (step > count - 1) {
            wrapper.style.transitionDuration = `0ms`;
            wrapper.style.left = `0`;
            step = 1;
            wrapper.offsetWidth;//获取元素样式，刷新渲染队列，让上列样式立即渲染一次
        }
        wrapper.style.transitionDuration = `${speed}ms`;
        wrapper.style.left = `${-step * w}px`;
        atuoFocus();
    }

    if (autoTimer === null) autoTimer = setInterval(moveToNext, interval);
    container.onmouseenter = function () {
        clearInterval(autoTimer);
        autoTimer = null;
    }

    container.onmouseleave = function () {
        if (autoTimer === null) {
            autoTimer = setInterval(moveToNext, interval);
        }
    }

    //页卡切换 轮播自动暂停/重启
    document.onvisibilitychange = function () {
        if (document.hidden) {
            clearInterval(autoTimer);
            autoTimer = null;
            return;
        }
        if (autoTimer === null) {
            autoTimer = setInterval(moveToNext, interval);
        }
    }

    //点击分页器切换
    //分页器循环
    paginationList.forEach((pagination, index) => {
        pagination.onmouseenter = function () {
            if (step === index) return;
            step = index;
            wrapper.style.transitionDuration = `${speed}ms`;
            wrapper.style.left = `${-step * w}px`;
            atuoFocus();
        }
    })

};
topScr()

// 下载游戏点击事件
const fn = (function () {
    let downLoadBtn = document.querySelector('.download-btn');
    let downLoadBg = document.querySelector('.download-bg');
    let diaClose = downLoadBg.querySelector('.dia-close');

    downLoadBtn.onclick = function () {
        downLoadBg.style.display = 'block';
    }
    diaClose.onclick = function () {
        downLoadBg.style.display = 'none';
    }
})()

//中间(热门-新闻-公告-活动-赛事)
const fn1 = (function () {
    let data = null,
        newSlide = document.querySelector('.newSlide-list'),
        tab = document.querySelector('.tab-hd'),
        tabList = tab.querySelectorAll('li'),
        liList = newSlide.querySelectorAll('.news-list');
    //获取数据
    const getData = function getData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/hot.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.response);
            }
        }
        xhr.send();
    };
    const render = function render() {
        liList.forEach((item, index) => {
            let str = '';
            data[index].forEach(item => {
                let { id, sName, title, time, href } = item;
                str += `<li ${+id === 1 ? 'class="line-sp"' : ''}>
            ${+id === 1 ? `<a href="${href}" target="_blank">
            <p>${title}</p>
            </a>` : `<a href="${href}" target="_blank">
            <span class="new-type">${sName}</span>
            <span>${title}</span>
        </a>`}
            ${+id === 1 ? '' : `<em>${time}</em>`}
        </li>`;
            });
            item.innerHTML = str;
            let newType = item.querySelectorAll('.new-type');

            newType.forEach(item => {
                let target = item.innerText;
                switch (target) {
                    case '热门': {
                        item.style.color = '#ff3636';
                        break;
                    };
                    case '活动': {
                        item.style.color = '#ff3636';
                        break;
                    };
                    case '公告': {
                        item.style.color = '#f4be19';
                        break;
                    };
                    case '新闻': {
                        item.style.color = '#1e96ab';
                        break;
                    };
                    case '赛事': {
                        item.style.color = '#4d9cff';
                        break;
                    };
                    default: break;
                };
            });
        });
    };
    //功能
    const rendle = function rendle() {
        let prev = tabList[0];
        prev.style.padding = "0";
        prev.style.borderBottom = '3px solid #f3c258';
        tabList.forEach((item, index) => {
            item.onmouseenter = function () {
                prev.style.padding = "3pxs";
                prev.style.borderBottom = '';
                item.style.padding = "0";
                item.style.borderBottom = '3px solid #f3c258';
                newSlide.style.left = `${-(index * 345)}px`;
                prev = item;
            };
        });
    };



    return {
        init() {
            getData();
            render();
            rendle();
        }
    }
})()
fn1.init();

//适龄提示点击事件
(function () {
    let shiling = document.querySelector('.shiling'),
        shilingBg = document.querySelector('.shiling-bg'),
        closeBtn = shilingBg.querySelector('.pop-close');
    shiling.onclick = function () {
        shilingBg.style.display = 'block';
    }
    closeBtn.onclick = function () {
        shilingBg.style.display = 'none';
    }
})()

//赛事中心
const fn2 = (function () {
    let items = document.querySelector('.item-head-nav'),
        alist = items.querySelectorAll('a'),
        // itemcons = document.querySelector('.item-count'),
        itemCon = document.querySelectorAll('.item-content');
    //matchCon = itemCon.querySelectorAll('.match_news')
    //获取数据
    let data = null;
    const getData = function getData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/riceCenter.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.response);
            }
        }
        xhr.send();
    }
    //渲染
    const render = function render() {

        itemCon.forEach((item, index) => {
            let str = '';
            str += `<div class="match_news">
            <div class="match_news-pic">
                <a href="https://pvp.qq.com/cp/a20220315open/" target="_blank">
                    <img src="${data[index].matchPic.img}" alt="">
                </a>
            </div>
            <ul>
            `;

            data[index].matchCon.forEach((item, index) => {
                let { title, title2, sname, time, href } = item;
                str += `
                <li ${index === 0 ? `class="line-sps"` : ""}>
                ${index !== 0 ? `<span>${sname}</span>` : ''}
                <a href="${href}" target="_blank">${title}</a>
                ${index === 0 ? `<a href="${href}" target="_blank">${title2}</a>` : ''}
                ${index !== 0 ? `<em>${time
                        }</em>` : ''}
            </li> `;
            });
            str += `</ul>
            </div>
            <ul>`;
            data[index].matchList.forEach(item => {
                let { pic, title, time, count, href } = item;
                str += `   
                    <li>
                        <a href="${href}" target="_blank">
                            <img src="${pic}" alt="">
                            <span>
                                <em>${count}</em>
                                <em>${time}</em>
                            </span>
                            <p>${title}</p>
                            <div class="mask-play-icos">
                                <span></span>
                            </div>
                        </a>
                    </li>`;
            })
            str += ` </ul>`
            item.innerHTML = str;
        });

    }
    //功能
    const rendle = function rendle() {
        let = prev = alist[0];
        prev.style.borderBottom = '3px solid #f3c258';
        prev.style.color = '#333333';
        let itemConPrev = itemCon[0];
        itemCon[0].style.display = "block";
        alist.forEach((item, index) => {
            item.onmouseenter = function () {
                if (item !== prev) {
                    item.style.borderBottom = '3px solid #f3c258';
                    item.style.color = '#333333';
                    itemCon[index].style.display = "block";
                    itemConPrev.style.display = "none";
                    prev.style.borderBottom = '';
                    prev.style.color = '#999';
                    prev = item;
                    itemConPrev = itemCon[index];
                }


            }
        })
    }
    return {
        init() {
            getData();
            render();
            rendle();
        }
    }

})()
fn2.init();

//内容中心
const fn3 = (function () {

    let itemSub = document.querySelector('.item-subnav'),
        aList = itemSub.querySelectorAll('a'),
        subnav2 = document.querySelector('.subnav-list2'),
        sublist = document.querySelectorAll('#navlist'),
        dropdown = subnav2.querySelector('.dropdown'),
        ulcon = document.querySelectorAll('.pic-list');


    let data = null;
    // 获取精品栏目数据
    const getData = function getData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/Jplm.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.response);
            }
        }
        xhr.send();
    }

    //二级选项--功能
    const render = function render() {
        //精品栏目 列表
        sublist.forEach((_, index) => {

            ulcon.forEach((item, i) => {
                if (data[index].length >= i + 1) {
                    let str = '';
                    str += `<ul>`
                    data[index][i].forEach(item => {
                        let { pic, title, snum, herf } = item;
                        str += `
                <li>
                <a href="${herf}" target="_blank">
                    <img src="${pic}" alt="">
                    <span>
                        <em>${snum}</em>
                    </span>
                    <span>${title}</span>
                    <div class="mask-pa">
                        <span></span>
                    </div>
                </a>
            </li>
                `;
                    });
                    str += `</ul>`;
                    item.innerHTML = str;
                }

            });
        });

    }
    //内容中心选项
    const rendle = function rendle() {
        aList[0].style.borderBottom = "3px solid #f3c258";
        aList[0].style.color = "#333333";
        let prev = aList[0];
        aList.forEach((item, index) => {

            item.onmouseenter = function () {
                if (prev !== item) {
                    prev.style.borderBottom = "";
                    prev.style.color = "#999";
                    item.style.borderBottom = "3px solid #f3c258";
                    item.style.color = "#333333";
                    prev = item;
                    sublist.forEach((item, j) => {
                        dropdown.style.display = 'none';
                        let alists = item.querySelectorAll('a');
                        if (index === j) {
                            item.style.display = 'block';
                            alists[0].className = 'on';
                            // ulcon[0].style.display = 'block';
                            let prev1 = alists[0],
                                prev2 = ulcon[0];
                            alists.forEach((item, index) => {
                                item.onmouseenter = function () {
                                    if (prev1 !== item) {
                                        prev1.className = '';
                                        item.className = 'on';
                                        ulcon[index].style.display = "block";
                                        prev2.style.display = "none";
                                        prev1 = item;
                                        prev2 = ulcon[index];
                                    }
                                }
                            });
                        } else {
                            alists.forEach(item => {
                                item.className = '';
                            });
                            ulcon.forEach(item => {
                                item.style.display = 'none';
                            })
                            alists[0].className = 'on';
                            ulcon[0].style.display = 'block';
                            item.style.display = 'none';
                        }
                    });
                }
            }
        });


        sublist.forEach(items => {
            let alists = items.querySelectorAll('a');
            alists[0].className = 'on';
            ulcon[0].style.display = 'block';
            let prev1 = alists[0],
                prev2 = ulcon[0];
            alists.forEach((item, index) => {

                item.onmouseenter = function () {
                    if (prev1 !== item) {
                        prev1.className = '';
                        item.className = 'on';
                        ulcon[index].style.display = "block";
                        prev2.style.display = "none";
                        prev1 = item;
                        prev2 = ulcon[index];
                    }
                }
            });
        });



    }

    return {
        init() {
            getData();
            rendle();
            render();

        }
    }
})();
fn3.init();

//英雄皮肤
const fn4 = (function () {
    let heronav = document.querySelector('.hero-subnav'),
        aList = heronav.querySelectorAll('a'),
        heroCard = document.querySelector('.hreo-wrap');

    aList[0].style.color = '#333333';
    aList[0].style.borderBottom = ' 3px solid #f3c258';
    prev = aList[0];
    aList.forEach((item, index) => {

        item.onmouseenter = function () {
            prev.style.color = '#999';
            prev.style.borderBottom = '';
            item.style.color = '#333333';
            item.style.borderBottom = ' 3px solid #f3c258';
            prev = item;
            heroCard.style.left = `${-index * 300}px`;
        }

    });

})();

//英雄列表
const fn5 = (function () {
    let data = null,
        subnav = document.querySelector('.subnav-list2'),
        heroSelect = subnav.querySelector('#title span'),
        dropdown = subnav.querySelector('.dropdown'),
        dropdown1 = subnav.querySelector('.dropdown1'),
        herolist = subnav.querySelectorAll('.hreo-nav li'),
        hero = subnav.querySelector('.hero-list');
    //获取数据
    const getData = function getData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/herolist.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.response);
            }
        }
        xhr.send();
    }
    //渲染页面
    const render = function render(i) {
        // console.log(data[index]);
        herolist.forEach((item, index) => {
            if (i !== index) hero.innerHTML = '';
            let str = '';
            data[i].forEach(item => {
                let { img, sname } = item;
                str += `<li>
                    <a>
                        <img src="${img}" alt="">
                                ${sname}
                    </a>
                </li>
                `;
            });
            hero.innerHTML = str;

        });
    }

    //功能
    const rendle = function rendle() {
        heroSelect.onmouseenter = function () {
            dropdown.style.display = 'block';
            render(0);

        }
        dropdown.onmouseleave = function () {
            dropdown.style.display = 'none';
        }

        herolist.forEach((item, index) => {
            item.onmouseenter = function () {
                render(index);
            }
        })
    }
    return {
        init() {
            getData();

            rendle();

        }
    }
})();
fn5.init();

//购票点击事件
(function () {
    let ticketsBg = document.querySelector('.tickets-bg'),
        close = ticketsBg.querySelector('.close'),
        ticketsbtn = document.querySelector('.tickets-shop');

    ticketsbtn.onclick = function () {
        ticketsBg.style.display = "block";
    }
    close.onclick = function () {
        ticketsBg.style.display = "none";
    }

})()