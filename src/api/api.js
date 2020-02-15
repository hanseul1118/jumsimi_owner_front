import axios from 'axios'

let API_URL = process.env.VUE_APP_API_ENDPOINT

const API = {
  // 1. 로그인
  login (request) {
    let url = `${API_URL}/api/login`

    return axios.get(url, { params: request })
  },
  // 2. 메뉴 리스트
  menuList (request, token) {
    let url = `${API_URL}/api/menu`
    let headers = { 
      Authorization: token
    }

    return axios.get(url, { params : request, headers: headers  })
  },
  // 3. 메뉴 상세 (가게 정보 포함)
  menuDetail (request, token) {
    let url = `${API_URL}/api/menudetail`
    let headers = { 
      Authorization: token
    }

    return axios.get(url, { params: request, headers: headers })
  },
  // 4. 메뉴 수정
  menuUpdate (request, token) {
    let url = `${API_URL}/api/menu`
    let headers = { 
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
    
    return axios.put(url, request, { headers: headers })
  },
  // 5. 식당 등록
  createRestaurant (request, token) {
    let url = `${API_URL}/api/restaurant`
    let headers = { 
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }

    return axios.post(url, request, { headers: headers })
  }
}

export default API
