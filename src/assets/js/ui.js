document.addEventListener('DOMContentLoaded', function() {
    tabControl();
    updateImageSrc();

    // 사용자 디바이스 체크
    function checkIfMobile() {
        const { userAgent, maxTouchPoints } = window.navigator;

        const isMac = /Macintosh/i.test(userAgent);

        if(isMac && maxTouchPoints > 0) return true;

        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi|mobi/i.test(userAgent);
    }
    let isMobile = checkIfMobile();

    if(window.innerWidth <= 1280){
        if(isMobile){
            isMobile = true; // 모바일
        }else{
            isMobile = false; // pc
        }
    }
    // console.log(isMobile);
    applyTheme();

    function logoInit() {
        const navSideWrap = document.querySelector('.nav-side-wrap');
        const logo = document.querySelector('.nav-logo img');
        const isActive = navSideWrap.classList.contains('active');
        const isMobile = window.innerWidth <= 1024;

        if(isMobile || !isActive){
            logo.src = '../images/common/img_logo_mo.svg';
        }else{
            logo.src = '../images/common/img_logo.svg';
        }
    }
    logoInit();

    // 서브 네비게이션 스크립트
    const navMenuWrap = document.querySelector('.nav-menu-wrap');
    const menuItems = document.querySelectorAll('.nav-menu-area a');
    const subMenuWrap = document.querySelector('.sub-menu-wrap');
    const subMenus = document.querySelectorAll('.sub-menu');

    function showSubMenu(element) {
        let isSubMenu = false;

        const menuId = element.parentElement.getAttribute('data-menu');
        const activeSubMenu = document.getElementById(menuId);

        clearActiveClass();

        if(activeSubMenu){
            subMenuWrap.classList.add('active');
            element.parentElement.classList.add('active');
            activeSubMenu.classList.add('active');
            isSubMenu = true;
        }else{
            subMenuWrap.classList.remove('active');
            if(activeSubMenu){
                activeSubMenu.classList.remove('active');
            }
            isSubMenu = false;
        }

        // 부모 요소 인덱스 구하기
        const parentIndex = Array.from(element.parentElement.parentElement.children).indexOf(element.parentElement);

        if(parentIndex >= 3 && window.innerWidth >= 1280){
            subMenuWrap.classList.add('bottom')
        }else{
            subMenuWrap.classList.remove('bottom')
        }
    }

    // mouseover event(PC)
    function handleMouseOver() {
        if(isMobile) return;

        showSubMenu(this);
        isSubMenu = true;
        // console.log('함수실행중')
    }

    // mouseleave event
    function handleMouseLeave() {
        subMenuWrap.classList.remove('active');
        clearActiveClass();
        isSubMenu = false;
    }

    // click event(tablet)
    function handleClick(event) {
        const parentElement = event.currentTarget.parentNode;
        const menuId = parentElement.getAttribute('data-menu');
        if(isMobile || window.innerWidth <= 1280){
            // 링크 이동 허용 조건
            if(menuId === 'menu1' || menuId === 'menu2') {
                return;
            }else{
                event.preventDefault();
                showSubMenu(this);
            }
        }
    }

    // 활성화 클래스 초기화
    function clearActiveClass() {
        subMenus.forEach(sub => sub.classList.remove('active')); // 투뎁스 메뉴 숨기기
        menuItems.forEach(menuItem => menuItem.parentElement.classList.remove('active')); // 원뎁스 active 비활성화 하기
    }

    menuItems.forEach(item => {
        item.addEventListener('mouseover', handleMouseOver);
        item.addEventListener('click', handleClick);
    });
    subMenuWrap.addEventListener('mouseleave', handleMouseLeave);
    navMenuWrap.addEventListener('mouseleave', handleMouseLeave);

    window.addEventListener('resize', function() {
        updateImageSrc();
        logoInit();
    });

    // 조직도 스크립트
    const depth1Groups = document.querySelectorAll('.org-area .depth1-group');

    depth1Groups.forEach(depth1Group => {
        const dep1Btn = depth1Group.querySelector('button');
        const dep1Ul = depth1Group.querySelector('ul');
        dep1Btn.addEventListener('click', function() {
            if(dep1Ul){
                dep1Ul.classList.toggle('active');
            }
            depth1Group.classList.toggle('active', dep1Ul && dep1Ul.classList.contains('active'));
        });

        depth1Group.classList.toggle('active', dep1Ul && dep1Ul.classList.contains('active'));
    });

    const depth2Groups = document.querySelectorAll('.org-area .depth2-group');

    depth2Groups.forEach(depth2Group => {
        const dep2Btn = depth2Group.querySelector('button');
        const dep2Ul = depth2Group.querySelector('ul');

        dep2Btn.addEventListener('click', function() {
            if(dep2Ul){
                dep2Ul.classList.toggle('active');
            }
        });
    });

    // 서브페이지
    const btnMenuClose = document.querySelector('.btn-menu-close');
    const subpageMenuWrap = document.querySelector('.subpage-menu-wrap');
    const subPage = document.getElementById('subPage');
    const btnMenuOpen = document.querySelector('.btn-open');

    btnMenuClose.addEventListener('click', function() {
        subpageMenuWrap.classList.remove('active');
        subPage.classList.remove('active');
        btnMenuOpen.style.display = 'block';
    });

    btnMenuOpen.addEventListener('click', function() {
        subpageMenuWrap.classList.add('active');
        subPage.classList.add('active');
        btnMenuOpen.style.display = 'none';
    });

    const depth1 = document.querySelectorAll('.depth1');

    depth1.forEach(dep1 => {
        const dep1Btn = dep1.querySelector('a');

        dep1Btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
        });
    })

    const depth2Li = document.querySelectorAll('.depth2 > li');

    depth2Li.forEach(dep2Li => {
        if(dep2Li.querySelector('.btn-sub-open')){
            const btnSubOpen = dep2Li.querySelector('.btn-sub-open');

            btnSubOpen.addEventListener('click', function() {
                this.closest('li').classList.toggle('active');
            });
        }
    });

    const btnPaginations = document.querySelectorAll('.table-bottom .pagination > li > button');

    btnPaginations.forEach((btnPagination, idx) => {
        btnPagination.addEventListener('click', function() {
            if(idx !== 0 && idx !== btnPaginations.length - 1) {
                btnPaginations.forEach(otherBtn => otherBtn.parentElement.classList.remove('active'));
                this.parentElement.classList.add('active');
            }
        });
    });

    // 페이지네이션
    const paginationBtn = document.querySelectorAll('.pagination > button');

    paginationBtn.forEach(btn => {
        btn.addEventListener('click', function(event){
            paginationBtn.forEach(otherBtn => otherBtn.classList.remove('active'));
            event.currentTarget.classList.add('active');
        });
    });

    // 인풋 포커스
    const inputBoxes = document.querySelectorAll('.input-box');

    inputBoxes.forEach(inputBox => {
        const inputs = inputBox.querySelectorAll('input');

        inputs.forEach(input => {
            input.addEventListener('focusin', function(){
                inputBox.classList.add('focusin');
            });
        });

        inputs.forEach(input => {
            input.addEventListener('focusout', function(){
                inputBox.classList.remove('focusin');
            });
        });
    });
});

let isDarkMode = false;

// 다크모드 관련 함수
function applyTheme() {
    const themeStyleFiles = document.querySelectorAll('.theme-style');
    // 테마 적용 함수
    function setThemeStyles(theme) {
        document.querySelector('body').setAttribute('data-theme', theme);

        themeStyleFiles.forEach(file => {
            if(theme === 'dark-mode'){
                file.href = file.href.replace('.css', '_dark.css');
            } else {
                file.href = file.href.replace('_dark.css', '.css');
            }
        });
        updateThemeStylesImages(theme);
    }

    // 로컬 스토리지에서 테마 가져오기
    let storedTheme = localStorage.getItem('theme');
    if(storedTheme && !storedTheme.includes('mode')) {
        storedTheme += '-mode';
    }

    if(storedTheme){
        setThemeStyles(storedTheme);
        isDarkMode = (storedTheme === 'dark-mode');
    }else{
        isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; // 브라우저 테마 체크
        setThemeStyles(isDarkMode ? 'dark-mode' : 'light-mode');
    }

    const toggleSwitch = document.querySelector('.toggle-switch');

    // 초기 토글 버튼 상태 설정
    if(toggleSwitch){
        toggleSwitch.checked = (storedTheme === 'dark-mode' || (!storedTheme && isDarkMode));

        toggleSwitch.addEventListener('change', function(){
            if(this.checked){
                setThemeStyles('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
                isDarkMode = true;
            }else{
                setThemeStyles('light-mode');
                localStorage.setItem('theme', 'light-mode');
                isDarkMode = false;
            }
        });
    }


    // 다크모드 이미지 변경
    function updateThemeStylesImages(theme){
        const screenModeImg = document.querySelectorAll('.screen-mode-img');

        screenModeImg.forEach(img => {
            let src = img.src;
            if(theme === 'dark-mode'){
                if(!src.includes('_dark.svg')){
                    img.src = src.replace('.svg', '_dark.svg');
                }
            } else {
                img.src = src.replace('_dark.svg', '.svg');
            }
        });
    }

    const btnNoti = document.querySelector('.btn-noti');
    const notiBox = document.querySelector('.noti-box-wrap');

    btnNoti.addEventListener('mouseover', function(){
        if(isDarkMode){
            btnNoti.querySelector('img').src = '../images/common/icon_noti.svg';
        }
    });

    btnNoti.addEventListener('mouseleave', function(){
        if(isDarkMode){
            btnNoti.querySelector('img').src = btnNoti.classList.contains('active')
                ? '../images/common/icon_noti.svg'
                : '../images/common/icon_noti_dark.svg';
        }
    });

    btnNoti.addEventListener('click', function(){
        btnNoti.classList.add('active');
        notiBox.classList.add('active');
    });

    const btnClose = document.querySelector('.btn-close');

    btnClose.addEventListener('click', function(){
        btnNoti.classList.remove('active');
        notiBox.classList.remove('active');
        if(isDarkMode){
            btnNoti.querySelector('img').src = '../images/common/icon_noti_dark.svg';
        }
    });
}

// 브라우저 테마 변경 감지
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    applyTheme();
});

function btnOpenToggle(element) {
    if(element.closest('.nav-side-wrap')){
        const navSideWrap = document.querySelector('.nav-side-wrap');
        const logo = document.querySelector('.nav-logo img');
        const main = document.getElementById('main');

        if(window.innerWidth >= 1024){
            navSideWrap.classList.toggle('active');
            main.classList.toggle('active');

            if(navSideWrap.classList.contains('active')){
                logo.src = '../images/common/img_logo.svg';
            }else{
                logo.src = '../images/common/img_logo_mo.svg';
            }
        }else{
            navSideWrap.classList.add('active');
            main.classList.add('active');
        }
    }else if(element.closest('.mode-right-wrap')){

    }
}

// 탭 스크립트
function tabControl(){
    const tabMenus = document.querySelectorAll('.tab-menu');
    const tabContents = document.querySelectorAll('.tab-contents');

    tabMenus.forEach((tabMenu, tabMenuIdx) => {
        const tabBtns = tabMenu.querySelectorAll('button');
        const tabs = tabContents[tabMenuIdx].querySelectorAll('.tab-contents > *');

        tabBtns.forEach((btn, btnIdx) => {
            btn.addEventListener('click', function(){
                const menuItems = tabMenu.querySelectorAll('.tab-menu > li');

                menuItems.forEach(item => {
                    item.classList.remove('active');
                });
                btn.parentElement.classList.add('active');

                tabs.forEach((tab, tabIdx) => {
                    tab.classList.remove('active');
                    if(btnIdx === tabIdx){
                        tab.classList.add('active');
                    }
                });
            });
        });
    });
}

// 내정보 편집
function myInfoEdit() {
    const infoWrap = document.querySelector('.myinfo-container .info-wrap');
    const infoTextEdit = infoWrap.querySelectorAll('.inputbox');
    const infoSelectEdit = infoWrap.querySelectorAll('.selectbox');
    const infoTextareaEdit = infoWrap.querySelectorAll('.textareabox');

    // input 태그로 변경
    infoTextEdit.forEach(el => {
        const input = document.createElement('input');

        input.setAttribute('type', 'text');
        input.setAttribute('value', el.textContent);
        el.textContent = '';
        el.appendChild(input);
    });

    // select 태그로 변경
    infoSelectEdit.forEach(el => {
        const th = el.parentElement.querySelector('.th').textContent.trim();

        if(th === '국가/사업장'){
            const select = document.createElement('select');
            const options = [];

            if(el.classList.contains('sm')){
                // 국가
                select.setAttribute('name', 'COUNTRY');
                select.classList.add('lg');

                options.push (
                    { text: '한국', value: 'ko' },
                    { text: '중국', value: 'zh' },
                    { text: '기타', value: '0' }
                );
            }else if(el.classList.contains('md')){
                // 사업장
                select.setAttribute('name', 'ClassCode');
                select.classList.add('lg');

                options.push (
                    { text: '사무실 위치' },
                    { text: '서울', value: '0001' },
                );
            }

            options.forEach(opt => {
                const option = document.createElement('option');

                option.textContent = opt.text;
                if(opt.value){
                    option.setAttribute('value', opt.value);
                }
                if(opt.text.trim() === el.textContent.trim()){
                    option.setAttribute('selected', 'selected');
                }
                select.appendChild(option);
            });

            el.textContent = '';
            el.appendChild(select);

        }else if(th === '근무시간'){
            const select = document.createElement('select');

            select.setAttribute('name', 'WorkHour');
            select.classList.add('lg');

            const options = [
                { text: '08:00 ~ 17:00', value: '08001700' },
                { text: '09:00 ~ 18:00', value: '09001800' },
                { text: '10:00 ~ 19:00', value: '10001900' }
            ];

            options.forEach(opt => {
                const option = document.createElement('option');
                option.textContent = opt.text;
                if(opt.value){
                    option.setAttribute('value', opt.value);
                }
                if(opt.text.trim() === el.textContent.trim()){
                    option.setAttribute('selected', 'selected');
                }
                select.appendChild(option);
            });

            el.textContent = '';
            el.appendChild(select);
        }
    });

    // textarea 태그로 변경
    infoTextareaEdit.forEach(el => {
        const textarea = document.createElement('textarea');

        textarea.setAttribute('name', 'WorkDetail');
        textarea.textContent = el.textContent;
        textarea.setAttribute('rows', '5');
        el.textContent = '';
        el.appendChild(textarea);
    });

    // 편집 버튼
    const btnEdit = document.querySelector('.btn.lg.white');
    btnEdit.style.display = 'none';

    let buttonCreateHtml = '';

    buttonCreateHtml += '<button type="button" class="btn md purple">확인</button>'
    buttonCreateHtml += '<button type="button" class="btn md white" onclick="btnCloseClick(this);">취소</button>'

    $('.myinfo-container .btn-wrap').append(buttonCreateHtml);
}

// 모달 스크립트
function modalOpenClick(element) {
    const modalsWrap = document.querySelector('.modals-wrap');
    const modalId = element.getAttribute('data-modal');
    const modal = document.getElementById(modalId);

    if(modal){
        modalsWrap.style.display = 'block';
        modal.classList.add('active');
    }
}

function btnCloseClick(element) {
    const modalsWrap = document.querySelector('.modals-wrap');
    const parentBoxWrap = element.closest('.modal');

    if(parentBoxWrap){
        modalsWrap.style.display = 'none';
        parentBoxWrap.classList.remove('active');
    }

    // 취소버튼일 경우 페이지 리로드
    const btnCancel = document.querySelectorAll('.btn.cancel');

    btnCancel.forEach(btn => {
        if(element === btn){
            window.location.reload();
        }
    });
}

// 파일 이미지 미리보기
function readURL(input) {
    if(input.files && input.files[0]){
        let reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }else{
        document.getElementById('preview').src = "";
    }
}

function updateImageSrc() {
    const imgChange = document.querySelectorAll('.img-change');
    let windowWidth = window.innerWidth;

    // pc -> 모바일 이미지 변경
    imgChange.forEach(img => {
        let src = img.getAttribute('src');

        if(windowWidth <= 1280){
            if(!src.includes('_mo')) {
                const extensionIndex = src.lastIndexOf('.');
                const newSrc = src.slice(0, extensionIndex) + '_mo' + src.slice(extensionIndex);

                img.setAttribute('src', newSrc);
            }
        }else{
            if(src.includes('_mo')) {
                const newSrc = src.replace('_mo', '');
                img.setAttribute('src', newSrc);
            }
        }
    });

    // hover 이미지 변경
    const imgHoverBox = document.querySelectorAll('.img-hover');

    imgHoverBox.forEach(box => {
        const img = box.querySelector('img');
        const src = img.getAttribute('src');
        const extensionIndex = src.lastIndexOf('.');

        if(!src.includes('_active')){
            box.addEventListener('mouseover', function(){
                img.setAttribute('src', src.slice(0, extensionIndex) + '_active' + src.slice(extensionIndex));
            });
        }
        box.addEventListener('mouseleave', function(){
            img.setAttribute('src', src.replace('_active', ''));
        });
    });

    // 다크모드 - hover 이미지 변경
    const imgHoverBox_dark = document.querySelectorAll('.img-hover-dark');

    imgHoverBox_dark.forEach(box => {
        const img = box.querySelector('img');
        const src = img.getAttribute('src');

        box.addEventListener('mouseover', function() {
            if(isDarkMode){
                img.src = src.replace('_dark.svg', '.svg');
            }
        });

        box.addEventListener('mouseleave', function() {
            if(isDarkMode){
                img.src = src.includes('_dark.svg')
                    ? src
                    : src.replace('.svg', '_dark.svg');
            }
        });
    });
}