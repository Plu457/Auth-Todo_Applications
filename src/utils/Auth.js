import axios from 'axios';

function postAuth(data, currentPage) {
  currentPage = currentPage.replace('_', '');
  return axios({
    method: 'post',
    url: `/auth/${currentPage}`,
    baseURL: 'https://pre-onboarding-selection-task.shop',
    data: data,
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  postAuth,
};
