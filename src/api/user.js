/**
 * 把用户相关的所有请求方法都封装到这个模块
 */

import axios from 'axios'

export const findAll = async function (params) {
  const res = await axios({
    url: '/user',
    params
  })
  return res.data.data
}

export const create = async function () {

}

export const updateState = async function () {

}

export const findById = async function () {

}

export const update = async function () {

}

export const deleteById = async function () {

}

export const updateRole = async function () {

}
