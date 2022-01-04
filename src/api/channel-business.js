import request from '@/utils/request'

export function channelBusiness(data) {
  return request({
    url: '/channel_business',
    method: 'post',
    data
  })
}

export function companyList() {
  return request({
    url: '/company_list',
    method: 'post'
  })
}

export function produceList() {
  return request({
    url: '/produce_list',
    method: 'post'
  })
}

export function createChannelBusiness(data) {
  return request({
    url: '/create_channel_business',
    method: 'post',
    data
  })
}

export function updateChannelBusiness(data) {
  return request({
    url: '/update_channel_business',
    method: 'post',
    data
  })
}

export function deleteChannelBusiness(id) {
  return request({
    url: '/delete_channel_business/' + id,
    method: 'post'
  })
}
