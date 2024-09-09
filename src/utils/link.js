import router from "@/router";

export const open = (link, options = {}) => {
  const query = options.query || {};

  const popupCallback = options.popupCallback;

  let { url } = link;
  const { rel } = link;
  if (url) {
    url = url.replace("///", "/");
  }
  switch (rel) {
    case "tab":
      window.open(url, "_blank"); //새 탭
      break;
    case "link":
    case "WPOP":
      if (query && Object.keys(query).length > 0) {
        url +=
          "?" +
          Object.entries(query)
            .map(v => v.join("="))
            .join("&");
      }

      window.open(url, `normal${Math.random()}`, "width=1250,height=800");
      break;

    case "LC":
    case "location":
      window.location.href = url;
      break;
    case "PAGE":
    case "document":
      if (link.dataApi) {
        query.dataApi = link.dataApi;
      }
      // window.open(`#/infocenter/speciallist/speciallist-01/detail?memberId=F96F02BB39E5F471492587BD0042938A`, '_self')
      if (url && url.length > 0) {
        // window.open(url, '_self')
        router.push({ path: url, query: { ...query, keyDate: Date.now() } });
      } else {
        router.push({ name: link.componentType, query });
      }
      break;
    case "popup":
      popupCallback(link);
      break;
  }
};
