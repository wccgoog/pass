import { matchUrl, navigateToRightUrl, getUid } from '../../utils/index';
export default {
  goToNavigateUrl(e) {
    let type = e.target.dataset.type;
    let url = e.target.dataset.url;
    let appId = e.target.dataset.appId;
    let uid = getUid();
    // debugger
    let params = {
      type,
      url,
      appId,
      uid,
    };
    navigateToRightUrl(params);
  },
};
