import axios from 'axios'

let API_URL = process.env.VUE_APP_API_ENDPOINT

const API = {
  // 1. 로그인
  login (request) {
    let url = `${API_URL}/api/login`

    return axios.get(url, { params: request })
  }
  // 2. 메뉴 리스트

  // 3. 메뉴 상세 (가게 정보 포함)

  // 4. 메뉴 상세

  // 5. 메뉴 수정

  // 6. 
}
export default API
