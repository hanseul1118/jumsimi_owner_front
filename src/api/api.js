import axios from 'axios'

let API_URL = process.env.VUE_APP_API_ENDPOINT

const API = {
  // 1. 로그인
  login (request) {
    let url = `${API_URL}/api/login`

    return axios.get(url, { params: request })
  },
  // 2. 메뉴 리스트

  // 3. 메뉴 상세 (가게 정보 포함)
  menuDetail (request) {
    let url = `${API_URL}/api/menudetail`

    return axios.get(url, { params: request })
  },
  // 4. 메뉴 상세

  // 5. 메뉴 수정
  menuUpdate (request) {
    let url = `${API_URL}/api/menu`
    
    return axios.put(url, request )
  },

  // 6. 식당 등록
  createRestaurant (request) {
    let url = `${API_URL}/api/restaurant`
    let headers = { 
      'Content-Type': 'multipart/form-data'
    }

    return axios.post(url, request, { headers: headers })
  },
  // 7. 메뉴 리스트 조회
  menuList (request) {
    let url = `${API_URL}/api/menu`

    return axios.get(url,{ params : request })
  }
}

export default API
