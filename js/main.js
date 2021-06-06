// 모든 애니메이션에 대한 정보를 배열에 담기위해 배열만듬
// 함수 만들어서 자동으로 즉시 호출.
// (function() {})(); 이거랑 같다.
(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) 씬(scroll-section)
    let enterNewScene = false; // 새로운 신이 시작된 순간 true

    // 전역변수 사용을 피하기 위해 사용했음, js 에서 전역변수 사용은 바람직X
    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            //스크롤 높이(스크립트로 미리 잡아줌)
            // 여러가지 디바이스로 열 수 있기 때문에 미리 숫자로 지정X, 다른 곳에서 지정해줌
            scrollHeight: 0, 
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
                // canvas 엘리먼트 가져옴
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                // 배열에 이미지를 넣을거임
                videoImages: [],
            },
            values : {
                videoImageCount: 147, // 이미지 갯수
                imageSequence: [0, 146], // 이미지 순서
                canvas_opacity: [1, 0, {start: 0.9, end: 1}],
                // 변화를 줄때 css값을 변하게 해줄거니까 여기다가 어떤 값을 줄것인지 정의
                // 투명도랑 위치(y값) 바뀜 (2가지)
                // start, and : 애니메이션이 재생되는 구간을 설정, 비율로 했기 때문에 소수점으로 지정
                messageA_opacity_in : [0, 1, {start : 0.1, end : 0.2}], // 배열로 시작과 끝 값을 줌
                messageB_opacity_in : [0, 1, {start : 0.3, end : 0.4}],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in : [20, 0, {start: 0.1, end: 0.2}],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out : [1, 0, {start : 0.25, end : 0.3}], 
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out : [0, -20, {start: 0.25, end: 0.3}],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {
            // 1
            type: 'nomal',
            // heightNum: 5, // type normal에서는 필요X
            scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin'),
                // canvas 엘리먼트 가져옴
                canvas: document.querySelector('#video-canvas-1'),
                context: document.querySelector('#video-canvas-1').getContext('2d'),
                // 배열에 이미지를 넣을거임
                videoImages: [],
            },
            values: {
                videoImageCount: 132, // 이미지 갯수
                imageSequence: [0, 131], // 이미지 순서
                canvas_opacity_in: [0, 1, {start: 0, end: 0.1}],
                canvas_opacity_out: [1, 0, {start: 0.95, end: 1}],
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
                messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
                messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
                messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
                messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
                pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setCanvasImages() {
        let imgElem;
        // 캔버스에 그려서 처리할 이미지 셋팅
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image();
            imgElem.src = `./video/001/${1 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        let imgElem2;
        // 캔버스에 그려서 처리할 이미지 셋팅
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image();
            imgElem2.src = `./video/002/${1 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }
    }
    setCanvasImages();

    function setLayout() {
        // 각 스크롤 섹션의 높이를 셋팅함
        for(let i = 0; i < sceneInfo.length; i ++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === 'nomal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        
        // currentScene setting
        yOffset = window.pageYOffset;

        let totalScrollHeight = 0;
        for(let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);

        // windowInner height랑 사이즈 비교해보면됨
        const heightRatio = window.innerHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform =`translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform =`translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    // values : opacity 값 0, 1 그 배열이 들어갈거임
    // 현재 스크롤이 얼만큼 됐는지의 값이 필요함 -> 비율로 구해야 편함
    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤 된 범위를 구하기
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;

        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            // 시작점 구하기
            const partScrollStart = values[2].start * scrollHeight;
            // 끝나는 지점
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]; 
            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if(currentYOffset > partScrollEnd) {
                rv = values[1];
            }

        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0]; 
        }
        
        return rv;
    }

    // scrollLoop 너무 길어서 애니메이션처리 따로 빼줌
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        // 현재 씬의 scrollHeight
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight; // yOffset/현재 씬의 scrollHeigh;
        
        // console.log(currentScene, currentYOffset);
        // console.log(currentScene);

        // 스크롤 될 때, 눈에 보이는 부분만 애니메이션 처리 할거임
        switch (currentScene) {
            case 0:
                // console.log('0 play');
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                // console.log(sequence);
                // 캔버스에 그려줌
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

                if (scrollRatio <= 0.22) {
                    // in
                    // 위 결과 값으로 css 세팅
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
                
                break;

                // case 1: // normal이라 여기서 작업할게 없어서 빼도 됨
                // // console.log('1 play');
                // break;

                case 2:
                // console.log('2 play');
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                // 캔버스에 그려줌
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
                
                if (scrollRatio <= 0.5) {
                    // in
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
                } else {
                    // out
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                }
                
                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
    
                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    // objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    // objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
    
                break;

                case 3:
                // console.log('3 play');
                break;
        }
    }

    function scrollLoop() {
        enterNewScene= false;
        // 현재 스크롤 한 위치 window.pageYOffset이 값을 변수에 담아서 쓸거임
        // 상황에 따라 값을 넣을 수 있고 다른 계산을 하기 위해서 변수에 담을거
        // console.log(window.pageYOffset);

        prevScrollHeight = 0;

        // 활성화 시킬 씬의 번호를 결정해야함
        for (let i = 0; i < currentScene; i++)  {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(yOffset < prevScrollHeight){
            enterNewScene = true;
            if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        // console.log("씬 확인" + currentScene);

        // 씬이 바뀌는 순간 이상한 값이 들어가면 함수가 종료되면서 playanimation 한턴 걸러짐
        if (enterNewScene) return;
        // 애니메이션 처리
        playAnimation();
    }
    
    window.addEventListener('scroll', () => {
        
        yOffset = window.pageYOffset;
        // 스크롤 하면 실행되는 함수
        scrollLoop();
    });
    
    window.addEventListener('load', () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });
    // 사이즈 바뀌면 레이아웃도 적용되도록!
    window.addEventListener('resize', setLayout);
})();