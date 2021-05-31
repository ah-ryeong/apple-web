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
            },
            values : {
                // 변화를 줄때 css값을 변하게 해줄거니까 여기다가 어떤 값을 줄것인지 정의
                // 투명도랑 위치(y값) 바뀜 (2가지)
                messageA_opacity : [0, 1] // 배열로 시작과 끝 값을 줌
            }
        },
        {
            // 1
            type: 'nomal',
            heightNum: 5, 
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
                container: document.querySelector('#scroll-section-2')
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

    function setLayout() {
        // 각 스크롤 섹션의 높이를 셋팅함
        for(let i = 0; i < sceneInfo.length; i ++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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
    }

    // values : opacity 값 0, 1 그 배열이 들어갈거임
    // 현재 스크롤이 얼만큼 됐는지의 값이 필요함 -> 비율로 구해야 편함
    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤 된 범위를 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        
        rv = scrollRatio * (values[1] - values[0]) + values[0]; 
        
        return rv;
    }

    // scrollLoop 너무 길어서 애니메이션처리 따로 빼줌
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        
        // console.log(currentScene, currentYOffset);
        console.log(currentScene);

        // 스크롤 될 때, 눈에 보이는 부분만 애니메이션 처리 할거임
        switch (currentScene) {
            case 0:
                // console.log('0 play');
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                // console.log(messageA_opacity_in);
                // 위 결과 값으로 css 세팅
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log(messageA_opacity_in);

                break;

                case 1:
                // console.log('1 play');
                break;

                case 2:
                // console.log('2 play');
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
    
    window.addEventListener('load', setLayout);
    // 사이즈 바뀌면 레이아웃도 적용되도록!
    window.addEventListener('resize', setLayout);

})();