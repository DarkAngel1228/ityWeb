import request from '@/utils/request'

export function customers(data) {
  return request({
    url: '/customers',
    method: 'post',
    data
  })
}

export function hospitals() {
  return request({
    url: '/hospitals',
    method: 'post'
  })
}

export function customerNames() {
  return request({
    url: '/customer_names',
    method: 'post'
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
export function phone() {
  return request({
    url: '/phone',
    method: 'post'
  })
}
export function produce() {
  return request({
    url: '/produce',
    method: 'post'
  })
}
export function tracker() {
  return request({
    url: '/tracker',
    method: 'post'
  })
}
export function bill() {
  return request({
    url: '/bill',
    method: 'post'
  })
}
export function channelBusiness() {
  return request({
    url: '/channel_business',
    method: 'post'
  })
}
export function record() {
  return request({
    url: '/record',
    method: 'post'
  })
}
export function department() {
  return request({
    url: '/department',
    method: 'post'
  })
}
