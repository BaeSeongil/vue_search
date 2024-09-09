import axios from "axios";
import jszip from "jszip";

export function calculateFileSize(size) {
  if (size > 2 ** 30) {
    return Math.ceil((size / 2 ** 30) * 10) / 10 + " GB";
  }
  if (size > 2 ** 20) {
    return Math.ceil((size / 2 ** 20) * 10) / 10 + " MB";
  }
  if (size > 2 ** 10) {
    return Math.ceil((size / 2 ** 10) * 10) / 10 + " KB";
  }

  return Math.ceil((size / 2 ** 10) * 10) / 10 + " byte";
}

export function getFileExtension(filename) {
  let extension = filename.split(".").pop();

  if (extension === "xlsx") {
    extension = "xls";
  } else if (extension === "pptx") {
    extension = "ppt";
  } else if (extension === "html") {
    extension = "htm";
  } else if (extension === "jpeg") {
    extension = "jpg";
  } else if (extension === "docx") {
    extension = "doc";
  }

  const checkArr = [
    "hwp",
    "psd",
    "gif",
    "doc",
    "js",
    "htm",
    "txt",
    "png",
    "css",
    "pdf",
    "xls",
    "zip",
    "jpg",
    "ppt",
  ];
  if (!checkArr.includes(extension)) {
    extension = "etc";
  }
  return extension;
}

export function FileReader(file) {
  const link = document.createElement("a");
  link.href = file.url;
  link.target = "_blank";

  const fileName = file.name;
  const isImageFile = /\.(jpg|jpeg|png|gif)$/i.test(fileName);

  if (isImageFile) {
    // 이미지 파일인 경우 다운로드를 위해 download 속성을 추가합니다.
    link.setAttribute("download", fileName);
  }

  link.click();

  link.addEventListener("load", () => {
    link.remove();
  });
}

export function getAttachMentsForCompress(attachs, fileName) {
  return Promise.all(
    attachs.map(attach => {
      return axios({
        method: "GET",
        url: attach.url,
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
    })
  )
    .then(async responses => {
      const zip = new jszip();
      responses.forEach((res, index) => {
        zip.file(attachs[index].name, res.data);
      });
      // 여기서 zip파일을 blob데이터로 리턴
      return zip.generateAsync({ type: "blob" });
    })
    .then(reszip => {
      const url = window.URL.createObjectURL(reszip);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.zip`); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}
export function getAttachMents(attachs) {
  for (let index = 0; index < attachs.length; index++) {
    getAttachMent(attachs[index]);
  }
}
export async function getAttachMent(attach, firstFormData) {
  // User agent를 통해 디바이스 감지
  const isTabletOrIPad = /macintosh|ipad|android|tablet/.test(navigator.userAgent.toLowerCase());
  if (isTabletOrIPad) {
    const regex = /^(\/dwp\/com\/bbs\/[^\/]+)/;
    const match = attach.url.match(regex);
    const url = `/ematenapi/convert/synap/api/DRM/agDRM?unid=${firstFormData.etc.unid}&att=${encodeURIComponent(attach.name)}&dbf=${match[0]}`;
    const synapImg = await axios({
      method: "GET",
      url: url,
    });
    // 태블릿이나 아이패드일 경우 새창으로 열기
    window.open(synapImg.data.url)
  } else {
    // 그 외의 경우 기존 방식대로 다운로드
    const aLink = document.createElement("a");
    aLink.setAttribute("download", attach.name);
    aLink.setAttribute("href", attach.url);
    document.body.appendChild(aLink);
    aLink.click();
    aLink.remove();
  }
}
export function replacedBody(body) {
  return body
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"');
}
