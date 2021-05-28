// 모든 애니메이션에 대한 정보를 배열에 담기위해 배열만듬
// 함수 만들어서 자동으로 즉시 호출.
// (function() {})(); 이거랑 같다.
(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) 씬(scroll-section)

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
                container: document.querySelector('#scroll-section-0')
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
        // console.log(sceneInfo);
    }

    function scrollLoop() {
        // 현재 스크롤 한 위치 window.pageYOffset이 값을 변수에 담아서 쓸거임
        // 상황에 따라 값을 넣을 수 있고 다른 계산을 하기 위해서 변수에 담을거
        // console.log(window.pageYOffset);

        prevScrollHeight = 0;

        // 활성화 시킬 씬의 번호를 결정해야함
        for (let i = 0; i < currentScene; i++)  {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }

        if(yOffset < prevScrollHeight){
            if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지
            currentScene--;
        }

        console.log("씬 확인" + currentScene);
    }
    
    // 사이즈 바뀌면 레이아웃도 적용되도록!
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        
        yOffset = window.pageYOffset;
        // 스크롤 하면 실행되는 함수
        scrollLoop();
    });

    setLayout();
})();