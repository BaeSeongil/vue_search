// 모달창 이동 로직
let positions = ({
    clientX: null,
    clientY: null,
    movementX: 0,
    movementY: 0,
});

let draggableContainer = null;

export const dragInit = () => {
    if (draggableContainer) {
        draggableContainer.style.top = "";
        draggableContainer.style.left = "";
        draggableContainer = null;
    }
    positions = {
        clientX: null,
        clientY: null,
        movementX: 0,
        movementY: 0,
    };
};
export const dragMouseDown = (event, tag) => {
    event.preventDefault();

    draggableContainer = tag;
    positions.clientX = event.clientX;
    positions.clientY = event.clientY;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
};
// 드래그 이동중
const elementDrag = event => {
    event.preventDefault();
    positions.movementX = positions.clientX - event.clientX;
    positions.movementY = positions.clientY - event.clientY;
    positions.clientX = event.clientX;
    positions.clientY = event.clientY;
    // set the element's new position:

    // x축 화면넘어감 방지
    if (
        (draggableContainer.getClientRects()[0].x < 0 &&
            positions.clientX < 10) ||
        (draggableContainer.getClientRects()[0].x > window.innerWidth - 50 &&
            positions.movementX < 0)
    ) {
        return;
    } else {
        draggableContainer.style.left =
            draggableContainer.offsetLeft - positions.movementX + "px";
    }

    // x축 좌측으로 넘어갈시 강제로 50px만큼 노출
    if (draggableContainer.offsetLeft + positions.movementX < -(draggableContainer.offsetWidth - 50)) {
        draggableContainer.style.left = -draggableContainer.offsetWidth + 50 + 'px';
    }

    // y축 화면넘어감 방지
    if (
        (draggableContainer.getClientRects()[0].y < 0 &&
            positions.movementY > 0) ||

        draggableContainer.getClientRects()[0].y - positions.movementY >
        window.innerHeight - 50
    ) {
        return;
    } else {
        draggableContainer.style.top =
            draggableContainer.offsetTop - positions.movementY + "px";
    }
};
//드래그 종료 메소드
const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
};