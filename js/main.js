document.addEventListener('DOMContentLoaded', function() {
    // flatpickr 초기화
    flatpickr("#dispatchDateTime", {
        wrap: true,
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
        locale: "ko"
    });

    // 글자수 제한 필드 설정
    const fieldsToTrack = [
        { id: 'clientName', maxLength: 30 },
        { id: 'salesManager', maxLength: 30 },
        { id: 'clientRequester', maxLength: 30 },
        { id: 'requesterPhone', maxLength: 11 },
        { id: 'requesterEmail', maxLength: 30 },
        { id: 'eventName', maxLength: 50 },
        { id: 'mmsTitle', maxLength: 20 },
        { id: 'mmsContent', maxLength: 200 },
        { id: 'senderPhone', maxLength: 11 }
    ];

    fieldsToTrack.forEach(field => {
        const inputElement = document.getElementById(field.id);
        const feedbackElement = document.getElementById(`${field.id}-feedback`);
        if (inputElement && feedbackElement) {
            // 초기 글자수 표시
            updateCharCount(inputElement, feedbackElement);
            // 입력 시 글자수 업데이트
            inputElement.addEventListener('input', () => updateCharCount(inputElement, feedbackElement));
        }
    });

    // 이메일 유효성 검사
    const emailInput = document.getElementById('requesterEmail');
    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
    }

    // 배너 이미지 사용 여부 체크박스 로직
    const useBannerCheckbox = document.getElementById('useBannerImage');
    const bannerImageInput = document.getElementById('bannerImage');

    if (useBannerCheckbox && bannerImageInput) {
        useBannerCheckbox.addEventListener('change', function() {
            // 체크박스가 선택되면 파일 입력을 활성화하고, 그렇지 않으면 비활성화합니다.
            bannerImageInput.disabled = !this.checked;
        });
    }


});

/**
 * 입력 필드의 글자 수를 세어 피드백 요소에 표시하는 함수
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement - 글자 수를 셀 입력 요소
 * @param {HTMLElement} feedbackElement - 글자 수를 표시할 요소
 */
function updateCharCount(inputElement, feedbackElement) {
    const currentLength = inputElement.value.length;
    const maxLength = inputElement.maxLength;
    feedbackElement.textContent = `${currentLength} / ${maxLength}`;
}

/**
 * 이메일 입력 필드의 유효성을 검사하고 피드백을 표시하는 함수
 */
function validateEmail() {
    const emailInput = document.getElementById('requesterEmail');
    const feedbackElement = document.getElementById('requesterEmail-feedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput.value)) {
        feedbackElement.textContent = '유효한 이메일 형식입니다.';
        feedbackElement.style.color = 'green';
    } else if (emailInput.value === '') {
        // 이메일 필드가 비어있을 때는 원래 글자수 카운터로 되돌림
        updateCharCount(emailInput, feedbackElement);
        feedbackElement.style.color = ''; // 기본 색상으로
    } else {
        feedbackElement.textContent = '유효하지 않은 이메일 형식입니다.';
        feedbackElement.style.color = 'red';
    }
}


// 가상의 상품 데이터
const sampleProducts = [
    { name: "불고기 버거 세트", expiry: "60일", price: "5,000 / 7,000원", location: "전국 모든 매장" },
    { name: "새우 버거 세트", expiry: "60일", price: "4,500 / 6,500원", location: "전국 모든 매장" },
    { name: "아메리카노 (R)", expiry: "30일", price: "2,000 / 3,000원", location: "카페 A, 카페 B 전 지점" },
    { name: "영화 관람권 (1인)", expiry: "5년", price: "10,000 / 15,000원", location: "CGV, 롯데시네마, 메가박스" },
    { name: "치킨 콤보", expiry: "30일", price: "18,000 / 22,000원", location: "BBQ, BHC" },
    { name: "피자 L 사이즈", expiry: "30일", price: "25,000 / 30,000원", location: "도미노피자, 피자헛" },
    { name: "편의점 5천원권", expiry: "5년", price: "4,500 / 5,000원", location: "GS25, CU, 세븐일레븐" },
    { name: "베이커리 1만원권", expiry: "60일", price: "9,000 / 10,000원", location: "파리바게뜨, 뚜레쥬르" },
    { name: "아이스크림 파인트", expiry: "30일", price: "7,000 / 8,200원", location: "배스킨라빈스" },
    { name: "주유 5천원 할인권", expiry: "60일", price: "0 / 5,000원", location: "SK, GS칼텍스" },
    { name: "서점 1만원 도서상품권", expiry: "5년", price: "9,500 / 10,000원", location: "교보문고, 영풍문고" },
    { name: "음악 스트리밍 1개월권", expiry: "30일", price: "7,900 / 8,900원", location: "멜론, 지니뮤직" },
    { name: "OTT 1개월 이용권", expiry: "30일", price: "12,000 / 14,000원", location: "넷플릭스, 왓챠" },
    { name: "특급호텔 숙박권", expiry: "5년", price: "250,000 / 300,000원", location: "신라호텔, 롯데호텔" },
    { name: "백화점 5만원 상품권", expiry: "5년", price: "48,000 / 50,000원", location: "신세계, 롯데, 현대백화점" }
];

// Bootstrap Modal 인스턴스를 저장할 변수
let productModal;

/**
 * 상품 검색 버튼 클릭 시, 상품 목록을 모달에 표시하는 함수
 */
function searchProduct() {
    const tableBody = document.getElementById('product-list-table');
    // 기존 목록 초기화
    tableBody.innerHTML = '';

    // 가상 데이터로 목록 생성
    sampleProducts.forEach((product, index) => {
        const row = `<tr>
            <td>${product.name}</td>
            <td>${product.location}</td>
            <td>
                <button type="button" class="btn btn-primary btn-sm" onclick="selectProduct(${index})">선택</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    // 모달을 띄웁니다.
    const modalElement = document.getElementById('productSearchModal');
    productModal = new bootstrap.Modal(modalElement);
    productModal.show();
}

/**
 * 모달에서 상품 선택 시, 해당 상품 정보를 메인 폼에 채워넣는 함수
 * @param {number} index - 선택한 상품의 sampleProducts 배열 인덱스
 */
function selectProduct(index) {
    const selectedProduct = sampleProducts[index];

    // 필드에 값 채우기
    document.getElementById("productName").value = selectedProduct.name;
    document.getElementById("product-expiry").value = selectedProduct.expiry;
    document.getElementById("product-price").value = selectedProduct.price;
    document.getElementById("product-location").value = selectedProduct.location;

    // 모달 닫기
    if (productModal) {
        productModal.hide();
    }
}
