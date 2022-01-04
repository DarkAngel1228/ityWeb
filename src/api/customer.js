import request from '@/utils/request'

export function customers(data) {
  return request({
    url: '/customers',
    method: 'post',
    data
  })
}

export function city() {
  return request({
    url: '/city',
    method: 'post'
  })
}

export function county() {
  return request({
    url: '/county',
    method: 'post'
  })
}

export function hospital() {
  return request({
    url: '/hospitals',
    method: 'post'
  })
}

export function department() {
  return request({
    url: '/department',
    method: 'post'
  })
}

export function createCustomer(data) {
  return request({
    url: '/create_customer',
    method: 'post',
    data
  })
}

export function channelBusinessList() {
  return request({
    url: '/channel_business_list',
    method: 'post'
  })
}

export function updateCustomer(data) {
  return request({
    url: '/update_customer',
    method: 'post',
    data
  })
}

export function customerName() {
  return request({
    url: '/customer_names',
    method: 'post'
  })
}

export function deletedCustomer(id) {
  return request({
    url: '/delete_customer/' + id,
    method: 'post'
  })
}
