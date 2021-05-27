// 모든 애니메이션에 대한 정보를 배열에 담기위해 배열만듬
// 함수 만들어서 자동으로 즉시 호출.
// (function() {})(); 이거랑 같다.
(() => {
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
        console.log(sceneInfo);
    }
    // 사이즈 바뀌면 레이아웃도 적용되도록!
    window.addEventListgitener('resize', setLayout);

    setLayout();
})();