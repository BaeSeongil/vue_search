// 조직도 테스트용
const testData = [
    // 임원
    { department: '임원' },
    {
        department: '협업사업부',
        teams: [
            { team: 'SI팀' },
            { team: 'SM팀' },
            { team: '솔루션팀' },
            { team: '전문위원' }
        ]
    },
    { department: 'AI사업부' },
    { department: 'E-BIZ팀' },
    { department: '빅데이터그룹' }
]

const usersData = [
    // 임원
    {
        userGroup: '임원',
        user: [
            {
            userImg: '',
            userName: '박기정',
            userRole: 'COO',
            company: '새롬정보',
            userTeam: '임원',
            companyArea: '서울',
            userTel: '2105-2502',
            userPhone: '010-1234-5678',
            userMail: 'kjpark@saerom.co.kr',
            userWork: '기업형 솔루션 및 서비스 구축'
            },
            {
                userImg: '',
                userName: '진성철',
                userRole: 'CEO',
                company: '새롬정보',
                userTeam: '임원',
                companyArea: '서울',
                userTel: '02-2105-2502',
                userPhone: '010-1234-5678',
                userMail: 'jins@saerom.co.kr',
                userWork: '기업형 솔루션 및 서비스 구축'
            }
        ]
    },
    // 협업사업부
    {
        userGroup: '협업사업부',
        user: [
            {
                userImg: 'https://swg60.saerom.co.kr/dwp/com/portal/userphoto.nsf/photo/209003/$FILE/209003.jpg',
                userName: '박광순',
                userRole: '사업부장',
                company: '새롬정보',
                userTeam: '협업사업부',
                companyArea: '서울',
                userTel: '본사',
                userPhone: '010-1234-5678',
                userMail: 'parking7@saerom.co.kr',
                userWork: '기업형 솔루션 및 서비스 구축 총괄'
            },
            {
                userImg: '',
                userName: '김재환',
                userRole: '인턴',
                company: '새롬정보',
                userTeam: '협업사업부',
                companyArea: '서울',
                userTel: '02-2105-2500',
                userPhone: '010-1234-5678',
                userMail: 'kwoghks0213@saerom.co.kr',
                userWork: '기업형 솔루션 및 서비스 구축 총괄'
            },
        ],
        teams: [
            {
                userGroup: 'SI팀',
                user: [
                    {
                        userImg: '',
                        userName: 'gwadmin',
                        userRole: '수석',
                        company: '새롬정보',
                        userTeam: 'SI팀',
                        companyArea: '서울',
                        userTel: '02-2105-2500',
                        userPhone: '010-1234-5678',
                        userMail: 'ksisgwadmin@saerom.co.kr',
                        userWork: '기업형 솔루션 및 서비스 구축 총괄'
                    }
                ]
            },
            {
                userGroup: 'SM팀',
                user: [
                    {
                        userImg: '',
                        userName: '신용철',
                        userRole: '파트장',
                        company: '새롬정보',
                        userTeam: 'SM팀',
                        companyArea: '서울',
                        userTel: '02-2105-2500',
                        userPhone: '010-1234-5678',
                        userMail: 'dragon7s@saerom.co.kr',
                        userWork: '기업형 솔루션 및 서비스 구축 총괄'
                    },
                    {
                        userImg: 'https://swg60.saerom.co.kr/dwp/com/portal/userphoto.nsf/photo/213008/$FILE/213008.jpg',
                        userName: '문현일',
                        userRole: '수석',
                        company: '새롬정보',
                        userTeam: 'SM팀',
                        companyArea: '서울',
                        userTel: '02-2105-2500',
                        userPhone: '010-1234-5678',
                        userMail: 'himoon@saerom.co.kr',
                        userWork: '기업형 솔루션 및 서비스 구축 총괄'
                    }
                ]
            }
        ]
    }
]

// 테스트 데이터 (.group-area에 들어갈 데이터)
const departmentData = [
    {
        departmentName: '임원',
    },
    {
        departmentName: '협업사업부',
        teams: [
            'SI팀',
            'SM팀',
            '솔루션팀',
            '전문위원'
        ]
    },
    {
        departmentName: 'AI사업부',
        teams: [
            '아카이빙파트',
        ]
    },
    {
        departmentName: 'E-BIZ팀',
    },
    {
        departmentName: '빅데이터그룹',
    }
];

$('.org-area > ul').html('');

let departmentHtml = '';

for(let i=0; i < departmentData.length; i++) {
    // console.log(departmentData[i].teams)
    departmentHtml += '<li class="depth1-group">'
    departmentHtml +=   '<button type="button">'
    departmentHtml +=       '<span class="icon-area"></span>'
    departmentHtml +=       '<span class="group-area">'+ departmentData[i].departmentName +'</span>'
    departmentHtml +=   '</button>'
    if(departmentData[i].teams){ // 팀이 있을 경우
        departmentHtml +=   '<ul>'
        for(let j=0; j < departmentData[i].teams.length; j++){
            departmentHtml +=       '<li class="depth2-group">'
            departmentHtml +=           '<button type="button">'
            departmentHtml +=               '<span class="icon-area"></span>'
            departmentHtml +=               '<span class="group-area">'+ departmentData[i].teams[j] +'</span>'
            departmentHtml +=           '</button>'
            departmentHtml +=       '</li>'
        }
        departmentHtml +=   '</ul>'
    }
    departmentHtml += '</li>'
}
$('.org-area > ul').append(departmentHtml);

// 부서별 정보 가져오기
$('.org-area .depth1-group > button').on('click', function() {
    initUserInfo();

    // 아래쪽 테이블 초기화
    const departmentName = $(this).find('.group-area').text();

    $('.search-results .table-wrap tbody').html('');

    let updateExeInfoHtml = '';

    for(let i=0; i < usersData.length; i++) {
        if(usersData[i].userGroup == departmentName){
            for(let j = 0; j < usersData[i].user.length; j++){
                let user = usersData[i].user[j];
                user.userId = 'user_' + i + '_' + j; // 임시 고유 식별자 생성

                updateExeInfoHtml +=    '<tr data-user-id="' + user.userId + '">';
                updateExeInfoHtml +=        '<td>'+ usersData[i].user[j].userName +'</td>'
                updateExeInfoHtml +=        '<td>'+ usersData[i].user[j].userTeam +'</td>'
                updateExeInfoHtml +=        '<td>'+ usersData[i].user[j].userRole +'</td>'
                updateExeInfoHtml +=        '<td>'
                                                + usersData[i].user[j].userPhone + '<br>'
                                                + usersData[i].user[j].userTel +
                                            '</td>'
                updateExeInfoHtml +=    '</tr>'
            }
        }
    }
    $('.search-results .table-wrap tbody').append(updateExeInfoHtml);
});

// 팀별 정보 가져오기
$('.org-area .depth2-group > button').on('click', function() {
    initUserInfo();

    // 아래쪽 테이블 초기화
    const departmentName = $(this).find('.group-area').text();

    $('.search-results .table-wrap tbody').html('');

    let updateExeInfoHtml = '';

    for(let i=0; i < usersData.length; i++) {
        if(usersData[i].teams){
            for(let j=0; j < usersData[i].teams.length; j++){
                if(usersData[i].teams[j].userGroup == departmentName){
                    for(let k = 0; k < usersData[i].teams[j].user.length; k++){
                        let user = usersData[i].teams[j].user[k];
                        user.userId = 'user_' + i + '_' + j + '_' + k; // 임시 고유 식별자 생성

                        updateExeInfoHtml +=    '<tr data-user-id="' + user.userId + '">';
                        updateExeInfoHtml +=        '<td>'+ usersData[i].teams[j].user[k].userName +'</td>'
                        updateExeInfoHtml +=        '<td>'+ usersData[i].teams[j].user[k].userTeam +'</td>'
                        updateExeInfoHtml +=        '<td>'+ usersData[i].teams[j].user[k].userRole +'</td>'
                        updateExeInfoHtml +=        '<td>'
                                                        + usersData[i].teams[j].user[k].userPhone + '<br>'
                                                        + usersData[i].teams[j].user[k].userTel +
                                                    '</td>'
                        updateExeInfoHtml +=    '</tr>'
                    }
                }
            }
        }
    }
    $('.search-results .table-wrap tbody').append(updateExeInfoHtml);
});

$('.search-results .table-wrap tbody').on('click', 'tr', function() {
    initUserInfo();

    let dataUserId = $(this).data('user-id');

    // usersData배열에서 data-user-id와 일치하는 사용자 찾기
    let matchedUser = null;

    for(let i = 0; i < usersData.length; i++){
        if(usersData[i].teams){
            for(let j = 0; j < usersData[i].teams.length; j++){
                for(let k = 0; k < usersData[i].teams[j].user.length; k++){
                    if(usersData[i].teams[j].user[k].userId === dataUserId){
                        matchedUser = usersData[i].teams[j].user[k];
                        break;
                    }
                }
            }
        }
    }
    if(matchedUser){
        $('.user-info-area').html('');

        let userDetailHtml = '';

            userDetailHtml += '<div class="user">'
            userDetailHtml +=     '<div class="user-img">'
            if(matchedUser.userImg){
                userDetailHtml +=    '<img src="'+matchedUser.userImg+'" alt="">'
            }else{
                userDetailHtml +=    '<img src="https://swg60.saerom.co.kr/dwplibs/images/dummy/profile.png" alt="">'
            }
            userDetailHtml +=     '</div>'
            userDetailHtml +=     '<p class="user-name">'+ matchedUser.userName +'</p>'
            userDetailHtml +=     '<p class="team">'+ matchedUser.userRole +'</p>'
            userDetailHtml += '</div>'
            userDetailHtml += '<div class="info">'
            userDetailHtml +=     '<div class="top">'
            userDetailHtml +=         '<p class="company">'+ matchedUser.company +'</p>'
            userDetailHtml +=         '<p class="team">'+ matchedUser.userTeam +'</p>'
            userDetailHtml +=         '<p class="area">'+ matchedUser.companyArea +'</p>'
            userDetailHtml +=     '</div>'
            userDetailHtml +=     '<div class="bottom">'
            userDetailHtml +=         '<div>'
            userDetailHtml +=             '<a href="tel:'+ matchedUser.userTel +'" class="tel">'+ matchedUser.userTel +'</a>'
            userDetailHtml +=             '<a href="tel:'+ matchedUser.userPhone +'" class="phone">'+ matchedUser.userPhone +'</a>'
            userDetailHtml +=             '<a href="mailto:'+ matchedUser.userMail +'" class="mail">'+ matchedUser.userMail +'</a>'
            userDetailHtml +=         '</div>'
            userDetailHtml +=         '<div>'
            userDetailHtml +=             '<p>담당업무</p>'
            userDetailHtml +=             '<p class="work">'+ matchedUser.userWork +'</p>'
            userDetailHtml +=         '</div>'
            userDetailHtml +=     '</div>'
            userDetailHtml += '</div>'

            $('.user-info-area').append(userDetailHtml)
    }
});

$('.search-results .table-wrap tbody').on('click', 'tr', function() {
    initUserInfo();

    const test_userName = $(this).find('td').eq(0).text();

    $('.user-info-area').html('');

    for(let i = 0; i < usersData.length; i++){
        if(usersData[i].user){
            for(let j = 0; j < usersData[i].user.length; j++){
                if(usersData[i].user[j].userName === test_userName){
                    let userDetailHtml = '';

                    userDetailHtml += '<div class="user">'
                    userDetailHtml +=     '<div class="user-img">'
                    if(usersData[i].user[j].userImg){
                        userDetailHtml +=    '<img src="'+ usersData[i].user[j].userImg+'" alt="">'
                    }else{
                        userDetailHtml +=    '<img src="https://swg60.saerom.co.kr/dwplibs/images/dummy/profile.png" alt="">'
                    }
                    userDetailHtml +=     '</div>'
                    userDetailHtml +=     '<p class="user-name">'+ usersData[i].user[j].userName +'</p>'
                    userDetailHtml +=     '<p class="team">'+ usersData[i].user[j].userRole +'</p>'
                    userDetailHtml += '</div>'
                    userDetailHtml += '<div class="info">'
                    userDetailHtml +=     '<div class="top">'
                    userDetailHtml +=         '<p class="company">'+ usersData[i].user[j].company +'</p>'
                    userDetailHtml +=         '<p class="team">'+ usersData[i].user[j].userTeam +'</p>'
                    userDetailHtml +=         '<p class="area">'+ usersData[i].user[j].companyArea +'</p>'
                    userDetailHtml +=     '</div>'
                    userDetailHtml +=     '<div class="bottom">'
                    userDetailHtml +=         '<div>'
                    userDetailHtml +=             '<a href="tel:'+ usersData[i].user[j].userTel +'" class="tel">'+ usersData[i].user[j].userTel +'</a>'
                    userDetailHtml +=             '<a href="tel:'+ usersData[i].user[j].userPhone +'" class="phone">'+ usersData[i].user[j].userPhone +'</a>'
                    userDetailHtml +=             '<a href="mailto:'+ usersData[i].user[j].userMail +'" class="mail">'+ usersData[i].user[j].userMail +'</a>'
                    userDetailHtml +=         '</div>'
                    userDetailHtml +=         '<div>'
                    userDetailHtml +=             '<p>담당업무</p>'
                    userDetailHtml +=             '<p class="work">'+ usersData[i].user[j].userWork +'</p>'
                    userDetailHtml +=         '</div>'
                    userDetailHtml +=     '</div>'
                    userDetailHtml += '</div>'

                    $('.user-info-area').append(userDetailHtml)
                }
            }
        }
        if (usersData[i].teams) {
            for(let j = 0; j < usersData[i].teams.length; j++){
                for(let k = 0; k < usersData[i].teams[j].user.length; k++){
                    if(usersData[i].teams[j].user[k].userName === test_userName){
                        let userDetailHtml = '';

                        userDetailHtml += '<div class="user">'
                        userDetailHtml +=     '<div class="user-img">'
                        if(usersData[i].teams[j].user[k].userImg){
                            userDetailHtml +=    '<img src="'+ usersData[i].teams[j].user[k].userImg+'" alt="">'
                        }else{
                            userDetailHtml +=    '<img src="https://swg60.saerom.co.kr/dwplibs/images/dummy/profile.png" alt="">'
                        }
                        userDetailHtml +=     '</div>'
                        userDetailHtml +=     '<p class="user-name">'+ usersData[i].teams[j].user[k].userName +'</p>'
                        userDetailHtml +=     '<p class="team">'+ usersData[i].teams[j].user[k].userRole +'</p>'
                        userDetailHtml += '</div>'
                        userDetailHtml += '<div class="info">'
                        userDetailHtml +=     '<div class="top">'
                        userDetailHtml +=         '<p class="company">'+ usersData[i].teams[j].user[k].company +'</p>'
                        userDetailHtml +=         '<p class="team">'+ usersData[i].teams[j].user[k].userTeam +'</p>'
                        userDetailHtml +=         '<p class="area">'+ usersData[i].teams[j].user[k].companyArea +'</p>'
                        userDetailHtml +=     '</div>'
                        userDetailHtml +=     '<div class="bottom">'
                        userDetailHtml +=         '<div>'
                        userDetailHtml +=             '<a href="tel:'+ usersData[i].teams[j].user[k].userTel +'" class="tel">'+ usersData[i].teams[j].user[k].userTel +'</a>'
                        userDetailHtml +=             '<a href="tel:'+ usersData[i].teams[j].user[k].userPhone +'" class="phone">'+ usersData[i].teams[j].user[k].userPhone +'</a>'
                        userDetailHtml +=             '<a href="mailto:'+ usersData[i].teams[j].user[k].userMail +'" class="mail">'+ usersData[i].teams[j].user[k].userMail +'</a>'
                        userDetailHtml +=         '</div>'
                        userDetailHtml +=         '<div>'
                        userDetailHtml +=             '<p>담당업무</p>'
                        userDetailHtml +=             '<p class="work">'+ usersData[i].teams[j].user[k].userWork +'</p>'
                        userDetailHtml +=         '</div>'
                        userDetailHtml +=     '</div>'
                        userDetailHtml += '</div>'

                        $('.user-info-area').append(userDetailHtml)
                    }
                }
            }
        }
    }
});

function initUserInfo() {
    // 위쪽 유저 정보 초기화
    $('.user-info-area').html('');

    let initExeInfoHtml = '';
    initExeInfoHtml +=     '<p>이름을 클릭하시면 상세정보가 제공됩니다.</p>'

    $('.user-info-area').append(initExeInfoHtml)
}