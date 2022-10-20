import axios from 'axios';

export default function postAuth(data, currentPage) {
  currentPage = currentPage.replace('_', '');

  return axios({
    method: 'post',
    url: `/auth/${currentPage}`,
    baseURL: 'https://pre-onboarding-selection-task.shop',
    data: data,
  });
}
